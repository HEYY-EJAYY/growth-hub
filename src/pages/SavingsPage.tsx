import { useState, useMemo, useRef, useEffect } from 'react';
import { Check, RotateCcw, Layers, ArrowRight, Sparkles } from 'lucide-react';
import CTASection from '@/components/CTASection';
import { useTweenNumber, formatMoney } from '@/lib/useTweenNumber';
import { GhLink } from '@/lib/router';

type App = { name: string; category: string; price: number };

const APPS: App[] = [
  { name: 'HubSpot', category: 'CRM', price: 99 },
  { name: 'ClickFunnels', category: 'Funnels', price: 297 },
  { name: 'WordPress/Wix', category: 'Website', price: 29 },
  { name: 'Shopify', category: 'Store', price: 39 },
  { name: 'Typeform', category: 'Forms', price: 79 },
  { name: 'Mailchimp', category: 'Email', price: 99 },
  { name: 'Podium', category: 'Texting', price: 99 },
  { name: 'Calendly', category: 'Booking', price: 29 },
  { name: 'Zapier', category: 'Automations', price: 169 },
  { name: 'Air AI', category: 'AI voice', price: 199 },
  { name: 'Jasper', category: 'AI writing', price: 99 },
  { name: 'Intercom', category: 'Live chat', price: 79 },
  { name: 'Kajabi', category: 'Courses', price: 99 },
  { name: 'Skool', category: 'Community', price: 89 },
  { name: 'CallRail', category: 'Call tracking', price: 49 },
  { name: 'Birdeye', category: 'Reviews', price: 159 },
  { name: 'DocuSign', category: 'E-signatures', price: 47 },
  { name: 'QuickBooks', category: 'Invoicing', price: 35 },
  { name: 'AgencyAnalytics', category: 'Reports', price: 49 },
  { name: 'Custom mobile app', category: 'Mobile app', price: 49 },
  { name: 'Jobber', category: 'Field service', price: 69 },
  { name: 'Housecall Pro', category: 'Field service', price: 49 },
  { name: 'ServiceTitan', category: 'Field service', price: 300 },
];

const PRESETS: { label: string; indices: number[] }[] = [
  { label: 'Service business', indices: [0, 6, 14, 20, 21] },
  { label: 'Home services', indices: [0, 6, 14, 20, 21, 22] },
  { label: 'Coach or creator', indices: [1, 5, 10, 12, 13, 7] },
  { label: 'Select all', indices: APPS.map((_, i) => i) },
  { label: 'Clear', indices: [] },
];

const GROWTH_HUB_PRICE = 97;

const CHECKUP = [
  {
    q: 'How do you handle new leads?',
    options: ['Scattered across email, texts and social', 'A mix', 'One organized place'],
    scores: [0, 1, 2],
  },
  {
    q: 'How do you handle follow-ups?',
    options: ['I try to remember', 'Some manual, some automatic', 'Automatic and tracked'],
    scores: [0, 1, 2],
  },
  {
    q: 'How many software tools do you use?',
    options: ['More than 6', '3 to 5', '1 or 2'],
    scores: [0, 1, 2],
  },
  {
    q: 'Do your tools share information?',
    options: ['No, I copy by hand', 'Some do', 'Mostly'],
    scores: [0, 1, 2],
  },
];

const RESULTS = [
  {
    title: 'Plenty of room to simplify',
    desc: 'Your tools are working against each other, and leads are likely slipping through. A single workspace with a few automations would change your week.',
    cta: 'See how much you could save',
  },
  {
    title: 'Partly connected',
    desc: 'You have some systems in place, but the seams are showing. We can connect the pieces that still rely on memory and manual entry.',
    cta: 'Map the gaps together',
  },
  {
    title: 'In good shape',
    desc: 'Your setup is already well-organized. The wins from here are smaller and more specific — a review can still find them.',
    cta: 'Fine-tune what you have',
  },
];

export default function SavingsPage() {
  const [selected, setSelected] = useState<Set<number>>(new Set([0, 6, 7]));
  const [preset, setPreset] = useState<string | null>(null);
  const [checkupIndex, setCheckupIndex] = useState(0);
  const [checkupAnswers, setCheckupAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const liveRef = useRef<HTMLDivElement>(null);

  const monthlyTotal = useMemo(() => {
    let t = 0;
    selected.forEach((i) => (t += APPS[i].price));
    return t;
  }, [selected]);

  const yearlyTotal = monthlyTotal * 12;
  const monthlySavings = Math.max(0, monthlyTotal - GROWTH_HUB_PRICE);
  const yearlySavings = monthlySavings * 12;

  const animatedMonthly = useTweenNumber(monthlyTotal);
  const animatedYearly = useTweenNumber(yearlyTotal);
  const animatedSaveMonth = useTweenNumber(monthlySavings);
  const animatedSaveYear = useTweenNumber(yearlySavings);

  const toggle = (i: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
    setPreset(null);
  };

  const applyPreset = (p: { label: string; indices: number[] }) => {
    setSelected(new Set(p.indices));
    setPreset(p.label === 'Select all' || p.label === 'Clear' ? p.label : p.label);
  };

  // Announce selection changes
  useEffect(() => {
    if (liveRef.current) {
      liveRef.current.textContent = `${selected.size} of 23 apps selected.`;
    }
  }, [selected.size]);

  const answer = (optionIndex: number) => {
    const newAnswers = [...checkupAnswers];
    newAnswers[checkupIndex] = CHECKUP[checkupIndex].scores[optionIndex];
    setCheckupAnswers(newAnswers);
    if (checkupIndex < CHECKUP.length - 1) {
      setCheckupIndex((i) => i + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetCheckup = () => {
    setCheckupIndex(0);
    setCheckupAnswers([]);
    setShowResult(false);
  };

  const totalScore = checkupAnswers.reduce((a, b) => a + b, 0);
  const resultIndex = totalScore <= 3 ? 0 : totalScore <= 6 ? 1 : 2;

  return (
    <main id="main" className="bg-dark-deep text-white">
      {/* HERO — dark */}
      <section className="relative pt-28 md:pt-36 pb-12 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-50" aria-hidden="true">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/20 blur-3xl rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand-700/30 blur-3xl rounded-full" />
        </div>
        <div className="relative container-gh">
          <p className="text-sm text-brand-300 mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4" aria-hidden="true" /> Savings Calculator
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight mb-5 text-measure">
            What do your tools really cost?
          </h1>
          <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
            Select the software you pay for every month. We'll show what one Growth Hub workspace could replace — and what you might keep.
          </p>
        </div>
      </section>

      {/* CALCULATOR — dark workspace */}
      <section className="bg-dark-deep pb-20 md:pb-28" aria-labelledby="calc-h">
        <h2 id="calc-h" className="sr-only">App selector and savings results</h2>
        <div className="container-gh">
          <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
            {/* App tiles */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <p className="text-white/70 text-sm" aria-live="polite" ref={liveRef}>
                  {selected.size} of 23 selected
                </p>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Presets">
                  {PRESETS.map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => applyPreset(p)}
                      aria-pressed={preset === p.label}
                      className={`px-3.5 py-2 rounded-lg text-sm font-medium border transition-colors ${
                        preset === p.label
                          ? 'bg-brand-500 text-white border-brand-500'
                          : 'bg-white/5 text-white/70 border-white/10 hover:border-brand-300/40 hover:text-white'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5" role="group" aria-label="Software apps">
                {APPS.map((app, i) => {
                  const isOn = selected.has(i);
                  return (
                    <button
                      key={app.name}
                      type="button"
                      onClick={() => toggle(i)}
                      aria-pressed={isOn}
                      className={`relative text-left p-3.5 rounded-xl border transition-all ${
                        isOn
                          ? 'bg-brand-500/15 border-brand-400 shadow-[0_0_18px_rgba(5,150,105,0.2)]'
                          : 'bg-dark-mid/60 border-white/10 hover:border-brand-300/30'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className={`text-sm font-medium leading-tight ${isOn ? 'text-white' : 'text-white/80'}`}>{app.name}</div>
                          <div className="text-[11px] text-white/40 mt-0.5">{app.category}</div>
                        </div>
                        <span className={`grid place-items-center w-5 h-5 rounded-md shrink-0 transition-colors ${isOn ? 'bg-brand-400 text-dark-deep' : 'border border-white/20'}`}>
                          {isOn && <Check className="w-3.5 h-3.5" aria-hidden="true" />}
                        </span>
                      </div>
                      <div className={`text-sm font-display font-semibold mt-2 ${isOn ? 'text-brand-300' : 'text-white/50'}`}>
                        ${app.price}<span className="text-[11px] font-normal text-white/40">/mo</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sticky results panel */}
            <aside className="lg:sticky lg:top-24">
              <div className="rounded-2xl bg-dark-mid/80 backdrop-blur border border-brand-300/25 p-6 shadow-[0_24px_60px_-20px_rgba(3,18,13,0.7)]">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-brand-300" aria-hidden="true" />
                  <span className="text-sm text-white/60">Your current stack</span>
                </div>
                <div className="font-display text-4xl font-semibold text-white tabular-nums">{formatMoney(animatedMonthly)}<span className="text-base text-white/50 font-normal">/mo</span></div>
                <div className="text-white/50 text-sm mt-1 tabular-nums">{formatMoney(animatedYearly)} per year</div>

                <div className="h-px bg-white/10 my-5" />

                <div className="flex items-center gap-2 mb-1">
                  <span className="grid place-items-center w-5 h-5 rounded-md bg-brand-500 text-white text-[10px] font-bold">GH</span>
                  <span className="text-sm text-white/60">Growth Hub Starter</span>
                </div>
                <div className="font-display text-2xl font-semibold text-brand-300 tabular-nums">${GROWTH_HUB_PRICE}<span className="text-sm text-white/50 font-normal">/mo</span></div>

                <div className="h-px bg-white/10 my-5" />

                <div className="text-xs uppercase tracking-wide text-white/40 mb-1">Possible savings</div>
                <div className="font-display text-3xl font-semibold text-brand-300 tabular-nums">{formatMoney(animatedSaveMonth)}<span className="text-base text-white/50 font-normal">/mo</span></div>
                <div className="text-white/60 text-sm mt-1 tabular-nums">{formatMoney(animatedSaveYear)} per year</div>

                {selected.size > 0 && (
                  <ul className="mt-5 space-y-1.5 max-h-40 overflow-y-auto pr-1">
                    {Array.from(selected).map((i) => (
                      <li key={i} className="flex items-center justify-between text-xs text-white/60">
                        <span className="truncate">{APPS[i].name}</span>
                        <span className="tabular-nums">${APPS[i].price}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <GhLink to="/contact#book" className="btn-primary w-full mt-6">
                  Talk through my numbers
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </GhLink>
              </div>
              <p className="text-[11px] text-white/40 mt-3 leading-relaxed">
                Prices are approximate list prices. Savings depend on the features your business actually needs. We will confirm everything during your consultation.
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* SYSTEMS CHECKUP — light */}
      <section className="bg-surface text-ink py-20 md:py-28" aria-labelledby="checkup-h">
        <div className="container-gh max-w-2xl">
          <p className="text-sm text-brand-600 mb-3">Systems checkup</p>
          <h2 id="checkup-h" className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-ink mb-3">
            How connected is your business, really?
          </h2>
          <p className="text-ink-muted text-lg mb-10">Four quick questions. One at a time.</p>

          {!showResult ? (
            <div className="bg-white border border-surface-line rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-ink-muted" aria-live="polite">
                  Question {checkupIndex + 1} of {CHECKUP.length}
                </span>
                <div className="flex gap-1.5" aria-hidden="true">
                  {CHECKUP.map((_, i) => (
                    <span key={i} className={`h-1.5 rounded-full transition-all ${i <= checkupIndex ? 'w-8 bg-brand-500' : 'w-4 bg-surface-line'}`} />
                  ))}
                </div>
              </div>

              <h3 className="font-display text-2xl font-medium text-ink mb-6" tabIndex={-1} id={`q-${checkupIndex}`}>
                {CHECKUP[checkupIndex].q}
              </h3>

              <div className="flex flex-col gap-3" role="group" aria-labelledby={`q-${checkupIndex}`}>
                {CHECKUP[checkupIndex].options.map((opt, oi) => (
                  <button
                    key={oi}
                    type="button"
                    onClick={() => answer(oi)}
                    className="flex items-center justify-between gap-3 p-4 rounded-xl border border-surface-line bg-white hover:border-brand-500 hover:bg-brand-50/40 transition-colors text-left group"
                  >
                    <span className="text-ink text-base font-medium">{opt}</span>
                    <ArrowRight className="w-5 h-5 text-brand-500 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                  </button>
                ))}
              </div>

              {checkupIndex > 0 && (
                <button
                  type="button"
                  onClick={() => setCheckupIndex((i) => Math.max(0, i - 1))}
                  className="mt-5 text-sm text-ink-muted hover:text-brand-600 transition-colors"
                >
                  Back
                </button>
              )}
            </div>
          ) : (
            <div className="bg-white border border-surface-line rounded-2xl p-6 md:p-8 shadow-sm animate-fadeUp" role="status">
              <span className="text-sm text-brand-600">Your result</span>
              <h3 className="font-display text-3xl font-medium text-ink mt-2 mb-4">{RESULTS[resultIndex].title}</h3>
              <p className="text-ink-muted text-lg leading-relaxed mb-6">{RESULTS[resultIndex].desc}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <GhLink to="/contact#book" className="btn-primary">
                  {RESULTS[resultIndex].cta}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </GhLink>
                <button type="button" onClick={resetCheckup} className="btn-ghost">
                  <RotateCcw className="w-4 h-4" aria-hidden="true" />
                  Start over
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <CTASection
        title="Want a second opinion on your stack?"
        body="Bring your list of tools to a free one-hour call. We'll tell you honestly what's earning its keep and what isn't."
        secondaryLabel="See plans"
        secondaryTo="/pricing"
      />
    </main>
  );
}
