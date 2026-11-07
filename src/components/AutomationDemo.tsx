import { useState } from 'react';
import { Phone, MessageSquare, Calendar, FileText, UserCheck, Moon, ArrowRight, Check } from 'lucide-react';

type Route = {
  id: 'book' | 'quote' | 'speak' | 'after';
  label: string;
  icon: typeof Phone;
  short: string;
  steps: [string, string];
};

const ROUTES: Route[] = [
  {
    id: 'book',
    label: 'Book a meeting',
    icon: Calendar,
    short: 'They want to schedule.',
    steps: [
      'We text a booking link and add the appointment to your calendar.',
      'A reminder goes out the day before.',
    ],
  },
  {
    id: 'quote',
    label: 'Ask for a quote',
    icon: FileText,
    short: 'They are shopping around.',
    steps: [
      'We reply asking what they need and log it in your pipeline.',
      'You receive an alert to prepare an accurate quote.',
    ],
  },
  {
    id: 'speak',
    label: 'Speak to someone',
    icon: UserCheck,
    short: 'They want a person.',
    steps: [
      'The conversation is flagged and you are notified.',
      'The customer is told someone will be in touch.',
    ],
  },
  {
    id: 'after',
    label: 'After hours',
    icon: Moon,
    short: 'You are closed.',
    steps: [
      'A polite message with your business hours and booking link is sent.',
      'The lead is waiting in your list the next morning.',
    ],
  },
];

export default function AutomationDemo() {
  const [active, setActive] = useState<Route['id'] | null>(null);
  const current = ROUTES.find((r) => r.id === active) ?? null;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Trigger node */}
      <div className="flex flex-col items-center">
        <div className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-dark-mid border border-brand-300/30 shadow-[0_0_30px_rgba(5,150,105,0.2)]">
          <span className="grid place-items-center w-8 h-8 rounded-lg bg-brand-500 text-white">
            <Phone className="w-4 h-4" aria-hidden="true" />
          </span>
          <div className="text-left">
            <div className="text-white text-sm font-semibold">A customer calls or texts</div>
            <div className="text-white/50 text-xs">Trigger</div>
          </div>
        </div>
        <div className="w-px h-8 bg-brand-300/30" aria-hidden="true" />
        <div className="text-[11px] uppercase tracking-wider text-white/40">IF / ELSE</div>
        <div className="w-px h-6 bg-brand-300/30" aria-hidden="true" />
      </div>

      {/* Route branches */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {ROUTES.map((r) => {
          const Icon = r.icon;
          const selected = active === r.id;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => setActive(selected ? null : r.id)}
              aria-pressed={selected}
              className={`group relative flex flex-col items-center gap-2 p-4 rounded-xl border text-center transition-all ${
                selected
                  ? 'bg-brand-500/20 border-brand-400 text-white shadow-[0_0_24px_rgba(5,150,105,0.25)]'
                  : 'bg-dark-mid/60 border-white/10 text-white/70 hover:border-brand-300/40 hover:text-white'
              }`}
            >
              <span className={`grid place-items-center w-10 h-10 rounded-lg ${selected ? 'bg-brand-500 text-white' : 'bg-white/5 text-brand-300'}`}>
                <Icon className="w-5 h-5" aria-hidden="true" />
              </span>
              <span className="text-sm font-medium leading-tight">{r.label}</span>
              <span className="text-[11px] text-white/40 leading-tight">{r.short}</span>
              {selected && (
                <span className="absolute -top-2 -right-2 grid place-items-center w-5 h-5 rounded-full bg-brand-400 text-dark-deep">
                  <Check className="w-3 h-3" aria-hidden="true" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Flow reveal */}
      <div className="mt-6 min-h-[120px]" aria-live="polite">
        {current ? (
          <ol className="flex flex-col gap-3 animate-fadeUp" key={current.id}>
            {current.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3 p-4 rounded-xl bg-dark-mid/70 border border-brand-300/20">
                <span className="grid place-items-center w-7 h-7 rounded-full bg-brand-500 text-white text-xs font-bold shrink-0">{i + 1}</span>
                <p className="text-white/85 text-sm leading-relaxed">{step}</p>
              </li>
            ))}
            <li className="flex items-center gap-2 text-brand-300 text-sm pl-2">
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
              <span>Then the lead sits, organized, in your list — nothing slips.</span>
            </li>
          </ol>
        ) : (
          <p className="text-center text-white/45 text-sm py-8 px-4 rounded-xl border border-dashed border-white/10">
            <MessageSquare className="w-4 h-4 inline mr-2" aria-hidden="true" />
            Pick a route above to see what happens automatically.
          </p>
        )}
      </div>
    </div>
  );
}
