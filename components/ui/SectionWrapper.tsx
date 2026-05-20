'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { fadeUpVariants } from '@/lib/variants';
import type { Variants } from 'framer-motion';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in seconds (default: 0) */
  delay?: number;
  /** Direction of the entrance animation (default: 'up') */
  direction?: 'up' | 'left' | 'right' | 'none';
}

const directionalVariants: Record<'up' | 'left' | 'right' | 'none', Variants> = {
  up: fadeUpVariants,
  left: {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  },
  right: {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  },
  none: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
  },
};

/** No-op variants used when the user prefers reduced motion */
const noopVariants: Variants = {
  hidden: {},
  visible: {},
};

export default function SectionWrapper({
  children,
  className,
  delay = 0,
  direction = 'up',
}: SectionWrapperProps) {
  const { ref, isInView } = useScrollReveal();
  const shouldReduceMotion = useReducedMotion();

  const variants = shouldReduceMotion ? noopVariants : directionalVariants[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={delay > 0 ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}
