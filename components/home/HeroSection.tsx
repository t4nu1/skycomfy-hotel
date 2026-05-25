'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Phone } from 'lucide-react';

/* Real SKYCOMFY HOTEL KITALE photo — exterior/building shot used as cinematic hero */
const HERO_IMG = '/images/hero/hero-main.jpg';
const WHATSAPP = 'https://wa.me/254747118328';

/* ─── Framer Motion variants ─── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const noopVariants = {
  hidden: {},
  visible: {},
};

const noopItemVariants = {
  hidden: {},
  visible: {},
};

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  const activeContainer = shouldReduceMotion ? noopVariants : containerVariants;
  const activeItem = shouldReduceMotion ? noopItemVariants : itemVariants;

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary"
      aria-label="Welcome to SKYCOMFY HOTEL KITALE"
    >
      {/* ── Background image ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src={HERO_IMG}
          alt="SKYCOMFY HOTEL KITALE — real hotel exterior and grounds in Kitale, Kenya"
          fill
          priority
          fetchPriority="high"
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dual-layer overlay: radial vignette + directional gradient */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              'radial-gradient(ellipse at 50% 60%, rgba(26,39,68,0.25) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 z-[2]"
          style={{
            background: 'var(--bg-hero-overlay)',
          }}
          aria-hidden="true"
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center text-white">
        <motion.div
          variants={activeContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-0"
        >
          {/* Gold eyebrow pill */}
          <motion.div
            variants={activeItem}
            className="mx-auto mb-5 flex items-center justify-center gap-2 rounded-full
                       border border-accent/35"
            style={{ background: 'rgba(212,168,67,0.10)', padding: '6px 18px' }}
          >
            <span className="block h-[5px] w-[5px] rounded-full bg-accent" aria-hidden="true" />
            <span className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-accent">
              Welcome to SKYCOMFY HOTEL KITALE
            </span>
            <span className="block h-[5px] w-[5px] rounded-full bg-accent" aria-hidden="true" />
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={activeItem}
            className="font-serif font-bold leading-[1.08] tracking-tight
                       text-[clamp(2rem,5vw+0.5rem,3.75rem)] max-w-4xl mx-auto mb-6"
          >
            Comfort Meets Elegance
            <br />
            <span
              className="text-accent"
              style={{
                WebkitTextStroke: '0.5px var(--color-accent)',
                WebkitTextFillColor: 'transparent',
              }}
            >
              in the Heart of Kitale
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={activeItem}
            className="mx-auto mb-10 max-w-2xl text-sm md:text-base text-white/70 leading-relaxed"
          >
            Experience premium accommodations, delectable local and international cuisine,
            fully equipped conference facilities, and serene garden wedding settings — all
            in the heart of Kitale, Kenya.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={activeItem}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="btn-accent px-9 py-3.5 text-sm uppercase tracking-wider"
            >
              Book Your Stay
            </Link>
            <Link
              href="/rooms"
              className="btn-outline-light px-9 py-3.5 text-sm uppercase tracking-wider"
            >
              Explore Rooms
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll hint ── */}
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: shouldReduceMotion ? 0.45 : 0.45 }}
        transition={shouldReduceMotion ? {} : { delay: 1.4, duration: 1 }}
        aria-hidden="true"
      >
        <span className="text-[0.6rem] font-sans uppercase tracking-[0.3em] text-white">
          Scroll
        </span>
        <div className="h-7 w-[1px] bg-white/40 relative overflow-hidden rounded-full">
          {!shouldReduceMotion && (
            <motion.div
              className="absolute left-0 right-0 h-3 bg-accent/70"
              animate={{ top: ['-12px', '28px', '-12px'] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            />
          )}
        </div>
      </motion.div>
    </section>
  );
}
