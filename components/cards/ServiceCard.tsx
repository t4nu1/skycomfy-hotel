'use client';

import { motion, useReducedMotion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { cardHoverVariants } from '@/lib/variants';
import type { Service } from '@/types';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion
    ? { rest: {}, hover: {} }
    : cardHoverVariants;

  // Dynamic icon resolution — `as any` is intentional: icon name is a data-value, not a TS-known key
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComp = (LucideIcons as any)[service.icon];

  return (
    <motion.article
      variants={variants}
      initial="rest"
      whileHover={prefersReducedMotion ? undefined : 'hover'}
      animate="rest"
      className="group flex flex-col items-center gap-5 rounded-card bg-surface border border-border p-7 shadow-card text-center"
    >
      <div className="relative flex h-[64px] w-[64px] items-center justify-center rounded-full bg-accent/10">
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-accent/8" />
        {IconComp ? (
          <IconComp size={28} className="text-accent transition-colors duration-300" aria-hidden="true" />
        ) : (
          <span className="sr-only">{service.icon}</span>
        )}
      </div>

      <h3 className="font-serif text-lg font-semibold text-foreground leading-snug">
        {service.name}
      </h3>

      <p className="text-sm leading-relaxed text-muted/80">{service.description}</p>
    </motion.article>
  );
}
