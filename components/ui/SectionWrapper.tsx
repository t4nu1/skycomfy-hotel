'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { imageInVariants } from '@/lib/variants';
import type { Variants } from 'framer-motion';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;              // stagger delay in seconds
  direction?: 'up' | 'left' | 'right' | 'none';
  /** When true, applies image-in variant (scale + opacity) instead of directional */
  asImage?: boolean;
}

const dirVariants: Record<'up' | 'left' | 'right' | 'none', Variants> = {
  up:   { hidden: { opacity: 0, y: 36 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } },
  left: { hidden: { opacity: 0, x: -36 }, visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } },
  right:{ hidden: { opacity: 0, x:  36 }, visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } },
  none: { hidden: { opacity: 0 },        visible: { opacity: 1, transition: { duration: 0.5 } } },
};

const noop: Variants = { hidden: {}, visible: {} };

export default function SectionWrapper({
  children,
  className,
  delay = 0,
  direction = 'up',
  asImage = false,
}: SectionWrapperProps) {
  const { ref, isInView } = useScrollReveal();
  const reduce = useReducedMotion();

  const variants: Variants = reduce
    ? noop
    : asImage
      ? imageInVariants
      : dirVariants[direction];

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
