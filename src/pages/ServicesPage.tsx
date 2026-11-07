import { useState, useEffect, useRef } from 'react';
import { MessagesSquare, Workflow, Bot, Globe, Plus, Building2, Wrench, ShoppingCart, GraduationCap, Scale, Stethoscope, Car, Check } from 'lucide-react';
import CTASection from '@/components/CTASection';

const LAYERS = [
  {
    id: 'crm',
    icon: MessagesSquare,
    name: 'CRM & contact management',
    short: 'Customer relationship management',
    items: [
      'Pipelines that match how you sell',
      'Tags, notes, tasks and reminders',
      'Lead and sales dashboards',
      'Import of existing contacts',
    ],
  },
  {
    id: 'automation',
    icon: Workflow,
    name: 'Business automation',
    short: 'Replies, reminders and routing',
    items: [
      'Instant replies',
      'Appointment confirmations and reminders',
      'Missed-call text-back',
      'Follow-ups that stop when a customer replies',
    ],
  },
  {
    id: 'ai',
    icon: Bot,
    name: 'AI assistance',
    short: 'Trained on your business',
    items: [
      'Trained on your services, hours and policies',
      'Does not guess prices or promise results',
      'Hands off to a person when asked or unsure',
    ],
  },
  {
    id: 'website',
    icon: Globe,
    name: 'Custom websites',
    short: 'Forms and booking that feed your pipeline',
    items: [
      'Forms and booking that feed your pipeline',
      'Mobile-first',
      'Quoted by page count and functionality',
    ],
  },
];

const ADDONS = [
  'Ad management', 'Social media management', 'Business consulting',
  'Virtual assistant hiring', 'Print and branded materials',
];

const INDUSTRIES = [
  { icon: Wrench, label: 'Home services' },
  { icon: Building2, label: 'Real estate' },
  { icon: Stethoscope, label: 'Health & wellness' },
  { icon: Scale, label: 'Legal & professional' },
  { icon: Car, label: 'Automotive' },
  { icon: ShoppingCart, label: 'E-commerce' },
  { icon: GraduationCap, label: 'Coaching' },
];

export default function ServicesPage() {
  const [active, setActive] = useState<string>('crm');
  const refs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = (e.target as HTMLElement).dataset.layerId;
            if (id) setActive(id);
          }
        });
      },
      { rootMargin: '-30% 0px -50% 0px', threshold: 0 }
    );
    Object.values(refs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main id="main">
      {/* HERO — dark with architecture preview */}
      <section className="bg-dark-deep text-white pt-28 md:pt-36 pb-16 md:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-50" aria-hidden="true">
          <div className="absolute top-20 left-1/3 w-80 h-80 bg-brand-500/15 blur-3xl rounded-full" />
        </div>
        <div className="relative container-gh max-w-3xl">
          <p className="text-sm text-brand-300 mb-4">Services</p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight mb-5 text-measure">
            One connected system, built around how you already work.
          </h1>
          <p className="text-lg text-white/75 leading-relaxed text-measure-tight">
            Four layers — CRM, automation, AI assistance and your website — that talk to each other. We set them up, import your data, and train you to run them.
          </p>
        </div>

        {/* Architecture diagram preview */}
        <div className="relative container-gh mt-14 hidden md:block">
          <div className="relative rounded-2xl bg-dark-mid/40 border border-white/10 p-10">
            <ArchitectureDiagram active={active} onSelect={setActive} />
          </div>
        </div>
      </section>

      {/* LAYERS — each layer section */}
      <section className="bg-surface py-20 md:py-28" aria-labelledby="layers-h">
        <div className="container-gh">
          <h2 id="layers-h" className="sr-only">Service layers</h2>
          <div className="grid lg:grid-cols-[200px_1fr] gap-10">
            {/* sticky nav */}
            <nav className="hidden lg:block" aria-label="Service layers">
              <ul className="sticky top-28 space-y-1 border-l border-surface-line">
                {LAYERS.map((l) => (
                  <li key={l.id}>
                    <button
                      type="button"
                      onClick={() => refs.current[l.id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                      className={`block pl-4 py-2.5 text-sm font-medium border-l-2 -ml-px transition-colors text-left w-full ${
                        active === l.id ? 'border-brand-500 text-brand-600' : 'border-transparent text-ink-muted hover:text-ink'
                      }`}
                    >
                      {l.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="space-y-16 md:space-y-24">
              {LAYERS.map((layer, i) => {
                const Icon = layer.icon;
                return (
                  <article
                    key={layer.id}
                    ref={(el) => { refs.current[layer.id] = el; }}
                    data-layer-id={layer.id}
                    className="scroll-mt-28"
                    aria-labelledby={`layer-${layer.id}`}
                  >
                    <div className="flex items-baseline gap-4 mb-6">
                      <span className="font-display text-4xl text-brand-500/30 font-semibold" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                      <span className="grid place-items-center w-12 h-12 rounded-xl bg-brand-500 text-white shrink-0">
                        <Icon className="w-6 h-6" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 id={`layer-${layer.id}`} className="font-display text-2xl md:text-3xl font-medium text-ink">{layer.name}</h3>
                        <p className="text-ink-muted text-sm mt-0.5">{layer.short}</p>
                      </div>
                    </div>
                    <ul className="grid sm:grid-cols-2 gap-3 border-t border-surface-line pt-6">
                      {layer.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-brand-600 mt-0.5 shrink-0" aria-hidden="true" />
                          <span className="text-ink-soft text-base leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}

              {/* Add-ons */}
              <article className="scroll-mt-28" aria-labelledby="addons-h">
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="font-display text-4xl text-brand-500/30 font-semibold" aria-hidden="true">05</span>
                  <span className="grid place-items-center w-12 h-12 rounded-xl bg-brand-500/10 text-brand-600 shrink-0">
                    <Plus className="w-6 h-6" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 id="addons-h" className="font-display text-2xl md:text-3xl font-medium text-ink">Optional add-ons</h3>
                    <p className="text-ink-muted text-sm mt-0.5">Available when you need them</p>
                  </div>
                </div>
                <ul className="flex flex-wrap gap-2.5 border-t border-surface-line pt-6">
                  {ADDONS.map((a) => (
                    <li key={a} className="px-4 py-2.5 rounded-lg bg-white border border-surface-line text-ink-soft text-sm font-medium">
                      {a}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE WORK WITH — light */}
      <section className="bg-white py-20 md:py-28" aria-labelledby="who-h">
        <div className="container-gh max-w-4xl">
          <p className="text-sm text-brand-600 mb-3">Who we work with</p>
          <h2 id="who-h" className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-ink mb-4">
            Startups, small businesses and established companies.
          </h2>
          <p className="text-ink-muted text-lg mb-10 text-measure-tight">
            If you talk to customers, book appointments and send follow-ups, the system fits. We work across industries:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {INDUSTRIES.map((ind) => {
              const Icon = ind.icon;
              return (
                <div key={ind.label} className="flex items-center gap-3 p-4 rounded-xl border border-surface-line bg-surface/50">
                  <Icon className="w-5 h-5 text-brand-600 shrink-0" aria-hidden="true" />
                  <span className="text-ink-soft text-sm font-medium">{ind.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        title="Tell us what you're running on."
        body="Book a free one-hour consultation. We'll look at your current setup and show you exactly what each layer would replace."
        secondaryLabel="See pricing"
        secondaryTo="/pricing"
      />
    </main>
  );
}

function ArchitectureDiagram({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
  return (
    <div className="relative">
      {/* connecting lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
        <defs>
          <linearGradient id="arch-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#059669" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#6ee7b7" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>
      <div className="grid grid-cols-4 gap-4">
        {LAYERS.map((layer) => {
          const Icon = layer.icon;
          const isActive = active === layer.id;
          return (
            <button
              key={layer.id}
              type="button"
              onClick={() => onSelect(layer.id)}
              className={`flex flex-col items-center gap-3 p-5 rounded-xl border transition-all ${
                isActive
                  ? 'bg-brand-500/15 border-brand-400 shadow-[0_0_24px_rgba(5,150,105,0.25)]'
                  : 'bg-dark-mid/50 border-white/10 hover:border-brand-300/40'
              }`}
            >
              <span className={`grid place-items-center w-12 h-12 rounded-xl ${isActive ? 'bg-brand-500 text-white' : 'bg-white/5 text-brand-300'}`}>
                <Icon className="w-6 h-6" aria-hidden="true" />
              </span>
              <span className="text-white text-xs font-medium text-center leading-tight">{layer.name.split(' & ')[0]}</span>
            </button>
          );
        })}
      </div>
      {/* hub bar */}
      <div className="mt-6 flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-500/10 border border-brand-300/20">
        <div className="flex items-center gap-2 text-brand-300 text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulseSoft" aria-hidden="true" />
          All connected through one Growth Hub workspace
        </div>
      </div>
    </div>
  );
}
