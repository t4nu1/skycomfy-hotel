'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import RoomCard from '@/components/rooms/RoomCard';
import { rooms } from '@/constants/rooms';
import { staggerContainerVariants, staggerItemVariants } from '@/lib/variants';

/* ─────────────────────────────────────────────────────────────
   FeaturedRooms
   Homepage section — shows the first 3 rooms from the ROOMS
   constant using the compact "featured" RoomCard variant.
   Staggered entrance animation via Framer Motion.
───────────────────────────────────────────────────────────── */
export default function FeaturedRooms() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = prefersReducedMotion
    ? { hidden: {}, visible: {} }
    : staggerContainerVariants;

  const itemVariants = prefersReducedMotion
    ? { hidden: {}, visible: {} }
    : staggerItemVariants;

  const featuredRooms = rooms.slice(0, 3);

  return (
    <section
      className="py-section bg-background"
      aria-labelledby="featured-rooms-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section header */}
        <SectionWrapper className="mb-12 text-center">
          <p className="font-sans text-xs font-bold uppercase tracking-widest text-accent mb-3">
            Accommodation
          </p>
          <h2
            id="featured-rooms-heading"
            className="font-serif text-display-md font-semibold text-foreground mb-4"
          >
            Our Rooms &amp; Suites
          </h2>
          <p className="font-sans text-base text-muted max-w-xl mx-auto leading-relaxed">
            From cosy standard rooms to our luxurious Executive Suite, every space
            is designed to make you feel at home.
          </p>
        </SectionWrapper>

        {/* Room cards — staggered grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {featuredRooms.map((room) => (
            <motion.div key={room.id} variants={itemVariants}>
              <RoomCard room={room} variant="featured" />
            </motion.div>
          ))}
        </motion.div>

        {/* "View All Rooms" CTA */}
        <SectionWrapper className="mt-12 flex justify-center" delay={0.1}>
          <Link
            href="/rooms"
            className="btn-primary inline-flex items-center gap-2"
          >
            View All Rooms
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </SectionWrapper>
      </div>
    </section>
  );
}
