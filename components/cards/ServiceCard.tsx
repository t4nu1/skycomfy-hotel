'use client';

import { motion, useReducedMotion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import { cardHoverVariants } from '@/lib/variants';
import type { Service } from '@/types';

interface ServiceCardProps {
  service: Service;
}

/** No-op variants used when the user prefers reduced motion */
const noopVariants = {
  rest: {},
  hover: {},
};

export default function ServiceCard({ service }: ServiceCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const variants = shouldReduceMotion ? noopVariants : cardHoverVariants;

  // Dynamically resolve the Lucide icon by name
  const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<any>>)[
    service.icon
  ];

  return (
    <motion.article
      className="flex flex-col items-center gap-4 rounded-card bg-surface p-8 shadow-card text-center"
      variants={variants}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {/* Icon */}
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
        {IconComponent ? (
          <IconComponent size={28} aria-hidden="true" />
        ) : (
          /* Fallback: render nothing visible if icon name is invalid */
          <span className="sr-only">{service.icon}</span>
        )}
      </div>

      {/* Name */}
      <h3 className="font-serif text-2xl font-semibold text-foreground">{service.name}</h3>

      {/* Description */}
      <p className="text-sm leading-relaxed text-muted">{service.description}</p>
    </motion.article>
  );
}
