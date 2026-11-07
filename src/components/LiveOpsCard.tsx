import { MessageSquare, CalendarCheck, PhoneMissed, UserPlus, Clock, CheckCircle2 } from 'lucide-react';

/**
 * Live-ops product visual with realistic sample data.
 * Pure HTML/CSS/SVG, no external images. Labeled illustrative.
 */
const events = [
  { icon: UserPlus, label: 'New lead from an Instagram message', name: 'Daniela R.', time: '2m ago', tone: 'lead' as const },
  { icon: CalendarCheck, label: 'Booking confirmed', name: 'Marcus T. — Tue 11:00 AM', time: '6m ago', tone: 'book' as const },
  { icon: PhoneMissed, label: 'Missed-call text-back sent', name: 'Auto-reply to (602) 555-0148', time: '11m ago', tone: 'auto' as const },
  { icon: MessageSquare, label: 'Quote request logged in pipeline', name: 'Priya S. — Kitchen remodel', time: '18m ago', tone: 'pipe' as const },
];

export default function LiveOpsCard() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="absolute -inset-6 bg-brand-500/15 blur-3xl rounded-full" aria-hidden="true" />
      <div className="relative rounded-2xl bg-dark-mid/90 backdrop-blur-xl border border-brand-300/25 shadow-[0_30px_80px_-20px_rgba(3,18,13,0.8)] overflow-hidden">
        {/* top bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-400 animate-pulseSoft" aria-hidden="true" />
            <span className="text-white text-sm font-medium">Live workspace</span>
          </div>
          <span className="text-[11px] text-white/45 uppercase tracking-wide flex items-center gap-1">
            <Clock className="w-3 h-3" aria-hidden="true" /> now
          </span>
        </div>

        {/* pipeline summary */}
        <div className="grid grid-cols-3 gap-px bg-white/5">
          {[
            { k: 'New leads', v: '12' },
            { k: 'Follow-ups', v: '5' },
            { k: 'Booked', v: '8' },
          ].map((s) => (
            <div key={s.k} className="bg-dark-mid px-4 py-3">
              <div className="text-white text-xl font-display font-semibold">{s.v}</div>
              <div className="text-[11px] text-white/50 mt-0.5">{s.k}</div>
            </div>
          ))}
        </div>

        {/* activity list */}
        <ul className="divide-y divide-white/5">
          {events.map((e, i) => {
            const Icon = e.icon;
            const toneClass =
              e.tone === 'lead' ? 'text-brand-300 bg-brand-500/15' :
              e.tone === 'book' ? 'text-emerald-200 bg-emerald-400/15' :
              e.tone === 'auto' ? 'text-amber-200 bg-amber-400/15' :
              'text-sky-200 bg-sky-400/15';
            return (
              <li key={i} className="flex items-start gap-3 px-5 py-3.5">
                <span className={`grid place-items-center w-8 h-8 rounded-lg shrink-0 ${toneClass}`}>
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-white text-sm font-medium leading-snug">{e.label}</p>
                  <p className="text-white/55 text-xs mt-0.5 truncate">{e.name}</p>
                </div>
                <span className="text-[11px] text-white/40 shrink-0">{e.time}</span>
              </li>
            );
          })}
        </ul>

        <div className="px-5 py-3 border-t border-white/10 flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-brand-300" aria-hidden="true" />
          <span className="text-[11px] text-white/50">Everything in one list, nothing forgotten.</span>
        </div>
      </div>
      <p className="text-center text-[11px] text-white/40 mt-3">Illustration with sample data.</p>
    </div>
  );
}
