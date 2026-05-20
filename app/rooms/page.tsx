'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Check, ShieldAlert, ArrowRight } from 'lucide-react';
import { rooms } from '@/constants/rooms';
import SectionWrapper from '@/components/ui/SectionWrapper';
import PageFadeIn from '@/components/ui/PageFadeIn';
import CTASection from '@/components/ui/CTASection';

export default function RoomsPage() {
  return (
    <PageFadeIn>
      {/*
       * ───────────────────────────────────────────────────────
       * 1. PAGE HERO
       * ───────────────────────────────────────────────────────
       */}
      <section className="relative h-[38vh] min-h-[300px] flex items-center justify-center bg-primary text-white"
               aria-label="Rooms &amp; Suites hero">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1600&q=85"
            alt="Skycomfy Deluxe Room interior"
            fill
            priority
            className="object-cover brightness-[0.40]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/30 to-primary/55" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <div
            className="mx-auto mb-4 flex items-center justify-center gap-2 rounded-full border border-accent/35"
            style={{ background: 'rgba(212,168,67,0.10)', padding: '5px 16px', width: 'fit-content' }}
          >
            <span className="block h-[5px] w-[5px] rounded-full bg-accent" />
            <span className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-accent">
              Luxurious Stays
            </span>
            <span className="block h-[5px] w-[5px] rounded-full bg-accent" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
            Rooms &amp; Suites
          </h1>
        </div>
      </section>

      {/*
       * ───────────────────────────────────────────────────────
       * 2. ROOM INTRO
       * ───────────────────────────────────────────────────────
       */}
      <section className="bg-background pt-section-sm pb-6 px-4">
        <div className="mx-auto max-w-3xl text-center flex flex-col items-center gap-4">
          <h2 className="section-label" style={{ borderBottom: 'none' }}>
            <span className="ornament" aria-hidden="true" />
            Accommodations
            <span className="ornament" aria-hidden="true" />
          </h2>
          <p className="text-sm md:text-base text-muted leading-relaxed">
            From business travels to honeymoon packages, we offer three exquisite accommodation
            options. Experience soundproofed sanctuaries, soft linens, high-speed Wi-Fi, and
            scenic garden or highway views.
          </p>
        </div>
      </section>

      {/*
       * ───────────────────────────────────────────────────────
       * 3. ROOM LISTING (alternating)
       * ───────────────────────────────────────────────────────
       */}
      <section className="bg-background py-section-sm px-4">
        <div className="mx-auto max-w-7xl px-6 md:px-8 flex flex-col gap-16 md:gap-20">
          {rooms.map((room, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <SectionWrapper
                key={room.id}
                direction={isEven ? 'left' : 'right'}
                className="w-full"
              >
                <article
                  className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center bg-surface rounded-card
                              border border-border p-6 md:p-8 shadow-card
                              hover:shadow-card-hover transition-shadow duration-500
                              ${isEven ? '' : 'lg:flex-row-reverse'}`}
                >
                  {/* ── Image panel ── */}
                  <div className="relative w-full lg:w-[52%] aspect-[4/3] rounded-card overflow-hidden bg-primary shrink-0">
                    <Image
                      src={room.images[0]}
                      alt={`${room.name} — exterior view`}
                      fill
                      sizes="(max-w: 1024px) 100vw, 52vw"
                      className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                    />
                    {room.images[1] && (
                      <Image
                        src={room.images[1]}
                        alt=""
                        fill
                        sizes="(max-w: 1024px) 100vw, 52vw"
                        className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    )}
                    {/* Featured badge */}
                    <div
                      className="absolute top-4 right-4 flex items-center gap-2 font-sans text-[0.6rem] font-bold
                                 uppercase tracking-wider text-white rounded-pill"
                      style={{
                        background: 'rgba(26,39,68,0.75)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        padding: '4px 12px',
                      }}
                    >
                      Featured
                    </div>
                  </div>

                  {/* ── Detail panel ── */}
                  <div className="flex flex-col gap-5 w-full lg:flex-1">
                    {/* Header: name + rate */}
                    <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border pb-4">
                      <div>
                        <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                          {room.name}
                        </h3>
                        <span className="font-sans text-xs text-accent uppercase tracking-wider mt-1">
                          Starting from
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-sans text-2xl font-bold text-accent">{room.priceFrom}</span>
                        <span className="block text-[0.625rem] text-muted">per night</span>
                      </div>
                    </div>

                    <!-- Description -->
                    <p className="text-sm md:text-base text-muted leading-relaxed">
                      {room.fullDescription}
                    </p>

                    {/* Amenities list */}
                    <div>
                      <h4 className="font-sans text-[0.65rem] font-bold uppercase tracking-widest text-foreground/80 mb-3">
                        Room Amenities
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                        {room.amenities.map((a) => (
                          <li key={a} className="flex items-center gap-2 text-sm text-muted/80">
                            <Check
                              size={14}
                              className="text-accent shrink-0"
                              strokeWidth={2.5}
                            />
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2 mt-auto">
                      <Link
                        href={`/rooms/${room.slug}`}
                        className="btn-primary w-full sm:w-auto justify-center"
                      >
                        Explore Room
                      </Link>
                      <Link
                        href="/contact"
                        className="btn-outline-dark w-full sm:w-auto justify-center"
                      >
                        Book Room
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </article>
              </SectionWrapper>
            );
          })}
        </div>
      </section>

      {/*
       * ───────────────────────────────────────────────────────
       * 4. ROOM POLICIES
       * ───────────────────────────────────────────────────────
       */}
      <section className="bg-surface-alt/50 border-t border-border py-section-sm px-4">
        <div className="mx-auto max-w-5xl px-6">
          <SectionWrapper direction="up">
            <div
              className="flex flex-col md:flex-row gap-6 items-start p-7 md:p-9 rounded-card
                         bg-surface border border-border shadow-card"
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full shrink-0"
                style={{ background: 'rgba(212,168,67,0.12)', color: 'var(--color-accent)' }}
              >
                <ShieldAlert size={24} aria-hidden="true" />
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-serif text-lg font-bold text-foreground">
                  Important Stay Policies &amp; Guidelines
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  Check-in is from <strong className="text-foreground/90">12:00 PM</strong>,
                  and checkout is required by <strong className="text-foreground/90">10:00 AM</strong>.
                  Late checkout can be arranged subject to availability.
                  Children under <strong className="text-foreground/90">5</strong> stay free when
                  sharing with parents. All indoor spaces are strictly non-smoking.
                </p>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </PageFadeIn>
  );
}
