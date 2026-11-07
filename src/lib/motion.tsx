import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type MotionContextType = {
  reduced: boolean;
  toggle: () => void;
};

const MotionContext = createContext<MotionContextType>({ reduced: false, toggle: () => {} });

const STORAGE_KEY = 'gh-reduce-motion';

export function MotionProvider({ children }: { children: ReactNode }) {
  const [reduced, setReduced] = useState<boolean>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) return stored === '1';
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion', reduced);
  }, [reduced]);

  const toggle = () => setReduced((r) => {
    const next = !r;
    localStorage.setItem(STORAGE_KEY, next ? '1' : '0');
    return next;
  });

  return <MotionContext.Provider value={{ reduced, toggle }}>{children}</MotionContext.Provider>;
}

export function useMotion() {
  return useContext(MotionContext);
}
