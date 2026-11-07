import CTASection from '@/components/CTASection';

type Section = { h: string; p: string[] };

const PRIVACY_SECTIONS: Section[] = [
  {
    h: 'Information we collect',
    p: [
      'When you contact us through our form, book a consultation, or work with us, we collect the information you provide: your name, email address, phone number, business name, industry, and any details you share about your needs.',
      'We also collect basic technical information automatically, such as the browser and device you use to visit our site. We do not use this to identify you personally.',
    ],
  },
  {
    h: 'How we use your information',
    p: [
      'We use your information to respond to your inquiry, schedule and hold consultations, prepare recommendations, and provide the services you engage us for.',
      'We may also use your email to send occasional updates about our services. You can opt out of those at any time by replying STOP to a text or clicking unsubscribe in an email.',
    ],
  },
  {
    h: 'How we share your information',
    p: [
      'We do not sell your information. We share it only with the tools we use to run our business — such as our CRM, calendar, and email provider — and only as needed to deliver our services to you.',
      'If we are legally required to disclose information, we will do so only to the extent necessary and consistent with applicable law.',
    ],
  },
  {
    h: 'How we store and protect your information',
    p: [
      'Your information is stored in secured, cloud-based platforms that we configure on your behalf. Access is limited to the people who need it to serve you.',
      'No method of storage is completely secure, but we take reasonable steps to protect your information and respond to any security concern.',
    ],
  },
  {
    h: 'Your choices',
    p: [
      'You can ask us to show, correct, or delete the information we hold about you at any time. Email support@mygrowthhub.io or call us, and we will respond within a reasonable time.',
      'You can opt out of text messages by replying STOP at any time. You can opt out of emails by clicking the unsubscribe link.',
    ],
  },
  {
    h: 'Children',
    p: ['Our services are for businesses and adults. We do not knowingly collect information from children under 16.'],
  },
  {
    h: 'Changes to this policy',
    p: ['We may update this policy from time to time. The date below shows when it was last revised. Significant changes will be noted on our site.'],
  },
];

export default function PrivacyPage() {
  return (
    <main id="main" className="bg-surface pt-28 md:pt-32">
      <section className="py-12 md:py-16 bg-surface">
        <div className="container-gh max-w-3xl">
          <p className="text-sm text-brand-600 mb-3">Legal</p>
          <h1 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-ink mb-3">Privacy Policy</h1>
          <p className="text-ink-muted text-sm">Last updated: November 2026</p>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white">
        <div className="container-gh max-w-3xl">
          <p className="text-ink-soft text-lg leading-relaxed mb-10 text-measure">
            Growth Hub, LLC respects your privacy. This policy explains what information we collect, how we use it, and the choices you have. It applies to our website and the services we provide.
          </p>
          {PRIVACY_SECTIONS.map((s) => (
            <div key={s.h} className="mb-8">
              <h2 className="font-display text-xl font-medium text-ink mb-3">{s.h}</h2>
              {s.p.map((para, i) => (
                <p key={i} className="text-ink-muted text-base leading-relaxed mb-3 text-measure">{para}</p>
              ))}
            </div>
          ))}
          <p className="text-sm text-ink-muted/70 mt-10 border-t border-surface-line pt-6">
            Growth Hub, LLC — Phoenix, Arizona. For privacy questions, email <a href="mailto:support@mygrowthhub.io" className="text-brand-600 font-medium underline underline-offset-2">support@mygrowthhub.io</a>.
          </p>
        </div>
      </section>

      <CTASection title="Questions about your privacy?" body="We're happy to walk through how your information is handled. Book a free call or email us directly." dark={false} />
    </main>
  );
}
