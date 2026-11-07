import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';

type RouterContextType = {
  path: string;
  navigate: (to: string) => void;
};

const RouterContext = createContext<RouterContextType>({ path: '/', navigate: () => {} });

export function useRouter() {
  return useContext(RouterContext);
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(() => window.location.pathname.replace(/\/+$/, '') || '/');

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname.replace(/\/+$/, '') || '/');
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((to: string) => {
    const clean = to.replace(/\/+$/, '') || '/';
    if (clean !== (window.location.pathname.replace(/\/+$/, '') || '/')) {
      window.history.pushState({}, '', clean);
      setPath(clean);
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a[data-gh-link]') as HTMLAnchorElement | null;
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('#') || target.target === '_blank') return;
      e.preventDefault();
      navigate(href);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [navigate]);

  return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>;
}

/** Links that opt into client-side routing via data-gh-link. */
export function GhLink({ to, children, className, onClick, ariaLabel, ariaCurrent }: { to: string; children: ReactNode; className?: string; onClick?: () => void; ariaLabel?: string; ariaCurrent?: 'page' | undefined; }) {
  return (
    <a href={to} data-gh-link className={className} aria-label={ariaLabel} aria-current={ariaCurrent} onClick={() => onClick?.()}>
      {children}
    </a>
  );
}
