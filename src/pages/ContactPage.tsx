import { useState, useEffect, useRef } from 'react';
import { Mail, Phone, Clock, ChevronDown } from 'lucide-react';
import CTASection from '@/components/CTASection';
import { CONTACT_EMAIL, CONTACT_PHONE } from '@/lib/site';

const FAQS = [
  {
    q: 'Can I use my own domain and branding?',
    a: 'Yes. Your website and workspace can run on your own domain with your logo, colors and voice. We set that up as part of the build.',
  },
  {
    q: 'Can you import my existing contacts and appointments?',
    a: 'In most cases, yes. We import contacts from a spreadsheet or your current CRM, and we move upcoming appointments into your new calendar. We confirm what is possible during the consultation.',
  },
  {
    q: 'What are the contract terms?',
    a: 'Plans are month-to-month, with no long-term lock-in. If you choose annual billing, you save 20% and can cancel before the next renewal. Setup is quoted separately and confirmed before work begins. We keep it straightforward — no fine print surprises.',
  },
  {
    q: 'What does setup cost?',
    a: 'Setup is quoted after consultation, and the price is confirmed before work begins. There is no hidden setup fee added later.',
  },
  {
    q: 'Will I be talking to a robot?',
    a: 'No. Automation handles routine messages, while a real person handles the conversations that matter. You can always reach someone.',
  },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  // Inject the GoHighLevel embed loader once on mount
  useEffect(() => {
    if (document.getElementById('ghl-form-embed-loader')) return;
    const s = document.createElement('script');
    s.src = 'https://book.mygrowthhub.io/js/form_embed.js';
    s.type = 'text/javascript';
    s.id = 'ghl-form-embed-loader';
    document.body.appendChild(s);
    scriptRef.current = s;
    return () => {
      if (scriptRef.current && scriptRef.current.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current);
      }
    };
  }, []);

  return (
    <main id="main" className="bg-white pt-28 md:pt-32">
      {/* HERO — light, calm */}
      <section className="py-12 md:py-16 bg-surface">
        <div className="container-gh max-w-3xl">
          <p className="text-sm text-brand-600 mb-3">Contact &amp; booking</p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-ink mb-5 text-measure">
            Grab a coffee and let's talk.
          </h1>
          <p className="text-lg text-ink-muted leading-relaxed text-measure-tight">
            The first call is one hour, free, and with no obligation. Tell me a little about your business and I'll tell you honestly whether I can help.
          </p>
        </div>
      </section>

      {/* CONTACT INFO + FORM */}
      <section className="py-16 md:py-24 bg-white" aria-labelledby="form-h">
        <div className="container-gh max-w-5xl">
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-16 items-start">
            {/* Left column — info */}
            <div>
              <h2 id="form-h" className="font-display text-2xl font-medium text-ink mb-6">Reach us directly</h2>
              <ul className="space-y-5">
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-brand-600 mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <div className="text-sm text-ink-muted">Email</div>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-ink font-medium hover:text-brand-600 transition-colors">{CONTACT_EMAIL}</a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-brand-600 mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <div className="text-sm text-ink-muted">Phone</div>
                    <a href="tel:+14807380576" className="text-ink font-medium hover:text-brand-600 transition-colors">{CONTACT_PHONE}</a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-brand-600 mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <div className="text-sm text-ink-muted">Hours</div>
                    <p className="text-ink font-medium leading-relaxed">
                      Monday, Tuesday, Wednesday and Friday<br />
                      10 AM to 4 PM Arizona time<br />
                      <span className="text-sm text-ink-muted font-normal">(the last appointment starts at 3 PM)</span>
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Right column — GHL form embed inside gh-form-slot */}
            <div>
              <div id="gh-form-slot" className="rounded-2xl border border-surface-line bg-surface/40 p-1 md:p-2 overflow-hidden">
                <iframe
                  src="https://book.mygrowthhub.io/widget/form/OY6HOjcwqzz9dBnYeTFo"
                  style={{ width: '100%', height: '1114px', border: 'none', borderRadius: '8px' }}
                  id="sticky-sidebar-left-OY6HOjcwqzz9dBnYeTFo"
                  data-layout="{'id':'STICKY_SIDEBAR','minimizedTitle':'Contact us','isLeftAligned':true,'isRightAligned':false,'allowMinimize':true,'buttonColor':'#101828','buttonType':'text','buttonSize':'medium','buttonIcon':'chat','cornerRadius':{'tl':8,'tr':8,'bl':8,'br':8},'fontSize':16}"
                  data-trigger-type="alwaysShow"
                  data-trigger-value=""
                  data-activation-type="alwaysActivated"
                  data-activation-value=""
                  data-deactivation-type="neverDeactivate"
                  data-deactivation-value=""
                  data-form-name="Growth Hub Lead Capture Form"
                  data-height="1114"
                  data-layout-iframe-id="sticky-sidebar-left-OY6HOjcwqzz9dBnYeTFo"
                  data-form-id="OY6HOjcwqzz9dBnYeTFo"
                  data-cookie-consent="true"
                  data-cookie-consent-provider="auto"
                  title="Growth Hub Lead Capture Form"
                  loading="lazy"
                />
              </div>
              <p className="text-xs text-ink-muted/70 mt-3 leading-relaxed">
                By submitting the form, you agree that Growth Hub, LLC may contact you about your inquiry by email or text. Message and data rates may apply. Reply STOP to opt out of texts at any time. See our <a href="/privacy" data-gh-link className="text-brand-700 font-medium underline underline-offset-2">Privacy Policy</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING — GHL calendar embed inside gh-calendar-slot */}
      <section id="book" className="py-16 md:py-24 bg-surface scroll-mt-20" aria-labelledby="book-h">
        <div className="container-gh max-w-3xl">
          <p className="text-sm text-brand-600 mb-3">Booking</p>
          <h2 id="book-h" className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-ink mb-4">
            Pick a time that works for you.
          </h2>
          <p className="text-ink-muted text-lg mb-8 text-measure-tight">
            Choose an open slot below. The consultation is one hour, free, and held over video or phone — your choice.
          </p>
          <div id="gh-calendar-slot" className="rounded-2xl border border-surface-line bg-white overflow-hidden">
            <iframe
              src="https://book.mygrowthhub.io/widget/booking/l2CdK46I6yjjUgGpAq8Q"
              allow="payment"
              style={{ width: '100%', border: 'none', overflow: 'hidden', minHeight: '600px' }}
              scrolling="no"
              id="l2CdK46I6yjjUgGpAq8Q_1794001399136"
              title="Book a free consultation with Growth Hub"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* FAQ — accessible accordion */}
      <section className="py-20 md:py-28 bg-white" aria-labelledby="faq-h">
        <div className="container-gh max-w-3xl">
          <p className="text-sm text-brand-600 mb-3">FAQ</p>
          <h2 id="faq-h" className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-ink mb-10">
            Questions, answered.
          </h2>
          <ul className="border-t border-surface-line">
            {FAQS.map((item, i) => {
              const open = openFaq === i;
              const btnId = `faq-btn-${i}`;
              const panelId = `faq-panel-${i}`;
              return (
                <li key={i} className="border-b border-surface-line">
                  <h3>
                    <button
                      id={btnId}
                      type="button"
                      onClick={() => setOpenFaq(open ? null : i)}
                      aria-expanded={open}
                      aria-controls={panelId}
                      className="flex items-center justify-between gap-4 w-full text-left py-5 group"
                    >
                      <span className="font-display text-lg font-medium text-ink pr-2">{item.q}</span>
                      <ChevronDown className={`w-5 h-5 text-brand-600 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
                    </button>
                  </h3>
                  <div id={panelId} role="region" aria-labelledby={btnId} hidden={!open} className="pb-5 pr-8">
                    <p className="text-ink-muted text-base leading-relaxed text-measure-tight">{item.a}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <CTASection
        title="Still have questions?"
        body="Send them over. We answer every message ourselves — no bots on the first reply."
        dark
      />
    </main>
  );
}
