'use client';

import { useState, useEffect } from 'react';

/**
 * Returns `true` when the page has been scrolled past the given threshold (in px).
 * Uses a passive scroll listener for performance.
 */
export function useNavbarScroll(threshold: number): boolean {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > threshold);

    // Run once on mount to capture the initial scroll position
    handler();

    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [threshold]);

  return isScrolled;
}
