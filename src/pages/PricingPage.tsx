import { useState, useRef, useEffect } from 'react';
import { Check, Minus, ArrowRight, Star, Calculator, TrendingUp } from 'lucide-react';
import CTASection from '@/components/CTASection';
import { GhLink } from '@/lib/router';
import { formatMoney } from '@/lib/useTweenNumber';

type Plan = {
  name: string;
  monthly: number | null;
  blurb: string;
  features: string[];
  popular?: boolean;
  highlighted?: boolean;
};

const PLANS: Plan[] = [
  {
    name: 'Starter',
    monthly: 97,
    blurb: 'Get organized with a full CRM workspace and the essentials automated.',
    features: ['Full CRM workspace', '2 active automations', '1–2 forms', 'Basic reporting', 'Email and chat support for questions'],
  },
  {
    name: 'Foundation',
    monthly: 297,
    blurb: 'Add check-ins and reporting so the system keeps improving with you.',
    features: ['Everything in Starter', '4 automations', '3 forms', 'Bi-monthly check-in call', 'Minor fixes', 'Monthly performance report'],
  },
  {
    name: 'Growth',
    monthly: 497,
    popular: true,
    highlighted: true,
    blurb: 'For businesses that want priority support and regular optimization.',
    features: ['Everything in Foundation', '8 automations', '5 forms', 'Priority support', 'Monthly one-on-one call', 'Workflow optimizations'],
  },
  {
    name: 'Full Service',
    monthly: 997,
    blurb: 'We run the whole system for you, proactively, with a dedicated contact.',
    features: ['Unlimited automations, forms, funnels & pipelines', 'Dedicated contact', 'Weekly calls as needed', 'Proactive improvements', 'Highest priority support'],
  },
];

const COMPARISON_ROWS: { label: string; values: (string | boolean)[] }[] = [
  { label: 'CRM workspace', values: [true, true, true, true] },
  { label: 'Contact import', values: [true, true, true, true] },
  { label: 'Core reporting', values: [true, true, true, true] },
  { label: 'Active automations', values: ['2', '4', '8', 'Unlimited'] },
  { label: 'Forms', values: ['1–2', '3', '5', 'Unlimited'] },
  { label: 'Funnels & pipelines', values: ['—', '—', '—', 'Unlimited'] },
  { label: 'Check-in call', values: ['—', 'Bi-monthly', 'Monthly 1:1', 'Weekly as needed'] },
  { label: 'Performance report', values: ['—', 'Monthly', 'Monthly', 'On request'] },
  { label: 'Workflow optimizations', values: ['—', 'Minor fixes', true, 'Proactive'] },
  { label: 'Support tier', values: ['Email & chat', 'Email & chat', 'Priority', 'Highest priority'] },
  { label: 'Dedicated contact', values: ['—', '—', '—', true] },
];

function priceFor(plan: Plan, annual: boolean): number | null {
  if (plan.monthly === null) return null;
  return annual ? Math.round(plan.monthly * 0.8) : plan.monthly;
}

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  // Revenue estimator
  const [customers, setCustomers] = useState(15);
  const [value, setValue] = useState(297);
  const monthlyRevenue = customers * value;
  const yearlyRevenue = monthlyRevenue * 12;
  const custRef = useRef<HTMLInputElement>(null);
  const valRef = useRef<HTMLInputElement>(null);
  const liveRevenueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (liveRevenueRef.current) {
      liveRevenueRef.current.textContent = `Estimated ${formatMoney(monthlyRevenue)} per month, ${formatMoney(yearlyRevenue)} per year.`;
    }
  }, [monthlyRevenue, yearlyRevenue]);

  return (
    <main id="main">
      {/* HERO — dark */}
      <section className="bg-dark-deep text-white pt-28 md:pt-36 pb-16 md:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-60" aria-hidden="true">
          <div className="absolute top-10 right-1/3 w-72 h-72 bg-brand-500/15 blur-3xl rounded-full" />
        </div>
        <div className="relative container-gh max-w-3xl">
          <p className="text-sm text-brand-300 mb-4">Pricing</p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight mb-5">
            Plans that scale with your comfort.
          </h1>
          <p className="text-lg text-white/75 leading-relaxed text-measure-tight">
            Every plan includes your own workspace, contact import and core reporting. Texts, calls, email and AI usage are billed at cost. Setup is quoted separately after consultation.
          </p>

          {/* Billing toggle */}
          <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-xl bg-dark-mid/80 border border-white/10">
            <button
              type="button"
              onClick={() => setAnnual(false)}
              aria-pressed={!annual}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${!annual ? 'bg-brand-500 text-white' : 'text-white/60 hover:text-white'}`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              aria-pressed={annual}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${annual ? 'bg-brand-500 text-white' : 'text-white/60 hover:text-white'}`}
            >
              Annual <span className="text-brand-300 ml-1">save 20%</span>
            </button>
          </div>
        </div>
      </section>

      {/* PLAN CARDS — dark to light transition */}
      <section className="bg-gradient-to-b from-dark-deep to-dark-mid text-white pt-6 md:pt-10 pb-20 md:pb-28" aria-labelledby="plans-h">
        <h2 id="plans-h" className="sr-only">Plans</h2>
        <div className="container-gh">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PLANS.map((plan) => {
              const price = priceFor(plan, annual);
              const popular = plan.popular;
              return (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl p-6 border flex flex-col ${
                    popular
                      ? 'bg-brand-500/10 border-brand-400 shadow-[0_0_40px_rgba(5,150,105,0.25)]'
                      : 'bg-dark-mid/60 border-white/10'
                  }`}
                >
                  {popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-400 text-dark-deep text-xs font-semibold">
                      <Star className="w-3 h-3" aria-hidden="true" />
                      Most popular
                    </span>
                  )}
                  <h3 className="font-display text-xl font-medium text-white">{plan.name}</h3>
                  <div className="mt-3 mb-1">
                    {price === null ? (
                      <span className="font-display text-3xl font-semibold text-white">$997<span className="text-sm text-white/50 font-normal">+/mo</span></span>
                    ) : (
                      <span className="font-display text-4xl font-semibold text-white tabular-nums">${price}<span className="text-sm text-white/50 font-normal">/mo</span></span>
                    )}
                  </div>
                  <p className="text-xs text-white/45 mb-4">{annual ? 'billed annually' : 'billed monthly'}</p>
                  <p className="text-sm text-white/65 leading-relaxed mb-5 min-h-[3.5rem]">{plan.blurb}</p>

                  <ul className="space-y-2.5 mb-6 flex-1">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-white/80">
                        <Check className="w-4 h-4 text-brand-300 mt-0.5 shrink-0" aria-hidden="true" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <GhLink
                    to="/contact#book"
                    className={popular ? 'btn-primary w-full' : 'btn-ghost-dark w-full'}
                  >
                    {price === null ? 'Get a quote' : `Choose ${plan.name}`}
                  </GhLink>
                </div>
              );
            })}
          </div>

          <p className="text-center text-sm text-white/45 mt-8">
            Not sure which fits? Book a call and we will recommend one, even if that is the smallest.
          </p>
        </div>
      </section>

      {/* COMPARISON TABLE — light */}
      <section className="bg-white py-20 md:py-28" aria-labelledby="compare-h">
        <div className="container-gh">
          <p className="text-sm text-brand-600 mb-3">Side by side</p>
          <h2 id="compare-h" className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-ink mb-8">
            Compare every feature.
          </h2>
          <div className="scroll-x rounded-xl border border-surface-line" role="region" aria-label="Feature comparison table" tabIndex={0}>
            <table className="w-full border-collapse min-w-[680px] text-sm">
              <thead>
                <tr className="bg-surface">
                  <th scope="col" className="text-left p-4 font-display font-medium text-ink sticky left-0 bg-surface z-10 min-w-[180px]">Feature</th>
                  {PLANS.map((p) => (
                    <th key={p.name} scope="col" className={`text-center p-4 font-display font-medium ${p.highlighted ? 'text-brand-600' : 'text-ink'}`}>
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, ri) => (
                  <tr key={row.label} className={ri % 2 === 0 ? 'bg-white' : 'bg-surface/50'}>
                    <th scope="row" className="text-left p-4 font-normal text-ink-soft sticky left-0 bg-inherit z-10 min-w-[180px] border-r border-surface-line">
                      {row.label}
                    </th>
                    {row.values.map((v, vi) => (
                      <td key={vi} className="text-center p-4 text-ink-muted">
                        {v === true ? (
                          <Check className="w-5 h-5 text-brand-600 inline" aria-label="Included" />
                        ) : v === false || v === '—' ? (
                          <Minus className="w-4 h-4 text-ink-muted/40 inline" aria-label="Not included" />
                        ) : (
                          <span className="tabular-nums">{v}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-ink-muted mt-3">Scroll the table left and right on smaller screens. Plans are month-to-month; annual billing saves 20% and can be cancelled before the next renewal.</p>
        </div>
      </section>

      {/* REVENUE ESTIMATOR — dark */}
      <section className="bg-dark-deep text-white py-20 md:py-28" aria-labelledby="rev-h">
        <div className="container-gh max-w-3xl">
          <p className="text-sm text-brand-300 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" aria-hidden="true" /> Revenue estimator
          </p>
          <h2 id="rev-h" className="font-display text-3xl sm:text-4xl font-medium tracking-tight mb-3">
            What could this be worth to your business?
          </h2>
          <p className="text-white/65 text-lg mb-10">
            A planning estimate, not a promise of results. Move the sliders to see the math.
          </p>

          <div className="grid sm:grid-cols-2 gap-8 mb-10">
            <div>
              <label htmlFor="rev-customers" className="block text-sm text-white/70 mb-3">
                Customers served per month: <span className="text-brand-300 font-semibold tabular-nums">{customers}</span>
              </label>
              <input
                ref={custRef}
                id="rev-customers"
                type="range"
                min={1}
                max={100}
                value={customers}
                onChange={(e) => setCustomers(Number(e.target.value))}
                className="w-full accent-brand-500 h-2"
              />
              <div className="flex justify-between text-[11px] text-white/40 mt-1"><span>1</span><span>100</span></div>
            </div>
            <div>
              <label htmlFor="rev-value" className="block text-sm text-white/70 mb-3">
                Average monthly value per customer: <span className="text-brand-300 font-semibold tabular-nums">{formatMoney(value)}</span>
              </label>
              <input
                ref={valRef}
                id="rev-value"
                type="range"
                min={50}
                max={1000}
                step={10}
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-full accent-brand-500 h-2"
              />
              <div className="flex justify-between text-[11px] text-white/40 mt-1"><span>$50</span><span>$1,000</span></div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4" ref={liveRevenueRef} aria-live="polite">
            <div className="rounded-xl bg-dark-mid/70 border border-brand-300/20 p-6">
              <div className="text-sm text-white/55 mb-1">Estimated monthly</div>
              <div className="font-display text-4xl font-semibold text-brand-300 tabular-nums">{formatMoney(monthlyRevenue)}</div>
            </div>
            <div className="rounded-xl bg-dark-mid/70 border border-brand-300/20 p-6">
              <div className="text-sm text-white/55 mb-1">Estimated yearly</div>
              <div className="font-display text-4xl font-semibold text-brand-300 tabular-nums">{formatMoney(yearlyRevenue)}</div>
            </div>
          </div>
          <p className="text-xs text-white/40 mt-4 flex items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5" aria-hidden="true" />
            For planning only. Real results depend on your industry, market and effort.
          </p>

          <div className="mt-10">
            <GhLink to="/contact#book" className="btn-primary">
              Book a free consultation
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </GhLink>
          </div>
        </div>
      </section>

      <CTASection
        title="Still deciding?"
        body="Book a free call. We'll learn what you need and point you to the right plan — even if that means spending less with us."
        dark={false}
      />
    </main>
  );
}
