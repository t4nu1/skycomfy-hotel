'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { pageFadeVariants } from '@/lib/variants';
import type { Variants } from 'framer-motion';

interface PageFadeInProps {
  children: React.ReactNode;
}

/** No-op variants used when the user prefers reduced motion */
const noopVariants: Variants = {
  hidden: {},
  visible: {},
};

/**
 * Wraps page content in a fade-in animation on mount.
 * Uses `pageFadeVariants` (opacity 0 → 1, 0.4 s) and respects
 * `prefers-reduced-motion` by collapsing to no-op variants.
 */
export default function PageFadeIn({ children }: PageFadeInProps) {
  const shouldReduceMotion = useReducedMotion();
  const variants = shouldReduceMotion ? noopVariants : pageFadeVariants;

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
}
