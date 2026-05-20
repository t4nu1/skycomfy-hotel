import type { Variants } from 'framer-motion';

/* ─── Scroll-reveal ─── */
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.55, ease: 'easeOut' },
  },
};

/* ─── Stagger container ─── */
export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' },
  },
};

/* ─── Page mount fade ─── */
export const pageFadeVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─── Card hover ─── */
export const cardHoverVariants: Variants = {
  rest: {
    y: 0,
    boxShadow: '0 4px 24px rgba(26,39,68,0.07)',
  },
  hover: {
    y: -6,
    boxShadow: '0 16px 48px rgba(26,39,68,0.14)',
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─── Button hover + tap ─── */
export const buttonHoverVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.04, transition: { duration: 0.2 } },
  tap: { scale: 0.97 },
};

/* ─── Image parallax in (slight scale) ─── */
export const imageInVariants: Variants = {
  hidden: { opacity: 0, scale: 1.08 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};
