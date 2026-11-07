import { CalendarCheck, ArrowRight } from 'lucide-react';
import { GhLink } from '@/lib/router';

/** Reusable deep-green closing CTA band. */
export default function CTASection({
  title,
  body,
  primaryLabel = 'Book a free consultation',
  primaryTo = '/contact#book',
  secondaryLabel,
  secondaryTo,
  dark = true,
}: {
  title: string;
  body: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
  dark?: boolean;
}) {
  return (
    <section className={`${dark ? 'bg-dark-deep text-white' : 'bg-surface text-ink'} transition-colors`}>
      <div className="container-gh py-20 md:py-28 text-center max-w-3xl mx-auto px-6">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-5">{title}</h2>
        <p className={`text-base sm:text-lg leading-relaxed mb-8 ${dark ? 'text-white/75' : 'text-ink-muted'} text-measure mx-auto`}>{body}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <GhLink to={primaryTo} className={`btn-primary ${dark ? '' : ''} shadow-[0_0_28px_rgba(5,150,105,0.4)]`}>
            <CalendarCheck className="w-5 h-5" aria-hidden="true" />
            {primaryLabel}
          </GhLink>
          {secondaryLabel && secondaryTo && (
            <GhLink to={secondaryTo} className={dark ? 'btn-ghost-dark' : 'btn-ghost'}>
              {secondaryLabel}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </GhLink>
          )}
        </div>
        <p className={`mt-5 text-sm ${dark ? 'text-white/50' : 'text-ink-muted/70'}`}>The first call is one hour, free, no obligation.</p>
      </div>
    </section>
  );
}
