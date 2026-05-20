'use client';

import { useReducedMotion, motion } from 'framer-motion';
import { Star } from 'lucide-react';
import type { Testimonial } from '@/types';
import { staggerItemVariants } from '@/lib/variants';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const variants = shouldReduceMotion ? { hidden: {}, visible: {} } : staggerItemVariants;

  return (
    <motion.article
      variants={variants}
      className="flex flex-col gap-4 rounded-card border border-border bg-background p-6 shadow-card min-w-[280px] max-w-sm w-full"
      aria-label={`Testimonial from ${testimonial.guestName}`}
    >
      {/* Star rating */}
      <div className="flex items-center gap-1" aria-label={`${testimonial.rating} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            size={16}
            className={
              i < testimonial.rating
                ? 'fill-accent text-accent'
                : 'fill-transparent text-border'
            }
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Review text */}
      <blockquote className="flex-1 font-sans text-base text-foreground leading-relaxed">
        <span className="text-accent font-serif text-2xl leading-none select-none" aria-hidden="true">
          &ldquo;
        </span>
        {testimonial.text}
        <span className="text-accent font-serif text-2xl leading-none select-none" aria-hidden="true">
          &rdquo;
        </span>
      </blockquote>

      {/* Guest name */}
      <footer className="font-sans text-sm font-semibold text-muted">
        — {testimonial.guestName}
      </footer>
    </motion.article>
  );
}
