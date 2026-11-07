import { lazy, Suspense, useEffect } from 'react';
import { RouterProvider, useRouter } from '@/lib/router';
import { MotionProvider } from '@/lib/motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileBar from '@/components/MobileBar';
import HomePage from '@/pages/HomePage';

const ServicesPage = lazy(() => import('@/pages/ServicesPage'));
const SavingsPage = lazy(() => import('@/pages/SavingsPage'));
const PricingPage = lazy(() => import('@/pages/PricingPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const PrivacyPage = lazy(() => import('@/pages/PrivacyPage'));
const TermsPage = lazy(() => import('@/pages/TermsPage'));

function NotFound() {
  return (
    <main id="main" className="min-h-[60vh] grid place-items-center bg-surface pt-28">
      <div className="text-center px-6">
        <h1 className="font-display text-4xl text-ink mb-3">Page not found</h1>
        <p className="text-ink-muted mb-6">The page you're looking for doesn't exist yet.</p>
        <a href="/" data-gh-link className="btn-primary">Back to home</a>
      </div>
    </main>
  );
}

function Routes() {
  const { path } = useRouter();
  const clean = path.replace(/\/+$/, '') || '/';

  // handle hash scrolls after render
  useEffect(() => {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [path]);

  let page;
  switch (clean) {
    case '/': page = <HomePage />; break;
    case '/services': page = <ServicesPage />; break;
    case '/savings-calculator': page = <SavingsPage />; break;
    case '/pricing': page = <PricingPage />; break;
    case '/about': page = <AboutPage />; break;
    case '/contact': page = <ContactPage />; break;
    case '/privacy': page = <PrivacyPage />; break;
    case '/terms': page = <TermsPage />; break;
    default: page = <NotFound />;
  }

  return (
    <Suspense fallback={<div className="min-h-[60vh] bg-surface" aria-hidden="true" />}>
      {page}
    </Suspense>
  );
}

function DownloadButton() {
  return (
    <a
      href="/ghl-growth-hub-all-codes.zip"
      download
      className="fixed top-4 right-4 z-[100] inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-500 text-white text-sm font-semibold shadow-lg hover:bg-brand-600 transition-colors"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" x2="12" y1="15" y2="3" />
      </svg>
      Download ZIP
    </a>
  );
}

export default function App() {
  return (
    <MotionProvider>
      <RouterProvider>
        <div className="min-h-screen flex flex-col bg-white pb-16 lg:pb-0">
          <DownloadButton />
          <Header />
          <div className="flex-1">
            <Routes />
          </div>
          <Footer />
          <MobileBar />
        </div>
      </RouterProvider>
    </MotionProvider>
  );
}
