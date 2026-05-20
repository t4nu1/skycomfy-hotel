'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { pageFadeVariants } from '@/lib/variants';
import type { Variants } from 'framer-motion';

interface PageFadeInProps {
  children: React.ReactNode;
}

const noop: Variants = { hidden: {}, visible: {} };

/**
 * PageFadeIn
 * Wraps children in a gentle page-enter fade animation.
 * Respects prefers-reduced-motion for accessibility.
 */
export default function PageFadeIn({ children }: PageFadeInProps) {
  const reduce = useReducedMotion();
  const variants = reduce ? noop : pageFadeVariants;

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
