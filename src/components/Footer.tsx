import { Sparkles, Mail, Phone, Clock, MapPin } from 'lucide-react';
import { NAV_LINKS, CONTACT_EMAIL, CONTACT_PHONE } from '@/lib/site';
import { GhLink } from '@/lib/router';

export default function Footer() {
  return (
    <footer className="bg-dark-deep text-white/80 border-t border-brand-300/15">
      <div className="container-gh py-14 md:py-20">
        <div className="grid gap-10 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 text-white mb-4">
              <span className="grid place-items-center w-9 h-9 rounded-lg bg-brand-500">
                <Sparkles className="w-5 h-5" aria-hidden="true" />
              </span>
              <span className="font-display text-lg font-semibold">Growth Hub, LLC</span>
            </div>
            <p className="text-sm leading-relaxed text-white/65 text-measure-tight">
              We set up the CRM, automation, AI assistance and websites your business runs on — then teach you to use them.
              Based in Phoenix, Arizona.
            </p>
          </div>

          <div>
            <h2 className="font-display text-white text-sm font-semibold mb-4 tracking-wide">Explore</h2>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <GhLink to={l.to} className="text-sm text-white/70 hover:text-brand-300 transition-colors on-dark">
                    {l.label}
                  </GhLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-white text-sm font-semibold mb-4 tracking-wide">Contact</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 text-brand-300 shrink-0" aria-hidden="true" />
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-white/70 hover:text-brand-300 transition-colors on-dark">{CONTACT_EMAIL}</a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-brand-300 shrink-0" aria-hidden="true" />
                <span className="text-white/70">{CONTACT_PHONE}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 text-brand-300 shrink-0" aria-hidden="true" />
                <span className="text-white/70">Mon, Tue, Wed &amp; Fri, 10 AM – 4 PM Arizona time</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-brand-300 shrink-0" aria-hidden="true" />
                <span className="text-white/70">Phoenix, Arizona</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-white text-sm font-semibold mb-4 tracking-wide">Legal</h2>
            <ul className="space-y-2.5">
              <li><GhLink to="/privacy" className="text-sm text-white/70 hover:text-brand-300 transition-colors on-dark">Privacy Policy</GhLink></li>
              <li><GhLink to="/terms" className="text-sm text-white/70 hover:text-brand-300 transition-colors on-dark">Terms of Service</GhLink></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-white/50">© 2026 Growth Hub, LLC. All rights reserved.</p>
          <p className="text-xs text-white/40">Customer relationship management (CRM), automation &amp; web design.</p>
        </div>
      </div>
    </footer>
  );
}
