'use client';

import { motion, useReducedMotion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { cardHoverVariants } from '@/lib/variants';
import type { Service } from '@/types';

interface ServiceCardProps {
  service: Service;
  index?: number;   // stagger entrance offset
}

const noop = { rest: {}, hover: {} as Record<string, unknown> };

export default function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const reduce = useReducedMotion();
  const variants = reduce ? noop : cardHoverVariants;

  // Resolve Lucide icon component from the name string stored in the data
  const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number }>>)[service.icon];

  return (
    <motion.article
      variants={variants}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="group flex flex-col items-center gap-5 rounded-card bg-surface border border-border p-7 shadow-card text-center"
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      {/* Icon ring */}
      <div className="relative flex h-[64px] w-[64px] items-center justify-center rounded-full bg-accent/[0.10]">
        <div className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100
                        bg-accent/[0.08]" />
        {Icon ? (
          <Icon
            size={28}
            className="text-accent transition-colors duration-300 group-hover:text-accent-dark"
            aria-hidden="true"
          />
        ) : (
          <span className="sr-only">{service.icon}</span>
        )}
      </div>

      {/* Name */}
      <h3 className="font-serif text-[1.15rem] font-semibold text-foreground leading-snug">
        {service.name}
      </h3>

      {/* Description */}
      <p className="text-[0.8125rem] leading-relaxed text-muted/80">
        {service.description}
      </p>
    </motion.article>
  );
}
