import { useState } from 'react';
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  Clock3,
  Compass,
  MapPin,
  Menu,
  X,
} from 'lucide-react';
import './_group.css';
import './BlueCream.css';

export function BlueCream() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="guide-shell min-h-[100dvh]">
      <div className="bg-[#203b32] px-5 py-2.5 text-center text-[11px] tracking-[.04em] text-[#f2efe5]">
        <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#d4a95e] align-middle" />
        A field guide to Albany, Georgia <span className="mx-2 text-[#8b9a8e]">/</span> Southwest Georgia, at its own pace
      </div>
      <header className="relative z-20 border-b border-[#d8d2c5] bg-[#f2efe5]">
        <div className="mx-auto flex max-w-[1380px] items-center justify-between px-5 py-[19px] md:px-10">
          <a href="#top" onClick={closeMenu} data-testid="link-home" className="flex items-center gap-3 no-underline">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-[#b9c5b8] text-[#335848]"><Compass size={18} strokeWidth={1.5} /></span>
            <span className="leading-none">
              <span className="serif block text-[17px] font-semibold tracking-[-.04em] text-[#203b32]">Albany, Georgia</span>
              <span className="mono mt-1 block text-[8px] tracking-[.2em] text-[#738276]">A LOCAL FIELD GUIDE</span>
            </span>
          </a>
          <nav className={`${menuOpen ? 'flex' : 'hidden'} absolute left-0 right-0 top-full flex-col gap-5 border-b border-[#d8d2c5] bg-[#f2efe5] px-6 py-6 text-sm md:static md:flex md:flex-row md:items-center md:gap-8 md:border-0 md:bg-transparent md:p-0`} aria-label="Main navigation">
            <a className="nav-link" href="#history" onClick={closeMenu} data-testid="link-history">History</a>
            <a className="nav-link" href="#river" onClick={closeMenu} data-testid="link-river">The river</a>
            <a className="nav-link" href="#more-places" onClick={closeMenu} data-testid="link-landmarks">Landmarks</a>
            <a className="nav-link" href="#table" onClick={closeMenu} data-testid="link-table">At the table</a>
            <a className="nav-link" href="#culture" onClick={closeMenu} data-testid="link-culture">Culture</a>
            <a className="nav-link" href="#know-before" onClick={closeMenu} data-testid="link-practical">Before you go</a>
          </nav>
          <a href="#start-here" className="hidden items-center gap-2 rounded-full border border-[#203b32] px-4 py-2 text-[12px] font-semibold transition-colors hover:bg-[#203b32] hover:text-[#f2efe5] md:flex" data-testid="link-plan">
            Find your first stop <ArrowUpRight size={14} />
          </a>
          <button type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} className="grid h-10 w-10 place-items-center rounded-full border border-[#d8d2c5] md:hidden" data-testid="button-menu">
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero-photo relative flex min-h-[680px] items-end text-[#f6f1e6] md:min-h-[740px]" aria-label="Albany and the Flint River">
          <div className="absolute inset-0 bg-gradient-to-t from-[#162f28]/55 via-transparent to-transparent" />
          <div className="relative mx-auto grid w-full max-w-[1380px] grid-cols-1 items-end gap-10 px-6 pb-16 pt-28 md:grid-cols-[1fr_280px] md:px-10 md:pb-[76px]">
            <div className="max-w-[790px]">
              <div className="eyebrow reveal mb-6 flex items-center gap-3 text-[#e7c885]"><span className="h-px w-8 bg-[#d4a95e]" /> 31.5785° N&nbsp;&nbsp; 84.1557° W</div>
              <h1 className="serif reveal reveal-delay max-w-[820px] text-[clamp(4rem,10.5vw,9.4rem)] leading-[.85] tracking-[-.065em]">
                Albany,<br /><em className="font-medium">unhurried.</em>
              </h1>
              <div className="reveal reveal-late mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <p className="max-w-[460px] text-[15px] leading-[1.8] text-[#ece9dd] md:text-[17px]">
                  A river city with a long memory, a lively sound, and room at the table. Come curious. Leave with a little more time.
                </p>
                <a href="#start-here" className="inline-flex w-fit items-center gap-3 border-b border-[#d4a95e] pb-2 text-[12px] font-semibold tracking-[.08em] text-[#f6f1e6] transition-colors hover:text-[#e7c885]" data-testid="link-discover">
                  GET TO KNOW THE CITY <ArrowDownRight size={16} />
                </a>
              </div>
            </div>
            <div className="hidden border-l border-white/30 pb-1 pl-5 md:block">
              <span className="eyebrow text-[#e7c885]">ON THE FLINT</span>
              <p className="serif mt-3 text-[22px] leading-[1.2]">A place that<br />stays with you.</p>
              <p className="mt-3 text-[11px] leading-5 text-white/70">Southwest Georgia<br />Worth taking the long way.</p>
            </div>
          </div>
          <div className="absolute right-6 top-8 hidden items-center gap-2 text-[10px] tracking-[.12em] text-white/80 md:flex"><MapPin size={13} /> DOUGHERTY COUNTY, GA</div>
        </section>

        <div className="border-b border-[#d8d2c5] bg-[#e8e2d4]">
          <div className="mx-auto flex max-w-[1380px] flex-wrap items-center justify-between gap-x-8 gap-y-2 px-6 py-4 text-[10px] tracking-[.16em] text-[#51685b] md:px-10">
            <span className="mono">A GOOD PLACE TO BEGIN</span>
            <span className="hidden h-px flex-1 bg-[#c9c1b2] md:block" />
            <span className="mono">HISTORY <b className="mx-2 text-[#bb654b]">/</b> WATER <b className="mx-2 text-[#bb654b]">/</b> MUSIC <b className="mx-2 text-[#bb654b]">/</b> FOOD</span>
          </div>
        </div>

        <section id="start-here" className="mx-auto grid max-w-[1380px] gap-12 px-6 py-24 md:grid-cols-[.9fr_1.1fr] md:gap-20 md:px-10 md:py-32">
          <div>
            <div className="eyebrow mb-6 flex items-center gap-3 text-[#bb654b]"><span className="h-px w-7 bg-[#bb654b]" /> FIRST, GET YOUR BEARINGS</div>
            <h2 className="serif max-w-[570px] text-[clamp(2.8rem,6vw,5.5rem)] leading-[.98] tracking-[-.06em]">Not a place to <em>rush through.</em></h2>
          </div>
          <div className="flex flex-col justify-end">
            <p className="max-w-[620px] text-[16px] leading-[1.85] text-[#58665c]">
              Albany sits where the Flint River bends through the red-clay country of southwest Georgia. The story here is bigger than one stop: the Albany Movement helped shape the modern Civil Rights Movement, Ray Charles found his first music here, and the river still gives the city its easy, outdoorsy rhythm.
            </p>
            <p className="mt-5 max-w-[590px] text-[14px] leading-[1.8] text-[#58665c]">
              Give yourself a day or two. Leave a little space between the places on your list. That is often where the good conversations happen.
            </p>
            <div className="mt-8 flex items-center gap-5">
              <span className="serif text-[42px] leading-none text-[#bb654b]">01</span>
              <span className="h-px w-14 bg-[#c7bcaa]" />
              <span className="eyebrow text-[#748174]">LET THE CITY SET THE PACE</span>
            </div>
          </div>
        </section>

        <section id="history" className="bg-[#e7e1d4]">
          <div className="mx-auto grid max-w-[1380px] gap-0 px-6 py-12 md:grid-cols-[1.06fr_.94fr] md:px-10 md:py-14">
            <div className="history-photo photo-card relative min-h-[380px] overflow-hidden md:min-h-[590px]">
              <span className="absolute bottom-5 left-5 bg-[#f2efe5]/90 px-3 py-2 eyebrow text-[#203b32]">A CITY THAT STOOD TOGETHER</span>
            </div>
            <div className="flex flex-col justify-center px-1 py-12 md:px-14 md:py-20">
              <div className="eyebrow mb-6 flex items-center gap-3 text-[#bb654b]"><span className="h-px w-7 bg-[#bb654b]" /> START WITH THE STORY</div>
              <h2 className="serif max-w-[510px] text-[clamp(2.7rem,5vw,4.7rem)] leading-[.98] tracking-[-.06em]">A movement that changed the <em>conversation.</em></h2>
              <p className="mt-7 max-w-[475px] text-[14px] leading-[1.85] text-[#59645a]">
                In 1961–62, Albany became a center of mass protest against segregation. Organizers, students, local residents, and the Albany Movement challenged Jim Crow across the city. Their campaign brought Dr. Martin Luther King Jr. to Albany and helped inform the struggle that followed.
              </p>
              <p className="mt-4 max-w-[475px] text-[14px] leading-[1.85] text-[#59645a]">
                Visit the Albany Civil Rights Institute to listen, learn, and understand the movement through the voices and objects that carry its history. Make time for the surrounding neighborhood, too.
              </p>
              <a className="mt-8 inline-flex w-fit items-center gap-3 border-b border-[#829083] pb-2 text-[12px] font-semibold text-[#203b32] transition-all hover:gap-5" href="https://thealbanycivilrightsinstitute.org/visit/" target="_blank" rel="noreferrer" data-testid="link-civil-rights-institute">
                VISIT THE ALBANY CIVIL RIGHTS INSTITUTE <ArrowUpRight size={14} />
              </a>
              <p className="mono mt-4 text-[10px] text-[#82877b]">326 WHITNEY AVENUE · VERIFY HOURS BEFORE VISITING</p>
            </div>
          </div>
        </section>

        <section id="river" className="bg-[#203b32] text-[#f2efe5]">
          <div className="mx-auto max-w-[1380px] px-6 py-20 md:px-10 md:py-28">
            <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <div className="eyebrow mb-5 flex items-center gap-3 text-[#d4a95e]"><span className="h-px w-7 bg-[#d4a95e]" /> FOLLOW THE FLINT</div>
                <h2 className="serif max-w-[720px] text-[clamp(3.2rem,7vw,6.8rem)] leading-[.88] tracking-[-.06em]">The river is<br /><em>the other main street.</em></h2>
              </div>
              <p className="max-w-[300px] text-[14px] leading-[1.8] text-[#c3cec3]">At Ray Charles Plaza, music and water meet downtown. Wander the riverfront, pause in the shade, and let the afternoon stretch.</p>
            </div>
            <div className="river-photo relative min-h-[350px] overflow-hidden md:min-h-[520px]">
              <div className="absolute inset-0 bg-gradient-to-t from-[#152f29]/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 flex w-full flex-col gap-5 p-6 md:flex-row md:items-end md:justify-between md:p-9">
                <div>
                  <span className="eyebrow text-[#e6cb90]">DOWNTOWN ALBANY</span>
                  <h3 className="serif mt-2 text-[32px] tracking-[-.04em] md:text-[42px]">Ray Charles Plaza</h3>
                  <p className="mt-2 max-w-[470px] text-[13px] leading-6 text-white/80">A riverside tribute to the Albany-born musician, with a piano-shaped fountain and a seated bronze sculpture. Find a shady bench and listen awhile.</p>
                </div>
                <span className="eyebrow flex items-center gap-2 text-white/75"><MapPin size={14} /> FRONT STREET & ODOM AVENUE</span>
              </div>
            </div>
            <div className="mt-8 flex flex-col justify-between gap-4 border-t border-white/20 pt-6 text-[11px] text-[#c3cec3] sm:flex-row">
              <span>Water levels and access can change. Check local conditions before heading out.</span>
              <a href="https://www.albanyga.gov/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-semibold text-[#e8d4a5] hover:text-white" data-testid="link-city-info">CITY OF ALBANY INFORMATION <ArrowUpRight size={13} /></a>
            </div>
          </div>
        </section>

        <section id="more-places" className="border-b border-[#d8d2c5] bg-[#e7e1d4]">
          <div className="mx-auto max-w-[1380px] px-6 py-20 md:px-10 md:py-28">
            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <div className="eyebrow mb-5 flex items-center gap-3 text-[#bb654b]"><span className="h-px w-7 bg-[#bb654b]" /> IF YOU HAVE A LITTLE MORE TIME</div>
                <h2 className="serif max-w-[700px] text-[clamp(2.8rem,6vw,5.5rem)] leading-[.94] tracking-[-.06em]">A few more places<br /><em>to make your own.</em></h2>
              </div>
              <p className="max-w-[330px] text-[14px] leading-[1.8] text-[#59645a]">Give the day some breathing room. These stops add art, science, gardens, and a little more river-country outdoors.</p>
            </div>
            <div className="grid gap-0 border-t border-[#c9c1b2] md:grid-cols-3">
              <article className="border-b border-[#c9c1b2] py-7 md:border-r md:pr-8">
                <span className="mono text-[10px] text-[#bb654b]">DOWNTOWN / HISTORY + SCIENCE</span>
                <h3 className="serif mt-4 text-[27px] tracking-[-.03em]">Thronateeska Heritage Center</h3>
                <p className="mt-3 text-[13px] leading-[1.8] text-[#68746a]">Explore regional history and science, then check the schedule for a show at the Wetherbee Planetarium.</p>
                <a href="https://heritagecenter.org/visit" target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold text-[#203b32] hover:text-[#bb654b]" data-testid="link-thronateeska">PLAN A VISIT <ArrowUpRight size={13} /></a>
              </article>
              <article className="border-b border-[#c9c1b2] py-7 md:border-r md:px-8">
                <span className="mono text-[10px] text-[#bb654b]">SOUTH ALBANY / SPRINGS</span>
                <h3 className="serif mt-4 text-[27px] tracking-[-.03em]">Radium Springs Gardens</h3>
                <p className="mt-3 text-[13px] leading-[1.8] text-[#68746a]">Take in the gardens and the vivid blue spring—one of Georgia’s seven natural wonders. Confirm access before you go.</p>
                <a href="https://visitalbanyga.com/attraction/radium-springs-gardens" target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold text-[#203b32] hover:text-[#bb654b]" data-testid="link-radium-springs">PLAN A VISIT <ArrowUpRight size={13} /></a>
              </article>
              <article className="border-b border-[#c9c1b2] py-7 md:pl-8">
                <span className="mono text-[10px] text-[#bb654b]">OUTDOORS / WILDLIFE</span>
                <h3 className="serif mt-4 text-[27px] tracking-[-.03em]">Chehaw Park &amp; Zoo</h3>
                <p className="mt-3 text-[13px] leading-[1.8] text-[#68746a]">Make a day of the zoo, trails, and outdoor recreation. Some attractions are seasonal, so check the current visitor details.</p>
                <a href="https://chehaw.org/visit" target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold text-[#203b32] hover:text-[#bb654b]" data-testid="link-chehaw">PLAN A VISIT <ArrowUpRight size={13} /></a>
              </article>
            </div>
          </div>
        </section>

        <section id="table" className="mx-auto grid max-w-[1380px] gap-12 px-6 py-24 md:grid-cols-[.9fr_1.1fr] md:gap-20 md:px-10 md:py-32">
          <div className="flex flex-col justify-center">
            <div className="eyebrow mb-6 flex items-center gap-3 text-[#bb654b]"><span className="h-px w-7 bg-[#bb654b]" /> PULL UP A CHAIR</div>
            <h2 className="serif max-w-[540px] text-[clamp(3rem,6vw,5.7rem)] leading-[.95] tracking-[-.06em]">Good food is a <em>whole conversation.</em></h2>
            <p className="mt-7 max-w-[480px] text-[14px] leading-[1.9] text-[#59645a]">
              Around here, the table follows the seasons and the people who tend it. Look for Southern staples: catfish, greens, cornbread, field peas, and whatever fruit is ripe. Ask what is local, what just came out of the kitchen, and where the regulars go.
            </p>
            <p className="mt-4 max-w-[465px] text-[14px] leading-[1.9] text-[#59645a]">Hours can shift, and the best-loved spots may sell out. Call ahead, arrive hungry, and give lunch a little room in the day.</p>
            <div className="mt-6 grid gap-3 border-t border-[#c9c1b2] pt-5 text-[12px] sm:grid-cols-3">
              <a href="https://exploregeorgia.org/albany/food-drink/casual-full-service/harvest-moon" target="_blank" rel="noreferrer" className="group" data-testid="link-harvest-moon">
                <span className="block font-semibold text-[#203b32] group-hover:text-[#bb654b]">Harvest Moon</span>
                <span className="mt-1 block leading-5 text-[#68746a]">Pizza &amp; casual favorites</span>
              </a>
              <a href="https://exploregeorgia.org/albany/food-drink/casual-full-service/albany-fish-company" target="_blank" rel="noreferrer" className="group" data-testid="link-albany-fish-company">
                <span className="block font-semibold text-[#203b32] group-hover:text-[#bb654b]">Albany Fish Company</span>
                <span className="mt-1 block leading-5 text-[#68746a]">Seafood close to home</span>
              </a>
              <a href="https://exploregeorgia.org/albany/agritourism/farm-to-table/pretoria-fields-collective" target="_blank" rel="noreferrer" className="group" data-testid="link-pretoria-fields">
                <span className="block font-semibold text-[#203b32] group-hover:text-[#bb654b]">Pretoria Fields Collective</span>
                <span className="mt-1 block leading-5 text-[#68746a]">Farm-to-table &amp; local brews</span>
              </a>
            </div>
            <a href="https://www.visitalbanyga.com/" target="_blank" rel="noreferrer" className="mt-8 inline-flex w-fit items-center gap-3 border-b border-[#829083] pb-2 text-[12px] font-semibold hover:text-[#bb654b]" data-testid="link-local-dining">FIND LOCAL DINING IDEAS <ArrowUpRight size={14} /></a>
          </div>
          <div className="food-photo photo-card relative min-h-[410px] md:min-h-[590px]">
            <span className="absolute bottom-5 left-5 bg-[#f2efe5]/90 px-3 py-2 eyebrow text-[#203b32]">SOUTHWEST GEORGIA, SERVED GENEROUSLY</span>
          </div>
        </section>

        <section id="culture" className="border-y border-[#d8d2c5] bg-[#e7e1d4]">
          <div className="mx-auto grid max-w-[1380px] gap-0 px-6 py-14 md:grid-cols-[1fr_1fr] md:px-10 md:py-20">
            <div className="culture-photo photo-card relative order-2 min-h-[360px] md:order-1 md:min-h-[540px]">
              <span className="absolute bottom-5 left-5 bg-[#f2efe5]/90 px-3 py-2 eyebrow text-[#203b32]">THE SOUND HAS DEEP ROOTS</span>
            </div>
            <div className="order-1 flex flex-col justify-center px-1 pb-12 md:order-2 md:px-16 md:py-10">
              <div className="eyebrow mb-6 flex items-center gap-3 text-[#bb654b]"><span className="h-px w-7 bg-[#bb654b]" /> THE CITY HAS A SOUND</div>
              <h2 className="serif max-w-[500px] text-[clamp(2.8rem,5vw,5rem)] leading-[.98] tracking-[-.06em]">Listen for the <em>Albany in it.</em></h2>
              <p className="mt-7 max-w-[460px] text-[14px] leading-[1.9] text-[#59645a]">
                Ray Charles was born in Albany in 1930. His music is part of the city’s story, but the sound keeps moving: church choirs, porch conversations, school bands, and live sets when the night is right.
              </p>
              <p className="mt-4 max-w-[460px] text-[14px] leading-[1.9] text-[#59645a]">Ask a local what is playing while you are here. Schedules and seasonal events change, so check the venue or organizer before making a plan.</p>
              <a href="https://www.visitalbanyga.com/events" target="_blank" rel="noreferrer" className="mt-8 inline-flex w-fit items-center gap-3 border-b border-[#829083] pb-2 text-[12px] font-semibold hover:text-[#bb654b]" data-testid="link-events">SEE WHAT'S ON <ArrowUpRight size={14} /></a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1380px] px-6 py-24 md:px-10 md:py-32">
          <div className="eyebrow mb-5 flex items-center gap-3 text-[#bb654b]"><span className="h-px w-7 bg-[#bb654b]" /> A FEW GOOD WAYS TO SPEND A DAY</div>
          <div className="grid gap-10 md:grid-cols-[.8fr_1.2fr] md:gap-16">
            <h2 className="serif max-w-[490px] text-[clamp(2.8rem,5vw,4.7rem)] leading-[.98] tracking-[-.06em]">Small plans.<br /><em>Room to wander.</em></h2>
            <div className="grid grid-cols-1 gap-0 border-t border-[#c9c1b2] sm:grid-cols-3">
              <div className="border-b border-[#c9c1b2] py-6 sm:border-r sm:pr-5">
                <span className="mono text-[10px] text-[#bb654b]">01 / MORNING</span>
                <h3 className="serif mt-4 text-[24px]">Begin with the story</h3>
                <p className="mt-3 text-[13px] leading-[1.8] text-[#68746a]">Set aside time for the Albany Civil Rights Institute. Go slowly; there is a lot to take in.</p>
              </div>
              <div className="border-b border-[#c9c1b2] py-6 sm:border-r sm:px-5">
                <span className="mono text-[10px] text-[#bb654b]">02 / AFTERNOON</span>
                <h3 className="serif mt-4 text-[24px]">Find the water</h3>
                <p className="mt-3 text-[13px] leading-[1.8] text-[#68746a]">Walk downtown to Ray Charles Plaza, then follow the riverfront at your own pace.</p>
              </div>
              <div className="border-b border-[#c9c1b2] py-6 sm:pl-5">
                <span className="mono text-[10px] text-[#bb654b]">03 / EVENING</span>
                <h3 className="serif mt-4 text-[24px]">Stay for supper</h3>
                <p className="mt-3 text-[13px] leading-[1.8] text-[#68746a]">Ask about tonight’s music and what is cooking. Let the evening decide where you land.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="know-before" className="bg-[#d4a95e] text-[#203b32]">
          <div className="mx-auto grid max-w-[1380px] gap-12 px-6 py-16 md:grid-cols-[.8fr_1.2fr] md:gap-20 md:px-10 md:py-20">
            <div>
              <div className="eyebrow mb-5 flex items-center gap-3"><span className="h-px w-7 bg-[#203b32]" /> A NOTE FROM YOUR LOCAL-ISH GUIDE</div>
              <h2 className="serif max-w-[480px] text-[clamp(2.7rem,5vw,4.7rem)] leading-[.98] tracking-[-.06em]">A little useful <em>before you go.</em></h2>
            </div>
            <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              <div className="border-t border-[#203b32]/30 pt-4">
                <div className="flex items-center gap-2"><Clock3 size={14} /><span className="eyebrow">CHECK THE CLOCK</span></div>
                <p className="mt-3 text-[13px] leading-[1.8]">Museum hours, restaurant service, and river conditions can change. Check official pages or call the day you plan to go.</p>
              </div>
              <div className="border-t border-[#203b32]/30 pt-4">
                <div className="flex items-center gap-2"><MapPin size={14} /><span className="eyebrow">GETTING AROUND</span></div>
                <p className="mt-3 text-[13px] leading-[1.8]">Albany is spread out. A car makes it easier to move between downtown, riverfront, and other neighborhoods.</p>
              </div>
              <div className="border-t border-[#203b32]/30 pt-4">
                <div className="flex items-center gap-2"><ArrowDown size={14} /><span className="eyebrow">PACK FOR THE WEATHER</span></div>
                <p className="mt-3 text-[13px] leading-[1.8]">Southwest Georgia summers are hot and humid. Bring water, shade, and comfortable shoes; check the forecast year-round.</p>
              </div>
              <div className="border-t border-[#203b32]/30 pt-4">
                <div className="flex items-center gap-2"><Compass size={14} /><span className="eyebrow">FOLLOW THE LOCAL LEAD</span></div>
                <p className="mt-3 text-[13px] leading-[1.8]">Event dates and seasonal offerings shift. Confirm details with the venue or organizer before you set out.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-[#203b32] px-6 py-10 text-[#f2efe5] md:px-10">
        <div className="mx-auto flex max-w-[1380px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <a href="#top" className="serif text-[27px] tracking-[-.04em] hover:text-[#e6cb90]" data-testid="link-back-top">Albany, Georgia <ArrowUpRight className="inline-block" size={16} /></a>
            <p className="mt-2 text-[12px] text-[#c3cec3]">Come curious. Take your time. Leave room for one more story.</p>
          </div>
          <div className="flex flex-col gap-2 md:items-end">
            <span className="eyebrow text-[#d4a95e]">A FIELD GUIDE, NOT A LIVE DIRECTORY</span>
            <span className="text-[11px] text-[#aab9ad]">Verify hours, access, and event details before visiting.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
