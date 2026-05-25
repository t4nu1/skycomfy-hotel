'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BedDouble, UtensilsCrossed, Trees, ArrowRight, MapPin } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';

/* ─────────────────────────────────────────────────────────────
   AboutPreview
   Homepage section — two-column layout with a real hotel photo
   on the left and a brand introduction + "Learn More" CTA on
   the right. Uses actual SKYCOMFY HOTEL KITALE photography.
   Requirements: 4.1, 4.2, 4.3
───────────────────────────────────────────────────────────── */

const HIGHLIGHTS = [
  { icon: BedDouble,        label: 'Cozy Rooms'   },
  { icon: UtensilsCrossed,  label: 'Fine Dining'  },
  { icon: Trees,            label: 'Lush Gardens' },
] as const;

export default function AboutPreview() {
  return (
    <section
      className="bg-background py-section-sm md:py-section px-4"
      aria-labelledby="about-preview-heading"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: real hotel entrance photo ── */}
          <SectionWrapper direction="left">
            <div className="relative group rounded-card overflow-hidden shadow-card aspect-[4/3] bg-primary">
              <Image
                src="/images/exterior/hotel-entrance-02.jpg"
                alt="SKYCOMFY HOTEL KITALE entrance and grounds — Kitale, Kenya"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Subtle inner ring overlay */}
              <div
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.04]"
                aria-hidden="true"
              />
              {/* Location badge */}
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-primary/80 backdrop-blur-sm border border-white/10 text-white/80 font-sans text-[0.65rem] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-pill">
                <MapPin size={10} className="text-accent" aria-hidden="true" />
                Kitale, Kenya
              </div>
            </div>
          </SectionWrapper>

          {/* ── Right: brand copy + CTA ── */}
          <SectionWrapper direction="right">
            <div className="flex flex-col gap-6">

              {/* Gold eyebrow label */}
              <div
                className="w-fit font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em]
                           text-accent flex items-center gap-2"
                style={{ borderBottom: '1.5px solid var(--color-accent)', paddingBottom: '4px' }}
              >
                <span className="block h-[5px] w-[5px] rounded-full bg-accent" aria-hidden="true" />
                A Sanctuary of Serenity
              </div>

              {/* Section heading */}
              <h2
                id="about-preview-heading"
                className="font-serif text-3xl md:text-4xl font-bold text-foreground leading-[1.1]"
              >
                Discover a True Oasis in Kitale
              </h2>

              {/* Brand introduction paragraphs */}
              <p className="text-sm md:text-base text-muted leading-relaxed">
                Located off the Kitale–Kapenguria Highway,{' '}
                <strong>SKYCOMFY HOTEL KITALE</strong> offers a peaceful and luxurious
                escape from the hustle of city life — a space where comfort, modern
                convenience, and the warmth of Kenyan hospitality merge seamlessly.
              </p>
              <p className="text-sm md:text-base text-muted leading-relaxed">
                Whether you are visiting for business, planning a corporate conference,
                exploring scenic tourism, or looking to tie the knot in our gorgeous
                gardens, our team is committed to making your stay flawless.
              </p>

              {/* Feature highlight chips */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                {HIGHLIGHTS.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-2 p-3 rounded-lg
                               bg-surface border border-border/50"
                  >
                    <Icon size={18} className="text-accent" aria-hidden="true" />
                    <span
                      className="text-[0.65rem] font-sans font-semibold text-foreground/70
                                 tracking-wide uppercase text-center"
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* "Learn More" CTA */}
              <Link
                href="/about"
                className="group flex w-fit items-center gap-2 text-accent font-sans text-sm
                           font-semibold transition-colors hover:text-accent-light"
                aria-label="Learn more about Skycomfy Hotel Kitale"
              >
                Learn More About Us
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
                <span
                  className="block h-px w-8 bg-accent/30 group-hover:w-14 transition-all duration-300"
                  aria-hidden="true"
                />
              </Link>

            </div>
          </SectionWrapper>

        </div>
      </div>
    </section>
  );
}
