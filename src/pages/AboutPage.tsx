import { Quote, Eye, GraduationCap, MessageCircle, Headphones } from 'lucide-react';
import CTASection from '@/components/CTASection';

const PRINCIPLES = [
  { icon: Headphones, title: 'We listen first.', desc: 'Before any recommendation, we understand how your business actually runs day to day.' },
  { icon: Eye, title: 'We explain what is and is not included.', desc: 'No vague promises. You see the scope, the tools and the cost in writing.' },
  { icon: GraduationCap, title: 'We teach you the system.', desc: 'You leave the training able to run it yourself — in plain language, not jargon.' },
  { icon: MessageCircle, title: 'A real person is always reachable.', desc: 'Automation handles the routine. A human handles the conversations that matter.' },
];

export default function AboutPage() {
  return (
    <main id="main" className="bg-white">
      {/* HERO — editorial, light, minimal */}
      <section className="pt-28 md:pt-36 pb-16 md:pb-20 bg-surface">
        <div className="container-gh max-w-4xl">
          <p className="text-sm text-brand-600 mb-4">About</p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-ink mb-6 text-measure">
            I started Growth Hub because small businesses deserve better tools — and someone honest to set them up.
          </h1>
        </div>
      </section>

      {/* FOUNDER PHOTO + STORY */}
      <section className="py-16 md:py-24 bg-white" aria-labelledby="founder-h">
        <div className="container-gh max-w-5xl">
          <div className="grid md:grid-cols-[minmax(0,320px)_1fr] gap-10 md:gap-16 items-start">
            {/* Founder photo */}
            <div>
              <div className="aspect-[4/5] rounded-2xl border border-surface-line overflow-hidden bg-surface">
                <img
                  src="https://assets.cdn.filesafe.space/jQc5XmDa1i8IEloVHhEc/media/6aee4978890a22eb1c94f1a1.jpg"
                  alt="Zaira, founder of Growth Hub, LLC"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width="320"
                  height="400"
                />
              </div>
              <p className="mt-4 text-sm text-ink-muted font-medium">Zaira</p>
              <p className="text-sm text-ink-muted/70">Founder, Growth Hub, LLC — Phoenix, Arizona</p>
            </div>

            {/* Story */}
            <div>
              <h2 id="founder-h" className="sr-only">Zaira's story</h2>
              <div className="space-y-5 text-lg text-ink-soft leading-relaxed text-measure">
                <p>
                  I'm Zaira, and I started Growth Hub because I kept seeing the same problem in every business I walked into: good owners, good services, and a dozen software tools that didn't talk to each other. Leads came in everywhere. Follow-ups depended on someone remembering. And the monthly bills kept climbing.
                </p>
                <p>
                  I believe technology should make a business calmer, not busier. So I built a service that sets up one organized place — the CRM, the automations, the AI assistant, the website — and then teaches the owner how to actually use it.
                </p>
                <p>
                  Before Growth Hub, I spent years helping businesses sort out the same mess — tangled tools, lost leads, and owners who felt like they were always catching up. The work taught me something simple: most people don't need more software. They need someone to set it up right and show them how it works.
                </p>
                <p>
                  We work with startups, small businesses and established companies across Phoenix and beyond. No invented credentials, no pressure. Just a working system and someone reachable when you need help.
                </p>
              </div>

              <blockquote className="mt-8 pl-6 border-l-2 border-brand-500">
                <Quote className="w-5 h-5 text-brand-500 mb-2" aria-hidden="true" />
                <p className="font-display text-xl md:text-2xl text-ink font-medium leading-snug text-measure-tight">
                  We will tell you honestly whether it is a fit. If it isn't, we'll say so on the first call.
                </p>
                <footer className="mt-3 text-sm text-ink-muted">— Zaira, founder</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE WORK — ruled rows */}
      <section className="py-20 md:py-28 bg-surface" aria-labelledby="how-h">
        <div className="container-gh max-w-3xl">
          <p className="text-sm text-brand-600 mb-3">How we work</p>
          <h2 id="how-h" className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-ink mb-10">
            Four principles we don't bend on.
          </h2>
          <ul className="border-t border-surface-line">
            {PRINCIPLES.map((p, i) => {
              const Icon = p.icon;
              return (
                <li key={i} className="border-b border-surface-line py-7 flex items-start gap-5">
                  <span className="grid place-items-center w-11 h-11 rounded-xl bg-brand-500/10 text-brand-600 shrink-0">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-medium text-ink mb-1.5">{p.title}</h3>
                    <p className="text-ink-muted text-base leading-relaxed">{p.desc}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <CTASection
        title="Let's talk about your business."
        body="Book a free one-hour consultation. No scripts, no pressure — just an honest conversation about whether Growth Hub can help."
        secondaryLabel="See what we do"
        secondaryTo="/services"
      />
    </main>
  );
}
