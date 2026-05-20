'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, BedDouble, Trees, UtensilsCrossed, ArrowRight, Phone } from 'lucide-react';
import { rooms } from '@/constants/rooms';
import { services } from '@/constants/services';
import { testimonials } from '@/constants/testimonials';
import ServiceCard from '@/components/cards/ServiceCard';
import SectionWrapper from '@/components/ui/SectionWrapper';
import PageFadeIn from '@/components/ui/PageFadeIn';
import CTASection from '@/components/ui/CTASection';

const HERO_IMG = 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1600&q=85';
const WHATSAPP  = 'https://wa.me/254747118328';

export default function Home() {
  // ─── Testimonial rotator ───
  const [activeT, setActiveT] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActiveT((p) => (p + 1) % testimonials.length), 6500);
    return () => clearInterval(t);
  }, []);

  const nextT = useCallback(() => setActiveT((p) => (p + 1) % testimonials.length), []);
  const prevT = useCallback(() => setActiveT((p) => (p - 1 + testimonials.length) % testimonials.length), []);

  return (
    <PageFadeIn>
      {/* ════════════════════════════════════════
          1. HERO — full-bleed, immersive
          ════════════════════════════════════════ */}
      <section
        className="relative h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] min-h-[600px]
                   flex items-center justify-center overflow-hidden bg-primary"
        aria-label="Welcome"
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={HERO_IMG}
            alt="Skycomfy Hotel luxurious view"
            fill
            priority
            fetchPriority="high"
            className="object-cover object-center transition-transform duration-[2.5s] ease-out
                       will-change-transform scale-105 group-hover:scale-100"
            style={{ WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0.3) 100%)' }}
          />
          {/* Dual-layer overlay: deep navy gradient + subtle vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(26,39,68,0.25)_0%,transparent_70%)] z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.78] via-primary/[0.38] to-primary/70 z-[2]" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center text-white">

          {/* Gold eyebrow pill */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="mx-auto mb-5 flex items-center justify-center gap-2 rounded-full
                       border border-accent/35"
            style={{ background: 'rgba(212,168,67,0.10)', padding: '6px 18px' }}
          >
            <span className="block h-[5px] w-[5px] rounded-full bg-accent" />
            <span className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-accent">
              Welcome to SKYCOMFY HOTEL KITALE
            </span>
            <span className="block h-[5px] w-[5px] rounded-full bg-accent" />
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.25 }}
            className="font-serif font-bold leading-[1.08] tracking-tight
                       text-[clamp(2rem,5vw+0.5rem,3.75rem)] max-w-4xl mx-auto mb-6"
          >
            Comfort Meets Elegance
            <br />
            <span className="text-accent" style={{ WebkitTextStroke: '0.5px var(--color-accent)', WebkitTextFillColor: 'transparent' }}>
              in the Heart of Kitale
            </span>
          </motion.h1>

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38 }}
            className="mx-auto mb-10 max-w-2xl text-sm md:text-base text-white/70 leading-relaxed"
          >
            Experience premium accommodations, delectable local and international cuisine,
            fully equipped conference facilities, and serene garden wedding settings.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.52 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/rooms"
              className="btn-accent px-9 py-3.5 text-sm uppercase tracking-wider"
            >
              Explore Rooms
            </Link>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-light px-9 py-3.5 text-sm uppercase tracking-wider"
            >
              <Phone size={14} />
              Book via WhatsApp
            </a>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-7 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          transition={{ delay: 1.4, duration: 1 }}
          aria-hidden="true"
        >
          <span className="text-[0.6rem] font-sans uppercase tracking-[0.3em] text-white">Scroll</span>
          <div className="h-7 w-[1px] bg-white/40 relative overflow-hidden rounded-full">
            <motion.div
              className="absolute left-0 right-0 h-3 bg-accent/70"
              animate={{ top: ['-12px', '28px', '-12px'] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════
          2. ABOUT PREVIEW
          ════════════════════════════════════════ */}
      <section className="bg-background py-section-sm md:py-section px-4" aria-labelledby="about-heading">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Image panel */}
            <SectionWrapper direction="left">
              <div className="relative group rounded-card overflow-hidden shadow-card aspect-[4/3] bg-primary">
                <Image
                  src="https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=900&q=80"
                  alt="Lush garden pathways at Skycomfy Hotel"
                  fill
                  sizes="(max-w: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Decorative inner glow */}
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.04]" />
              </div>
            </SectionWrapper>

            {/* Text panel */}
            <SectionWrapper direction="right">
              <div className="flex flex-col gap-6">
                {/* Gold label pill */}
                <div
                  className="w-fit font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-accent flex items-center gap-2"
                  style={{ borderBottom: '1.5px solid var(--color-accent)', paddingBottom: '4px' }}
                >
                  <span className="block h-[5px] w-[5px] rounded-full bg-accent" />
                  A Sanctuary of Serenity
                </div>

                <h2 id="about-heading" className="font-serif text-3xl md:text-4xl font-bold text-foreground leading-[1.1]">
                  Discover a True Oasis in Kitale
                </h2>

                <p className="text-sm md:text-base text-muted leading-relaxed">
                  Located off the Kitale–Kapenguria Highway, <strong>SKYCOMFY HOTEL KITALE</strong> offers
                  a peaceful and luxurious escape from the hustle of city life — a space where comfort,
                  modern convenience, and the warmth of Kenyan hospitality merge seamlessly.
                </p>
                <p className="text-sm md:text-base text-muted leading-relaxed">
                  Whether you are visiting for business, planning a dynamic corporate conference,
                  exploring scenic tourism, or looking to tie the knot in our gorgeous gardens,
                  our team is committed to making your stay flawless.
                </p>

                {/* Feature highlights */}
                <div className="grid grid-cols-3 gap-4 pt-4">
                  {[
                    { icon: BedDouble,  label: 'Cozy Rooms' },
                    { icon: UtensilsCrossed, label: 'Fine Dining' },
                    { icon: Trees,     label: 'Lush Gardens' },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex flex-col items-center gap-2 p-3 rounded-lg bg-surface-alt/60 border border-border/50">
                      <Icon size={18} className="text-accent" />
                      <span className="text-[0.65rem] font-sans font-semibold text-foreground/70 tracking-wide uppercase">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* arrow-link */}
                <Link
                  href="/about"
                  className="group flex w-fit items-center gap-2 text-accent font-sans text-sm font-semibold
                             transition-colors hover:text-accent-dark"
                >
                  Learn More About Us
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                  <span className="block h-px w-8 bg-accent/30 group-hover:w-14 transition-all duration-300" />
                </Link>
              </div>
            </SectionWrapper>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          3. FEATURED ROOMS
          ════════════════════════════════════════ */}
      <section className="bg-surface border-y border-border py-section-sm md:py-section px-4" aria-labelledby="rooms-heading">
        <div className="mx-auto max-w-7xl px-6 md:px-8">

          {/* Section header */}
          <SectionWrapper direction="up">
            <div className="text-center mb-14 max-w-2xl mx-auto flex flex-col items-center gap-4">
              <div className="section-label">
                <span className="ornament" aria-hidden="true" />
                Premium Stays
                <span className="ornament" aria-hidden="true" />
              </div>
              <h2 id="rooms-heading" className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                Our Luxurious Rooms &amp; Suites
              </h2>
              <p className="text-sm md:text-base text-muted leading-relaxed">
                Each room is meticulously designed to offer a peaceful haven,
                boasting premium linens, modern en-suite amenities, and scenic regional views.
              </p>
            </div>
          </SectionWrapper>

          {/* Room cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 md:gap-8">
            {rooms.map((room, i) => (
              <SectionWrapper key={room.id} direction="up" delay={i * 0.1}>
                <article
                  className="group flex flex-col h-full bg-surface rounded-card border border-border overflow-hidden
                             shadow-card hover:shadow-card-hover transition-all duration-400 ease-out"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-primary">
                    <Image
                      src={room.images[0]}
                      alt={`${room.name} — interior`}
                      fill
                      sizes="(max-w: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    {/* Secondary image reveals on hover via crossfade */}
                    {room.images[1] && (
                      <Image
                        src={room.images[1]}
                        alt=""
                        fill
                        sizes="(max-w: 768px) 100vw, 33vw"
                        className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    )}

                    {/* Price badge */}
                    <div
                      className="absolute right-4 top-4 font-sans text-[0.625rem] font-bold uppercase tracking-widest rounded-pill"
                      style={{
                        background: 'var(--color-accent)',
                        color: 'var(--color-primary)',
                        padding: '4px 12px',
                      }}
                    >
                      {room.priceFrom}
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="flex flex-col flex-grow gap-3 p-6">
                    <h3 className="font-serif text-lg font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                      {room.name}
                    </h3>
                    <p className="text-xs md:text-sm text-muted/75 leading-relaxed flex-grow">
                      {room.shortDescription}
                    </p>

                    {/* Amenity chips */}
                    <div className="flex flex-wrap gap-1.5 pt-3">
                      {room.amenities.slice(0, 3).map((a) => (
                        <span
                          key={a}
                          className="font-sans text-[0.6rem] uppercase tracking-wider
                                     bg-primary/[0.04] text-primary/60 px-2 py-1 rounded-sm"
                        >
                          {a}
                        </span>
                      ))}
                      {room.amenities.length > 3 && (
                        <span
                          className="font-sans text-[0.6rem] uppercase tracking-wider
                                     bg-primary/[0.04] text-primary/60 px-2 py-1 rounded-sm"
                        >
                          +{room.amenities.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Bottom action row */}
                    <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                      <Link
                        href={`/rooms/${room.slug}`}
                        className="font-sans text-[0.6875rem] font-semibold uppercase tracking-wider
                                   text-foreground/60 hover:text-accent transition-colors duration-200"
                      >
                        View Details
                      </Link>
                      <Link
                        href="/contact"
                        className="font-sans text-[0.6875rem] font-bold uppercase tracking-wider text-accent
                                   flex items-center gap-1 hover:gap-2 transition-all duration-200"
                      >
                        Book Now
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </article>
              </SectionWrapper>
            ))}
          </div>

          {/* see-all link */}
          <div className="mt-10 text-center">
            <Link
              href="/rooms"
              className="inline-flex items-center gap-2 px-7 py-3 bg-primary text-white
                         font-sans text-xs font-semibold uppercase tracking-widest rounded-btn shadow-md
                         transition-all duration-300 hover:bg-primary-light hover:-translate-y-[2px]"
            >
              View All Accommodations
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          4. AMENITIES & SERVICES
          ════════════════════════════════════════ */}
      <section className="bg-background py-section px-4" aria-labelledby="services-heading">
        <div className="mx-auto max-w-7xl px-6 md:px-8">

          <SectionWrapper direction="up">
            <div className="text-center mb-14 max-w-2xl mx-auto flex flex-col items-center gap-4">
              <div className="section-label">
                <span className="ornament" aria-hidden="true" />
                What We Offer
                <span className="ornament" aria-hidden="true" />
              </div>
              <h2 id="services-heading" className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                Exceptional Amenities &amp; Experiences
              </h2>
              <p className="text-sm md:text-base text-muted leading-relaxed">
                From cozy garden bonfire evenings to state-of-the-art business conferences,
                we tailor our amenities to your ultimate comfort.
              </p>
            </div>
          </SectionWrapper>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-6">
            {services.map((svc, i) => (
              <SectionWrapper key={svc.id} direction="up" delay={i * 0.06}>
                <ServiceCard service={svc} />
              </SectionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          5. TESTIMONIALS
          ════════════════════════════════════════ */}
      <section
        className="relative py-section-sm md:py-section px-4 overflow-hidden"
        style={{ background: 'var(--color-primary)' }}
        aria-labelledby="testimonials-heading"
      >
        {/* Decorative gold rings */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-[480px] w-[480px] rounded-full border border-accent/[0.05]" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-[480px] w-[480px] rounded-full border border-accent/[0.05]" aria-hidden="true" />

        <div className="relative mx-auto max-w-4xl px-6 md:px-8">
          <SectionWrapper direction="up">
            <div className="text-center mb-10">
              <h2 id="testimonials-heading" className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight mb-2">
                Loved by Our Guests
              </h2>
              <div className="divider-gold mx-auto" aria-hidden="true" />
            </div>
          </SectionWrapper>

          {/* Active testimonial card */}
          <SectionWrapper direction="none">
            <div
              className="relative rounded-card border border-white/[0.09] p-8 md:p-14 text-center flex flex-col items-center
                         min-h-[240px] justify-center"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              <Star className="text-accent fill-accent w-8 h-8 mb-7" aria-hidden="true" />

              <div className="w-full max-w-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeT}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center gap-5"
                  >
                    <blockquote
                      className="font-serif text-lg md:text-xl leading-relaxed italic text-white/90 max-w-2xl"
                      style={{ WebkitTextStroke: '0.2px rgba(255,255,255,0.04)' }}
                    >
                      &ldquo;{testimonials[activeT].text}&rdquo;
                    </blockquote>
                    <cite
                      className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-accent not-italic"
                    >
                      — {testimonials[activeT].guestName}
                    </cite>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Pagination dots */}
              <div className="flex items-center gap-2 mt-7" role="tablist" aria-label="Testimonial navigation">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveT(i)}
                    role="tab"
                    aria-selected={i === activeT}
                    aria-label={`Testimonial ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeT
                        ? 'bg-accent w-7'
                        : 'bg-white/20 hover:bg-white/40 w-1.5'
                    }`}
                  />
                ))}
              </div>

              {/* Arrow buttons */}
              <button
                type="button"
                onClick={prevT}
                aria-label="Previous testimonial"
                className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:flex
                           h-9 w-9 items-center justify-center rounded-full
                           bg-white/[0.07] text-white/60 border border-white/10
                           hover:bg-accent hover:text-primary hover:border-transparent
                           transition-colors duration-250"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={nextT}
                aria-label="Next testimonial"
                className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:flex
                           h-9 w-9 items-center justify-center rounded-full
                           bg-white/[0.07] text-white/60 border border-white/10
                           hover:bg-accent hover:text-primary hover:border-transparent
                           transition-colors duration-250"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* ════════════════════════════════════════
          6. CALL TO ACTION
          ════════════════════════════════════════ */}
      <CTASection />
    </PageFadeIn>
  );
}
