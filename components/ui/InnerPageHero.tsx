'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

interface InnerPageHeroProps {
  /** Eyebrow label shown above the title (e.g. "Who We Are") */
  eyebrow: string;
  /** Main H1 heading */
  title: string;
  /** Background image URL */
  imageSrc: string;
  /** Accessible alt text for the background image */
  imageAlt: string;
}

/**
 * InnerPageHero
 * Reusable inner-page banner used on About, Rooms, Gallery, and Contact pages.
 * Client component so it can run Framer Motion mount animations.
 * Respects prefers-reduced-motion.
 */
export default function InnerPageHero({
  eyebrow,
  title,
  imageSrc,
  imageAlt,
}: InnerPageHeroProps) {
  const reduce = useReducedMotion();

  const eyebrowVariants = reduce
    ? {}
    : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } };

  const titleVariants = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.15 },
      };

  return (
    <section
      className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-primary text-white"
      aria-label={title}
    >
      {/* Background image + overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className="object-cover brightness-50"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-primary/45" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.span
          {...eyebrowVariants}
          className="font-sans text-xs md:text-sm font-semibold tracking-widest text-accent uppercase mb-3 block"
        >
          {eyebrow}
        </motion.span>
        <motion.h1
          {...titleVariants}
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
        >
          {title}
        </motion.h1>
      </div>
    </section>
  );
}
