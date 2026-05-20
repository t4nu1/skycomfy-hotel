'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';

interface ScrollRevealOptions {
  /** Fraction of the element that must be visible before triggering (default: 0.15) */
  threshold?: number;
  /** Only trigger the animation once (default: true) */
  once?: boolean;
}

/**
 * Wraps Framer Motion's `useInView` to provide a scroll-reveal ref and visibility flag.
 * Returns `{ ref, isInView }` — attach `ref` to the element you want to observe.
 */
export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const { threshold = 0.15, once = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: threshold, once });
  return { ref, isInView };
}
