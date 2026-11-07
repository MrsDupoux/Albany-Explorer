import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  Compass,
  RotateCcw,
  Send,
  Sparkles,
} from 'lucide-react';
import {
  ChatWithCityGuideResponse,
  GetCityGuideSystemPromptResponse,
  type ChatSettings,
} from '@workspace/api-zod';

type AlbanyChatMessage = {
  role: 'guide' | 'visitor';
  text: string;
  usage?: {
    promptTokens: number | null;
    outputTokens: number | null;
    totalTokens: number | null;
  };
  settings?: ChatSettings;
  model?: string;
  cutOff?: boolean;
};

const defaultSettings: ChatSettings = {
  temperature: 1,
  topP: 0.95,
  maxOutputTokens: 300,
};

const starterMessage: AlbanyChatMessage = {
  role: 'guide',
  text: 'Well now, I’m your Albany guide. Ask me about a first meal, a good stop by the river, the city’s history, or how to spend a day here.',
};

function formatTokenCount(count: number | null | undefined) {
  return count == null ? '—' : count.toLocaleString();
}

export function AlbanyChat() {
  const [temperature, setTemperature] = useState(defaultSettings.temperature);
  const [topP, setTopP] = useState(defaultSettings.topP);
  const [maxOutputTokens, setMaxOutputTokens] = useState(defaultSettings.maxOutputTokens);
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState<AlbanyChatMessage[]>([]);
  const [systemPrompt, setSystemPrompt] = useState<string | null>(null);
  const [promptLoadError, setPromptLoadError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    fetch('/api/chat/system-prompt')
      .then(async (response) => {
        if (!response.ok) throw new Error('Could not load the system prompt.');
        return GetCityGuideSystemPromptResponse.parse(await response.json());
      })
      .then(({ systemPrompt: prompt }) => {
        if (active) setSystemPrompt(prompt);
      })
      .catch(() => {
        if (active) setPromptLoadError(true);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isSending]);

  const resetPromptSettings = () => {
    setTemperature(defaultSettings.temperature);
    setTopP(defaultSettings.topP);
    setMaxOutputTokens(defaultSettings.maxOutputTokens);
  };

  const askGuide = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const question = draft.trim();
    if (!question || isSending) return;

    const settings = { temperature, topP, maxOutputTokens };
    const history = messages.slice(-20).map((message) => ({
      role: message.role === 'guide' ? 'assistant' as const : 'user' as const,
      content: message.text,
    }));
    setMessages((current) => [...current, { role: 'visitor', text: question }]);
    setDraft('');
    setError(null);
    setIsSending(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question, history, settings }),
      });
      const payload: unknown = await response.json();
      if (!response.ok) {
        const message =
          typeof payload === 'object' &&
          payload !== null &&
          'error' in payload &&
          typeof payload.error === 'string'
            ? payload.error
            : 'The Albany guide is unavailable right now. Please try again.';
        throw new Error(message);
      }

      const answer = ChatWithCityGuideResponse.parse(payload);
      setMessages((current) => [
        ...current,
        {
          role: 'guide',
          text: answer.reply,
          usage: answer.usage,
          settings: answer.settings,
          model: answer.model,
          cutOff: answer.cutOff,
        },
      ]);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'The Albany guide is unavailable right now. Please try again.',
      );
    } finally {
      setIsSending(false);
    }
  };

  const visibleMessages = [starterMessage, ...messages];

  return (
    <section id="ask-a-local" className="ask-guide-section border-y border-[#d8d2c5] bg-[#e8e2d4]">
      <div className="mx-auto max-w-[1380px] px-6 py-20 md:px-10 md:py-28">
        <div className="mb-11 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="eyebrow mb-5 flex items-center gap-3 text-[#bb654b]">
              <span className="h-px w-7 bg-[#bb654b]" /> A LITTLE LOCAL KNOW-HOW
            </div>
            <h2 className="serif max-w-[700px] text-[clamp(2.8rem,6vw,5.3rem)] leading-[.94] tracking-[-.06em]">
              Ask your Albany <em>guide.</em>
            </h2>
          </div>
          <p className="max-w-[350px] text-[14px] leading-[1.8] text-[#59645a]">
            From what to order to where the river bends, ask away. You’ll get a friendly answer grounded in this field guide.
          </p>
        </div>

        <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1.45fr)_minmax(290px,.72fr)]">
          <div className="ask-guide-chat overflow-hidden border border-[#c9c1b2] bg-[#faf8f1]">
            <div className="flex items-center justify-between gap-4 border-b border-[#d8d2c5] px-5 py-4 md:px-7">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-[#b9c5b8] bg-[#e8e2d4] text-[#335848]">
                  <Compass size={18} strokeWidth={1.5} />
                </span>
                <div>
                  <p className="serif text-[19px] leading-none text-[#203b32]">Your Albany guide</p>
                  <p className="mono mt-1.5 text-[8px] tracking-[.16em] text-[#738276]">HERE FOR THE GOOD QUESTIONS</p>
                </div>
              </div>
              <span className="flex items-center gap-2 text-[10px] text-[#738276]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#77916e]" /> City notes ready
              </span>
            </div>

            <div
              className="ask-guide-transcript flex max-h-[410px] min-h-[290px] flex-col gap-5 overflow-y-auto px-4 py-5 md:px-7 md:py-7"
              aria-live="polite"
              aria-label="Conversation with your Albany guide"
            >
              {visibleMessages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`flex ${message.role === 'visitor' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[92%] md:max-w-[84%] ${message.role === 'visitor' ? 'ask-guide-visitor' : 'ask-guide-answer'}`}>
                    {message.role === 'guide' && (
                      <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold tracking-[.04em] text-[#738276]">
                        <Sparkles size={12} className="text-[#bb654b]" /> ALBANY GUIDE
                      </div>
                    )}
                    <p className={`whitespace-pre-wrap text-[13px] leading-[1.8] ${message.role === 'visitor' ? 'text-[#f2efe5]' : 'text-[#45554a]'}`}>
                      {message.text}
                    </p>
                    {message.role === 'guide' && message.settings && message.usage && (
                      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-[#d8d2c5] pt-3 text-[9px] text-[#778176]">
                        <span className="mono">{formatTokenCount(message.usage.outputTokens)} OUTPUT TOKENS</span>
                        <span className="text-[#bb654b]">/</span>
                        <span className="mono">{formatTokenCount(message.usage.totalTokens)} TOTAL</span>
                        <span className="mono">TEMP {message.settings.temperature.toFixed(1)}</span>
                        <span className="mono">TOP-P {message.settings.topP.toFixed(2)}</span>
                        <span className="mono">MAX {message.settings.maxOutputTokens}</span>
                        {message.model && <span className="mono">{message.model}</span>}
                        {message.cutOff && <span className="ask-guide-cutoff">ANSWER CUT OFF</span>}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isSending && (
                <div className="flex justify-start" role="status">
                  <div className="ask-guide-answer text-[12px] text-[#738276]">Your guide is thinking…</div>
                </div>
              )}
              <div ref={transcriptEndRef} />
            </div>

            <div className="border-t border-[#d8d2c5] px-4 pb-5 pt-4 md:px-7">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[.13em] text-[#778176]">A few good places to start</p>
              <div className="mb-4 flex flex-wrap gap-2">
                {['What should I eat first?', 'Best first stop with kids?', 'Tell me about the river'].map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => setDraft(prompt)}
                    className="ask-guide-chip"
                    disabled={isSending}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
              <form onSubmit={askGuide} className="flex gap-2">
                <label className="sr-only" htmlFor="albany-guide-question">Ask your Albany guide</label>
                <input
                  id="albany-guide-question"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="Ask about food, history, or a good day out…"
                  maxLength={4000}
                  required
                  disabled={isSending}
                  className="ask-guide-input min-w-0 flex-1 rounded-sm border border-[#d8d2c5] bg-[#f2efe5] px-4 py-3 text-[12px] text-[#203b32] outline-none transition-colors placeholder:text-[#8d9488] focus:border-[#829083]"
                />
                <button
                  type="submit"
                  aria-label="Send question"
                  disabled={!draft.trim() || isSending}
                  className="ask-guide-send grid h-11 w-12 shrink-0 place-items-center bg-[#203b32] text-[#f2efe5] transition-colors hover:bg-[#335848] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Send size={16} />
                </button>
              </form>
              {error && (
                <p className="mt-3 border-l-2 border-[#bb654b] bg-[#f7eee8] px-3 py-2 text-[11px] leading-[1.6] text-[#7f3f30]" role="alert">
                  {error}
                </p>
              )}
              <p className="mt-3 text-[10px] leading-5 text-[#899087]">
                City questions only, please. The guide won’t ask for personal details.
              </p>
            </div>
          </div>

          <aside className="ask-guide-lab border border-[#c9c1b2] bg-[#f2efe5]">
            <div className="border-b border-[#d8d2c5] px-5 py-5 md:px-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="eyebrow mb-2 text-[#bb654b]">TUNE THE TONE</div>
                  <h3 className="serif text-[29px] leading-none tracking-[-.04em] text-[#203b32]">Prompt Lab</h3>
                </div>
                <span className="grid h-9 w-9 place-items-center rounded-full border border-[#c9c1b2] text-[#51685b]">
                  <Sparkles size={15} />
                </span>
              </div>
              <p className="mt-3 text-[11px] leading-[1.7] text-[#69756a]">
                Adjust how the guide answers. New settings apply to your next question.
              </p>
            </div>

            <div className="space-y-5 px-5 py-5 md:px-6">
              <label className="block">
                <span className="mb-2 flex items-center justify-between text-[11px] font-semibold text-[#44564b]">
                  <span>Temperature</span><span className="mono text-[#bb654b]">{temperature.toFixed(1)}</span>
                </span>
                <input
                  className="ask-guide-range w-full"
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={temperature}
                  onChange={(event) => setTemperature(Number(event.target.value))}
                  aria-label="Temperature"
                />
                <span className="mt-1 flex justify-between text-[9px] text-[#899087]"><span>Steady</span><span>More playful</span></span>
              </label>
              <label className="block">
                <span className="mb-2 flex items-center justify-between text-[11px] font-semibold text-[#44564b]">
                  <span>Max output tokens</span><span className="mono text-[#bb654b]">{maxOutputTokens}</span>
                </span>
                <input
                  className="ask-guide-range w-full"
                  type="range"
                  min="32"
                  max="1024"
                  step="1"
                  value={maxOutputTokens}
                  onChange={(event) => setMaxOutputTokens(Number(event.target.value))}
                  aria-label="Maximum output tokens"
                />
                <span className="mt-1 flex justify-between text-[9px] text-[#899087]"><span>32</span><span>1,024</span></span>
              </label>
              <label className="block">
                <span className="mb-2 flex items-center justify-between text-[11px] font-semibold text-[#44564b]">
                  <span>Top-p</span><span className="mono text-[#bb654b]">{topP.toFixed(2)}</span>
                </span>
                <input
                  className="ask-guide-range w-full"
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={topP}
                  onChange={(event) => setTopP(Number(event.target.value))}
                  aria-label="Top-p"
                />
                <span className="mt-1 flex justify-between text-[9px] text-[#899087]"><span>Focused</span><span>Broad</span></span>
              </label>
              <button
                type="button"
                onClick={resetPromptSettings}
                className="inline-flex items-center gap-2 border-b border-[#aeb6a9] pb-1 text-[10px] font-semibold text-[#51685b] transition-colors hover:text-[#bb654b]"
              >
                <RotateCcw size={12} /> RESET TO DEFAULTS
              </button>

              <details className="ask-guide-prompt border-t border-[#d8d2c5] pt-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[11px] font-semibold text-[#44564b]">
                  <span>See the system prompt</span><span className="eyebrow text-[9px] text-[#899087]">SHOW</span>
                </summary>
                <pre className="mt-3 max-h-[245px] overflow-auto whitespace-pre-wrap border border-[#d8d2c5] bg-[#e8e2d4] p-3 text-[9px] leading-[1.7] text-[#59645a]">
                  {promptLoadError ? 'Could not load the server prompt. Please refresh and try again.' : systemPrompt ?? 'Loading the server prompt…'}
                </pre>
              </details>
            </div>
          </aside>
        </div>
        <p className="mt-5 flex items-center gap-2 text-[10px] text-[#82877b]">
          <Sparkles size={12} className="text-[#bb654b]" /> A guide to the city, not a live directory. Verify hours, access, and event details before visiting.
        </p>
      </div>
    </section>
  );
}
