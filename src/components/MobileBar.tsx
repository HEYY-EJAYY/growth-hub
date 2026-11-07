import { CalendarCheck } from 'lucide-react';
import { GhLink } from '@/lib/router';

/** Fixed bottom bar on mobile with the persistent CTA. */
export default function MobileBar() {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-dark-deep/95 backdrop-blur-md border-t border-brand-300/20 px-4 py-2.5 safe-pb">
      <GhLink
        to="/contact#book"
        className="btn-primary w-full !py-3.5 text-base"
      >
        <CalendarCheck className="w-5 h-5" aria-hidden="true" />
        Book a free consultation
      </GhLink>
    </div>
  );
}
