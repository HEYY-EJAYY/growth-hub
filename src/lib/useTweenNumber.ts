import { useEffect, useRef, useState } from 'react';
import { useMotion } from '@/lib/motion';

/** Smoothly animate a number toward a target value. Honors reduce-motion. */
export function useTweenNumber(target: number, duration = 600) {
  const { reduced } = useMotion();
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);
  const rafRef = useRef(0);
  const startRef = useRef(0);

  useEffect(() => {
    if (reduced) {
      setValue(target);
      fromRef.current = target;
      return;
    }
    cancelAnimationFrame(rafRef.current);
    const from = fromRef.current;
    const delta = target - from;
    startRef.current = 0;

    const step = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const t = Math.min(1, elapsed / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(from + delta * eased);
      if (t < 1) rafRef.current = requestAnimationFrame(step);
      else fromRef.current = target;
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, reduced]);

  return value;
}

export function formatMoney(n: number): string {
  return '$' + Math.round(n).toLocaleString('en-US');
}

export function formatMoneyCents(n: number): string {
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}
