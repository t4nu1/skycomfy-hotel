'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  Users,
  Sparkles,
  UtensilsCrossed,
  BedDouble,
  TreePine,
  Car,
} from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { staggerContainerVariants, staggerItemVariants } from '@/lib/variants';

interface FeatureItem {
  icon: React.ReactNode;
  label: string;
  description: string;
}

const features: FeatureItem[] = [
  {
    icon: <Users size={28} aria-hidden="true" />,
    label: 'Friendly Staff',
    description:
      'Our warm, attentive team is dedicated to making every guest feel genuinely welcome.',
  },
  {
    icon: <Sparkles size={28} aria-hidden="true" />,
    label: 'Elegant Ambience',
    description:
      'Thoughtfully designed spaces that blend comfort with refined, premium aesthetics.',
  },
  {
    icon: <UtensilsCrossed size={28} aria-hidden="true" />,
    label: 'Exceptional Dining',
    description:
      'Savour authentic Kenyan and international cuisine crafted by our talented chefs.',
  },
  {
    icon: <BedDouble size={28} aria-hidden="true" />,
    label: 'Spacious Rooms',
    description:
      'Generously proportioned rooms and suites designed for rest, privacy, and comfort.',
  },
  {
    icon: <TreePine size={28} aria-hidden="true" />,
    label: 'Peaceful Environment',
    description:
      'Nestled away from the city bustle, our grounds offer a tranquil retreat for every guest.',
  },
  {
    icon: <Car size={28} aria-hidden="true" />,
    label: 'Secure Parking',
    description:
      'Ample, well-lit parking within our secure compound so you can arrive with peace of mind.',
  },
];

export default function WhyChooseUs() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = prefersReducedMotion
    ? { hidden: {}, visible: {} }
    : staggerContainerVariants;

  const itemVariants = prefersReducedMotion
    ? { hidden: {}, visible: {} }
    : staggerItemVariants;

  return (
    <section className="py-section bg-primary" aria-labelledby="why-choose-us-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <SectionWrapper className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
            Why Choose Us
          </p>
          <h2
            id="why-choose-us-heading"
            className="font-serif text-display-md font-semibold text-white"
          >
            The SKYCOMFY Difference
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70">
            From the moment you arrive to the moment you leave, every detail is crafted to
            exceed your expectations.
          </p>
        </SectionWrapper>

        {/* Feature grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.article
              key={feature.label}
              variants={itemVariants}
              className="group flex flex-col gap-4 rounded-card border border-white/10 bg-white/5 p-7 backdrop-blur-sm transition-colors duration-300 hover:bg-white/10"
            >
              {/* Icon */}
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent transition-colors duration-300 group-hover:bg-accent/25">
                {feature.icon}
              </div>

              {/* Label */}
              <h3 className="font-serif text-xl font-semibold text-white">
                {feature.label}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed text-white/65">
                {feature.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
