'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { services } from '@/constants/services';
import ServiceCard from '@/components/cards/ServiceCard';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { staggerContainerVariants, staggerItemVariants } from '@/lib/variants';

const noopVariants = { hidden: {}, visible: {} };

export default function ServicesSection() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = prefersReducedMotion ? noopVariants : staggerContainerVariants;
  const itemVariants = prefersReducedMotion ? noopVariants : staggerItemVariants;

  return (
    <section className="py-section bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionWrapper className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
            What We Offer
          </p>
          <h2 className="font-serif text-display-md font-semibold text-foreground">
            Our Services
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted">
            From comfortable accommodation to fine dining and memorable events, we have
            everything you need for an exceptional stay in Kitale.
          </p>
        </SectionWrapper>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={itemVariants}>
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
