'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Star } from 'lucide-react';
import { staggerItemVariants } from '@/lib/variants';
import type { Testimonial } from '@/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
}

const noop = { hidden: {}, visible: {} };

export default function TestimonialCard({
  testimonial,
  index = 0,
}: TestimonialCardProps) {
  const reduce = useReducedMotion();
  const variants = reduce ? noop : staggerItemVariants;

  return (
    <motion.article
      variants={variants}
      custom={index}
      className="group flex flex-col gap-5 rounded-card bg-surface border border-border p-7 shadow-card
                 min-w-[300px] max-w-[380px] w-full transition-border duration-300
                 hover:border-accent/40"
      aria-label={`Guest testimonial from ${testimonial.guestName}`}
    >
      {/* Gold star mark */}
      <div className="flex items-center gap-1" aria-label={`${testimonial.rating} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            size={16}
            className={
              i < testimonial.rating
                ? 'fill-accent text-accent transition-transform duration-200 group-hover:scale-110'
                : 'fill-transparent text-border/60'
            }
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="flex-1 font-sans text-[0.9375rem] text-foreground/85 leading-relaxed">
        <span className="font-serif text-2xl text-accent select-none" aria-hidden="true">&ldquo;</span>
        {testimonial.text}
        <span className="font-serif text-2xl text-accent select-none" aria-hidden="true">&rdquo;</span>
      </blockquote>

      {/* Gold divider rule */}
      <div className="h-px w-8 bg-accent/30" aria-hidden="true" />

      {/* Guest name */}
      <footer className="font-sans text-xs font-semibold text-muted tracking-wide uppercase">
        &mdash; {testimonial.guestName}
      </footer>
    </motion.article>
  );
}
