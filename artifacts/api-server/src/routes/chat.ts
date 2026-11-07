import { GoogleGenAI } from "@google/genai";
import {
  ChatWithCityGuideBody,
  ChatWithCityGuideResponse,
  GetCityGuideSystemPromptResponse,
} from "@workspace/api-zod";
import { Router, type IRouter } from "express";
import {
  CITY_GUIDE_SYSTEM_PROMPT,
  DEFAULT_CHAT_SETTINGS,
  DEFAULT_GEMINI_MODEL,
} from "../city";

const router: IRouter = Router();

router.get("/chat/system-prompt", (_req, res) => {
  res.json(GetCityGuideSystemPromptResponse.parse({
    systemPrompt: CITY_GUIDE_SYSTEM_PROMPT,
  }));
});

router.post("/chat", async (req, res): Promise<void> => {
  const parsed = ChatWithCityGuideBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Send a question and valid chat settings." });
    return;
  }
  if (!parsed.data.message.trim()) {
    res.status(400).json({ error: "Please enter a question about Albany." });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    res.status(503).json({ error: "Add a GEMINI_API_KEY secret to enable the Albany guide." });
    return;
  }

  const settings = {
    ...DEFAULT_CHAT_SETTINGS,
    ...parsed.data.settings,
  };
  const model = process.env.GEMINI_MODEL?.trim() || DEFAULT_GEMINI_MODEL;
  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      timeout: 20000,
      retryOptions: {
        attempts: 2,
        initialDelay: 0.25,
        maxDelay: 0.5,
        jitter: 0,
      },
    },
  });
  const history = (parsed.data.history ?? []).slice(-20);
  const contents = [
    ...history.map((entry) => ({
      role: entry.role === "assistant" ? "model" as const : "user" as const,
      parts: [{ text: entry.content }],
    })),
    {
      role: "user" as const,
      parts: [{ text: parsed.data.message }],
    },
  ];

  try {
    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction: CITY_GUIDE_SYSTEM_PROMPT,
        temperature: settings.temperature,
        topP: settings.topP,
        maxOutputTokens: settings.maxOutputTokens,
      },
    });
    const reply = response.text?.trim();

    if (!reply) {
      req.log.warn({ model }, "Gemini returned an empty city guide response");
      res.status(502).json({ error: "The Albany guide could not answer just now. Please try again." });
      return;
    }

    const result = ChatWithCityGuideResponse.parse({
      reply,
      usage: {
        promptTokens: response.usageMetadata?.promptTokenCount ?? null,
        outputTokens: response.usageMetadata?.candidatesTokenCount ?? null,
        totalTokens: response.usageMetadata?.totalTokenCount ?? null,
      },
      settings,
      model,
      cutOff: String(response.candidates?.[0]?.finishReason ?? "").toUpperCase() === "MAX_TOKENS",
    });
    res.json(result);
  } catch (error) {
    const errorDetails = error instanceof Error
      ? error as Error & { status?: number; code?: string }
      : null;
    const safeMessage = errorDetails?.message
      ? errorDetails.message.replaceAll(apiKey, "[redacted]").slice(0, 240)
      : "Unknown Gemini API error";
    req.log.error({
      model,
      errorName: errorDetails?.name ?? "UnknownError",
      status: errorDetails?.status,
      code: errorDetails?.code,
      message: safeMessage,
    }, "Gemini city guide request failed");
    res.status(502).json({ error: "The Albany guide is unavailable right now. Please try again." });
  }
});

export default router;
