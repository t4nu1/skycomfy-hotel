'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ShieldAlert, ArrowRight } from 'lucide-react';
import { rooms } from '@/constants/rooms';
import SectionWrapper from '@/components/ui/SectionWrapper';
import PageFadeIn from '@/components/ui/PageFadeIn';
import CTASection from '@/components/ui/CTASection';

export default function RoomsPage() {
  return (
    <PageFadeIn>
      {/* 1. ROOMS HERO */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-primary text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1600"
            alt="Deluxe Room with premium amenities at Skycomfy Hotel"
            fill
            priority
            className="object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-primary/45" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-sans text-xs md:text-sm font-semibold tracking-widest text-accent uppercase mb-3 block"
          >
            Luxurious Stays
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
          >
            Rooms & Suites
          </motion.h1>
        </div>
      </section>

      {/* 2. ROOMS INTRODUCTION */}
      <section className="bg-background pt-16 pb-8 px-4 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-4">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
            Tailored for Ultimate Rest & Relaxation
          </h2>
          <div className="w-16 h-1 bg-accent rounded-full" />
          <p className="font-sans text-sm md:text-base text-muted leading-relaxed">
            From business travels to honeymoon packages, we offer three exquisite accommodation options. Experience soundproofed sanctuaries, soft linens, high-speed Wi-Fi, and scenic garden or highway views.
          </p>
        </div>
      </section>

      {/* 3. ALTERNATING ROOM DIRECTORY */}
      <section className="bg-background py-16 px-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-20">
          {rooms.map((room, index) => {
            const isEven = index % 2 === 0;
            return (
              <SectionWrapper
                key={room.id}
                direction={isEven ? 'left' : 'right'}
                className="w-full"
              >
                <article
                  className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 bg-surface rounded-card border border-border p-6 md:p-8 shadow-card hover:shadow-card-hover transition-shadow duration-300 ${
                    isEven ? '' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Left: Image Carousel / Gallery display */}
                  <div className="relative aspect-[4/3] w-full lg:w-1/2 rounded-card overflow-hidden group bg-primary shrink-0 shadow-sm">
                    <Image
                      src={room.images[0]}
                      alt={room.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-103"
                    />
                    {/* Secondary Image hover crossfade effect */}
                    {room.images[1] && (
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <Image
                          src={room.images[1]}
                          alt={`${room.name} alternate view`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-primary/80 backdrop-blur-sm text-accent border border-accent/20 px-3 py-1 font-sans text-xs font-bold rounded-pill">
                      Featured
                    </div>
                  </div>

                  {/* Right: Room Spec Details */}
                  <div className="flex flex-col flex-1 w-full gap-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-4">
                      <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                        {room.name}
                      </h3>
                      <div className="text-right">
                        <span className="font-sans text-xs text-muted block">Rates From</span>
                        <span className="font-sans text-lg font-bold text-accent">
                          {room.priceFrom}
                        </span>
                      </div>
                    </div>

                    <p className="font-sans text-sm md:text-base text-muted leading-relaxed">
                      {room.fullDescription}
                    </p>

                    {/* Amenities Checklist */}
                    <div>
                      <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-foreground mb-3">
                        Included Amenities:
                      </h4>
                      <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
                        {room.amenities.map((amenity) => (
                          <li key={amenity} className="flex items-center gap-2 font-sans text-xs md:text-sm text-muted">
                            <Check size={14} className="text-accent shrink-0" />
                            <span>{amenity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Booking / Details CTAs */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
                      <Link
                        href={`/rooms/${room.slug}`}
                        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-light text-white font-sans font-semibold text-sm rounded-btn transition-colors duration-200 w-full sm:w-auto text-center"
                      >
                        Explore Details
                      </Link>
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-transparent border-2 border-accent hover:border-accent-light text-primary hover:text-accent font-sans font-semibold text-sm rounded-btn transition-colors duration-200 w-full sm:w-auto text-center"
                      >
                        Reserve Room
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

      {/* 4. ROOM POLICIES / INFORMATION */}
      <section className="bg-surface py-16 px-4 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="bg-background rounded-card border border-border p-8 flex flex-col md:flex-row gap-6 items-start">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent shrink-0">
              <ShieldAlert size={24} />
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-serif text-lg font-bold text-foreground">
                Important Stay Policies & Guidelines
              </h3>
              <p className="font-sans text-xs md:text-sm text-muted leading-relaxed">
                Check-in time is standard from <strong>12:00 PM</strong>, and checkout is required by <strong>10:00 AM</strong>. Late checkout requests can be arranged with our booking desks, subject to availability. Children under 5 stay free when sharing rooms with parents. All our indoor spaces are strictly non-smoking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <CTASection />
    </PageFadeIn>
  );
}
