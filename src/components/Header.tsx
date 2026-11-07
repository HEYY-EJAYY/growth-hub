import { useEffect, useState } from 'react';
import { Menu, X, Sparkles, CalendarCheck } from 'lucide-react';
import { NAV_LINKS } from '@/lib/site';
import { useRouter, GhLink } from '@/lib/router';
import { useMotion } from '@/lib/motion';

export default function Header() {
  const { path } = useRouter();
  const { reduced, toggle } = useMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-dark-deep/95 backdrop-blur-md border-b border-brand-300/15' : 'bg-dark-deep/70 backdrop-blur-sm'
      }`}
    >
      <a href="#main" className="skip-link on-dark">Skip to content</a>
      <div className="container-gh flex items-center justify-between h-16 md:h-20">
        <GhLink to="/" className="flex items-center gap-2 text-white on-dark" ariaLabel="Growth Hub home">
          <span className="grid place-items-center w-9 h-9 rounded-lg bg-brand-500 text-white shadow-[0_0_18px_rgba(5,150,105,0.45)]">
            <Sparkles className="w-5 h-5" aria-hidden="true" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">Growth Hub</span>
        </GhLink>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {NAV_LINKS.map((l) => {
            const active = path === l.to;
            return (
              <GhLink
                key={l.to}
                to={l.to}
                ariaCurrent={active ? 'page' : undefined}
                className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors on-dark ${
                  active ? 'text-brand-300' : 'text-white/75 hover:text-white'
                }`}
              >
                {l.label}
                {active && (
                  <span className="absolute left-3.5 right-3.5 -bottom-0.5 h-0.5 rounded-full bg-brand-400" aria-hidden="true" />
                )}
              </GhLink>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-pressed={reduced}
            className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-white/70 hover:text-white border border-white/10 hover:border-brand-300/40 transition-colors on-dark"
            title="Reduce motion"
          >
            <span className="relative inline-block w-7 h-3.5 rounded-full bg-white/15" aria-hidden="true">
              <span className={`absolute top-0.5 left-0.5 w-2.5 h-2.5 rounded-full bg-brand-300 transition-transform ${reduced ? '' : 'translate-x-3.5'}`} />
            </span>
            Reduce motion
          </button>

          <GhLink
            to="/contact#book"
            className="btn-primary !py-2.5 !px-4 text-sm shadow-[0_0_22px_rgba(5,150,105,0.35)]"
          >
            <CalendarCheck className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Book a free consultation</span>
            <span className="sm:hidden">Book a call</span>
          </GhLink>

          <button
            type="button"
            className="lg:hidden grid place-items-center w-10 h-10 rounded-lg text-white border border-white/15 on-dark"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <Menu className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="absolute inset-0 bg-dark-deep/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[min(86%,360px)] bg-dark-deep border-l border-brand-300/15 flex flex-col">
            <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
              <span className="font-display text-white font-semibold">Menu</span>
              <button
                type="button"
                className="grid place-items-center w-10 h-10 rounded-lg text-white border border-white/15 on-dark"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Mobile">
              {NAV_LINKS.map((l) => {
                const active = path === l.to;
                return (
                  <GhLink
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    ariaCurrent={active ? 'page' : undefined}
                    className={`block px-4 py-3.5 rounded-lg text-base font-medium on-dark ${
                      active ? 'bg-brand-500/15 text-brand-300' : 'text-white/85 hover:bg-white/5'
                    }`}
                  >
                    {l.label}
                  </GhLink>
                );
              })}
            </nav>
            <div className="p-4 border-t border-white/10">
              <button
                type="button"
                onClick={toggle}
                aria-pressed={reduced}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm text-white/80 border border-white/10 on-dark mb-3"
              >
                <span>Reduce motion</span>
                <span className="relative inline-block w-9 h-5 rounded-full bg-white/15" aria-hidden="true">
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-brand-300 transition-transform ${reduced ? '' : 'translate-x-4'}`} />
                </span>
              </button>
              <GhLink to="/contact#book" onClick={() => setOpen(false)} className="btn-primary w-full">
                Book a free consultation
              </GhLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
