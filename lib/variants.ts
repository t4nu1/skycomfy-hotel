import type { Variants } from 'framer-motion';

// Fade up — default scroll reveal
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// Fade in — no directional movement
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

// Stagger container — wraps a list of staggered children
export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

// Stagger item — used inside stagger container
export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// Page fade-in
export const pageFadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4 },
  },
};

// Card hover
export const cardHoverVariants: Variants = {
  rest: {
    y: 0,
    boxShadow: '0 4px 24px rgba(26,39,68,0.08)',
  },
  hover: {
    y: -4,
    boxShadow: '0 12px 40px rgba(26,39,68,0.16)',
    transition: { duration: 0.25 },
  },
};

// Button hover
export const buttonHoverVariants: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.03,
    transition: { duration: 0.2 },
  },
  tap: { scale: 0.97 },
};
