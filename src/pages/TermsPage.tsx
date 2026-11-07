import CTASection from '@/components/CTASection';

type Section = { h: string; p: string[] };

const TERMS_SECTIONS: Section[] = [
  {
    h: 'About these terms',
    p: [
      'These Terms of Service govern your use of the Growth Hub, LLC website and the services we provide. By contacting us, booking a consultation, or engaging our services, you agree to these terms.',
      'If you have a separate written agreement with Growth Hub, LLC, that agreement takes precedence where it differs from these terms.',
    ],
  },
  {
    h: 'Our services',
    p: [
      'Growth Hub, LLC sets up CRM, automation, AI assistance, and websites for businesses, and trains owners to use them. The specific scope of any engagement is confirmed in writing before work begins.',
      'Setup is quoted separately after a free consultation. The setup price is confirmed before work starts.',
    ],
  },
  {
    h: 'Plans and billing',
    p: [
      'Plans are billed monthly or annually, at your choice. Annual billing saves 20% compared to monthly. Plans are month-to-month with no long-term lock-in.',
      'Texts, calls, email, and AI usage are billed at cost, separately from the plan price. You are responsible for usage charges incurred on your account.',
      'If you choose annual billing, you can cancel before the next renewal period. Monthly plans can be cancelled before the next billing cycle.',
    ],
  },
  {
    h: 'Your responsibilities',
    p: [
      'You agree to provide accurate information when contacting us, and to keep your account credentials secure if we set up a workspace on your behalf.',
      'You are responsible for the content and data you ask us to import or manage, and for ensuring you have the right to share it with us.',
    ],
  },
  {
    h: 'Intellectual property',
    p: [
      'We retain ownership of the tools, templates, and methods we use to deliver our services. You retain ownership of your data, branding, and content.',
      'Custom websites we build for you are yours once the project is paid in full, subject to any third-party licenses we use.',
    ],
  },
  {
    h: 'Limitation of liability',
    p: [
      'Our services are provided on a reasonable-effort basis. We do not guarantee specific business results, revenue, or outcomes, as these depend on many factors outside our control.',
      'To the extent permitted by law, our liability is limited to the fees you have paid us in the three months preceding any claim.',
    ],
  },
  {
    h: 'Changes to these terms',
    p: ['We may update these terms from time to time. The date below shows when they were last revised. Continued use of our services after a change means you accept the updated terms.'],
  },
];

export default function TermsPage() {
  return (
    <main id="main" className="bg-surface pt-28 md:pt-32">
      <section className="py-12 md:py-16 bg-surface">
        <div className="container-gh max-w-3xl">
          <p className="text-sm text-brand-600 mb-3">Legal</p>
          <h1 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-ink mb-3">Terms of Service</h1>
          <p className="text-ink-muted text-sm">Last updated: November 2026</p>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white">
        <div className="container-gh max-w-3xl">
          <p className="text-ink-soft text-lg leading-relaxed mb-10 text-measure">
            These terms explain the agreement between you and Growth Hub, LLC when you use our website or work with us. Please read them. They are written in plain language on purpose.
          </p>
          {TERMS_SECTIONS.map((s) => (
            <div key={s.h} className="mb-8">
              <h2 className="font-display text-xl font-medium text-ink mb-3">{s.h}</h2>
              {s.p.map((para, i) => (
                <p key={i} className="text-ink-muted text-base leading-relaxed mb-3 text-measure">{para}</p>
              ))}
            </div>
          ))}
          <p className="text-sm text-ink-muted/70 mt-10 border-t border-surface-line pt-6">
            Growth Hub, LLC — Phoenix, Arizona. For questions about these terms, email <a href="mailto:support@mygrowthhub.io" className="text-brand-600 font-medium underline underline-offset-2">support@mygrowthhub.io</a>.
          </p>
        </div>
      </section>

      <CTASection title="Ready to get started?" body="Book a free one-hour consultation. We'll review these terms with you and answer any questions before anything is signed." dark={false} />
    </main>
  );
}
