import { ArrowRight, ArrowDown, CalendarCheck, Calculator, MessagesSquare, Bot, Globe, Workflow, Check, HandHelping } from 'lucide-react';
import HeroScene from '@/components/HeroScene';
import LiveOpsCard from '@/components/LiveOpsCard';
import AutomationDemo from '@/components/AutomationDemo';
import CTASection from '@/components/CTASection';
import { GhLink } from '@/lib/router';

const PROBLEMS = [
  'Inquiries scattered across texts, emails and social media.',
  'Follow-ups depend on memory.',
  'Tools do not communicate with each other.',
  'The same information gets entered more than once.',
  'Monthly software bills keep adding up.',
];

const SERVICES_OVERVIEW = [
  { icon: MessagesSquare, title: 'CRM & contact management', desc: 'Pipelines that match how you sell. Tags, notes, tasks and reminders. Lead and sales dashboards.', to: '/services' },
  { icon: Workflow, title: 'Business automation', desc: 'Instant replies, confirmations, reminders and missed-call text-back. Follow-ups that stop when a customer replies.', to: '/services' },
  { icon: Bot, title: 'AI assistance', desc: 'Trained on your services, hours and policies. It hands off to a person when asked or unsure.', to: '/services' },
  { icon: Globe, title: 'Custom websites', desc: 'Forms and booking that feed your pipeline. Mobile-first. Quoted by page count and functionality.', to: '/services' },
];

const TIMELINE = [
  { n: '01', title: 'We talk.', desc: 'A free one-hour call. You tell me where things break down. I tell you honestly whether I can help.' },
  { n: '02', title: 'You receive a written plan.', desc: 'A clear scope, the tools I recommend, and what each piece costs. No surprises, no pressure.' },
  { n: '03', title: 'We build and train you.', desc: 'I set everything up, move your contacts over, and show you how it works — in plain language.' },
];

export default function HomePage() {
  return (
    <main id="main">
      {/* HERO — dark immersive */}
      <section className="relative bg-dark-deep text-white overflow-hidden pt-28 md:pt-36 pb-20 md:pb-28">
        <HeroScene />
        {/* static gradient fallback layered behind canvas content */}
        <div className="relative z-10 container-gh">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="animate-fadeUp">
              <p className="text-sm text-brand-300 mb-5 flex items-center gap-2">
                <span className="w-6 h-px bg-brand-400" aria-hidden="true" />
                CRM, automation, AI &amp; websites — Phoenix, AZ
              </p>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.05] mb-6 text-measure">
                Your leads, messages and appointments in one organized place.
              </h1>
              <p className="text-lg text-white/75 leading-relaxed mb-8 text-measure-tight">
                Growth Hub sets up the CRM, follow-ups and website forms your business runs on, then teaches you to use them.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <GhLink to="/contact#book" className="btn-primary shadow-[0_0_28px_rgba(5,150,105,0.4)]">
                  <CalendarCheck className="w-5 h-5" aria-hidden="true" />
                  Book a free consultation
                </GhLink>
                <GhLink to="/savings-calculator" className="btn-ghost-dark">
                  <Calculator className="w-5 h-5" aria-hidden="true" />
                  Check what you pay for software
                </GhLink>
              </div>
              <p className="mt-5 text-sm text-white/50">The first call is one hour, free, no obligation.</p>
            </div>

            <div className="animate-fadeUp" style={{ animationDelay: '0.15s' }}>
              <LiveOpsCard />
            </div>
          </div>

          {/* scroll cue */}
          <div className="hidden md:flex items-center gap-2 text-white/40 text-xs mt-16">
            <ArrowDown className="w-4 h-4 animate-bounce" aria-hidden="true" />
            Scroll to see what we fix
          </div>
        </div>
      </section>

      {/* PROBLEM — editorial ruled list on light */}
      <section className="bg-surface pt-20 md:pt-28 pb-20 md:pb-28" aria-labelledby="problem-h">
        <div className="container-gh max-w-4xl">
          <p className="text-sm text-brand-600 mb-4">The problem</p>
          <h2 id="problem-h" className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-10 text-ink text-measure">
            Most businesses don't have a lead problem. They have a scattered-tools problem.
          </h2>
          <ul className="border-t border-surface-line">
            {PROBLEMS.map((p, i) => (
              <li key={i} className="border-b border-surface-line py-5 flex items-baseline gap-5">
                <span className="font-display text-brand-500 text-sm font-semibold w-8 shrink-0" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-ink-soft text-lg leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-ink-muted text-base max-w-prose">
            Sound familiar? We replace the pile with one organized place — and the work that used to fall through the cracks gets done.
          </p>
        </div>
      </section>

      {/* AUTOMATION DEMO — dark */}
      <section className="bg-dark-deep text-white py-20 md:py-28" aria-labelledby="auto-h">
        <div className="container-gh">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <p className="text-sm text-brand-300 mb-4">Automation in action</p>
            <h2 id="auto-h" className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4">
              See what happens when a customer calls or texts.
            </h2>
            <p className="text-white/65 text-lg leading-relaxed">
              Pick a route. The system handles the rest — and you stay in control.
            </p>
          </div>
          <AutomationDemo />
        </div>
      </section>

      {/* SERVICES OVERVIEW — varied layout on light */}
      <section className="bg-white py-20 md:py-28" aria-labelledby="serv-h">
        <div className="container-gh">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-sm text-brand-600 mb-4">What we set up</p>
              <h2 id="serv-h" className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-ink text-measure">
                Four pieces, one workspace.
              </h2>
            </div>
            <GhLink to="/services" className="btn-ghost shrink-0">
              See all services
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </GhLink>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-surface-line border border-surface-line rounded-xl overflow-hidden">
            {SERVICES_OVERVIEW.map((s) => {
              const Icon = s.icon;
              return (
                <GhLink
                  key={s.title}
                  to={s.to}
                  className="group bg-white p-7 md:p-9 hover:bg-surface transition-colors flex gap-5 items-start"
                >
                  <span className="grid place-items-center w-12 h-12 rounded-xl bg-brand-500/10 text-brand-600 shrink-0 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-medium text-ink mb-2">{s.title}</h3>
                    <p className="text-ink-muted text-base leading-relaxed">{s.desc}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-brand-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1.5" aria-hidden="true" />
                </GhLink>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW WE WORK — vertical timeline on light */}
      <section className="bg-surface py-20 md:py-28" aria-labelledby="how-h">
        <div className="container-gh max-w-3xl">
          <p className="text-sm text-brand-600 mb-4">How we work together</p>
          <h2 id="how-h" className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-ink mb-12">
            Three steps. No mystery.
          </h2>
          <ol className="relative border-l-2 border-brand-300/40 ml-2">
            {TIMELINE.map((step, i) => (
              <li key={i} className="relative pl-8 md:pl-10 pb-10 last:pb-0">
                <span className="absolute -left-[11px] top-0 grid place-items-center w-5 h-5 rounded-full bg-brand-500 ring-4 ring-surface" aria-hidden="true">
                  <Check className="w-3 h-3 text-white" />
                </span>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-display text-brand-500 text-sm font-semibold">{step.n}</span>
                  <h3 className="font-display text-2xl font-medium text-ink">{step.title}</h3>
                </div>
                <p className="text-ink-muted text-lg leading-relaxed text-measure-tight">{step.desc}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 pl-8 md:pl-10">
            <GhLink to="/contact#book" className="btn-primary">
              <HandHelping className="w-5 h-5" aria-hidden="true" />
              Start with a free call
            </GhLink>
          </div>
        </div>
      </section>

      <CTASection
        title="Let's see if we're a fit."
        body="Book a free one-hour consultation. We'll look at what you're using now, where leads are getting lost, and whether Growth Hub can help. If it can't, I'll tell you."
        secondaryLabel="See pricing"
        secondaryTo="/pricing"
      />
    </main>
  );
}
