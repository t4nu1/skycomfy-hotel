'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, HeartHandshake, Compass, Users } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import PageFadeIn from '@/components/ui/PageFadeIn';
import CTASection from '@/components/ui/CTASection';

const pillars = [
  {
    icon: HeartHandshake,
    title: 'Warm Kenyan Hospitality',
    description:
      'We treat every guest like family. Our team is dedicated to providing personalized service with a genuine Kenyan smile.',
  },
  {
    icon: ShieldCheck,
    title: 'Uncompromised Comfort',
    description:
      'Our rooms and common spaces are crafted to offer premium comfort, blending contemporary elegance with cozy home touches.',
  },
  {
    icon: Compass,
    title: 'Peaceful Natural Spaces',
    description:
      'Nestled amidst lush botanical surroundings, our quiet gardens and outdoor bonfires offer a restorative sanctuary.',
  },
  {
    icon: Users,
    title: 'Community & Connection',
    description:
      'We serve as a hub for celebrations, business events, family gatherings, and community celebrations in Trans-Nzoia County.',
  },
];

export default function About() {
  return (
    <PageFadeIn>
      {/* 1. SHORT PAGE HERO */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-primary text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=1600"
            alt="Lush green garden backdrop at Skycomfy Hotel"
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
            Who We Are
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
          >
            Our Story & Values
          </motion.h1>
        </div>
      </section>

      {/* 2. THE STORY */}
      <section className="bg-background py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <SectionWrapper direction="left">
              <div className="flex flex-col gap-6">
                <span className="font-sans text-xs md:text-sm font-semibold tracking-wider text-accent uppercase">
                  Heritage of Hospitality
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                  Where Comfort Meets Elegance in Kitale
                </h2>
                <div className="w-16 h-1 bg-accent rounded-full" />
                <p className="font-sans text-sm md:text-base text-muted leading-relaxed">
                  Founded with the vision to elevate Kitale's travel experience, **SKYCOMFY HOTEL KITALE** has blossomed into one of the region’s premier destinations. Strategically positioned off the scenic Kitale-Kapenguria Highway, we provide a quiet, securely gated getaway for leisure, business, and celebrations.
                </p>
                <p className="font-sans text-sm md:text-base text-muted leading-relaxed">
                  We believe that a great stay goes beyond a comfortable bed. It is defined by memorable moments—like an evening bonfire under the stars in our lush botanical gardens, a perfectly seasoned Kenyan dish prepared by our professional chefs, or a business summit that goes seamlessly thanks to our modern conference facilities.
                </p>
              </div>
            </SectionWrapper>

            <SectionWrapper direction="right">
              <div className="relative group rounded-card overflow-hidden shadow-card aspect-[4/3] w-full max-w-lg mx-auto">
                <Image
                  src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800"
                  alt="Standard room design details"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/0 transition-colors duration-300" />
              </div>
            </SectionWrapper>
          </div>
        </div>
      </section>

      {/* 3. CORE PILLARS SECTION */}
      <section className="bg-surface py-16 md:py-24 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionWrapper direction="up">
            <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-4">
              <span className="font-sans text-xs md:text-sm font-semibold tracking-wider text-accent uppercase">
                Our Foundation
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                The Values That Drive Us
              </h2>
              <div className="w-16 h-1 bg-accent rounded-full" />
            </div>
          </SectionWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <SectionWrapper key={pillar.title} direction="up" delay={index * 0.1}>
                  <div className="flex flex-col items-center text-center p-6 bg-background rounded-card border border-border h-full shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent mb-5">
                      <Icon size={24} />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-foreground mb-3">
                      {pillar.title}
                    </h3>
                    <p className="font-sans text-xs md:text-sm text-muted leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </SectionWrapper>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. GARDENS & CULINARY HIGHLIGHTS */}
      <section className="bg-background py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-20">
          
          {/* Garden & Bonfire Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <SectionWrapper direction="left">
              <div className="relative group rounded-card overflow-hidden shadow-card aspect-[4/3] w-full max-w-lg mx-auto">
                <Image
                  src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800"
                  alt="Outdoor events and weddings in Kitale"
                  fill
                  className="object-cover"
                />
              </div>
            </SectionWrapper>

            <SectionWrapper direction="right">
              <div className="flex flex-col gap-5">
                <span className="font-sans text-xs md:text-sm font-semibold tracking-wider text-accent uppercase">
                  Event Gardens & Weddings
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                  Serene Gardens & Magical Bonfires
                </h3>
                <p className="font-sans text-sm md:text-base text-muted leading-relaxed">
                  Our pride is our beautifully manicured outdoor garden. Framed by tropical blooms and mature trees, it provides an exquisite background for romantic garden weddings, milestone celebrations, team building, and baby showers.
                </p>
                <p className="font-sans text-sm md:text-base text-muted leading-relaxed">
                  In the evenings, the garden transforms. We host magical bonfire sessions under the stars where families and friends gather to chat, enjoy warm beverages, and share laughter in the cool Kitale air.
                </p>
              </div>
            </SectionWrapper>
          </div>

          {/* Culinary / Dining Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center lg:flex-row-reverse">
            <SectionWrapper direction="left" className="lg:order-2">
              <div className="relative group rounded-card overflow-hidden shadow-card aspect-[4/3] w-full max-w-lg mx-auto">
                <Image
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800"
                  alt="Fine dining and Kenyan cuisine in Kitale"
                  fill
                  className="object-cover"
                />
              </div>
            </SectionWrapper>

            <SectionWrapper direction="right" className="lg:order-1">
              <div className="flex flex-col gap-5">
                <span className="font-sans text-xs md:text-sm font-semibold tracking-wider text-accent uppercase">
                  Culinary Delights
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                  A Gastronomic Journey in Trans-Nzoia
                </h3>
                <p className="font-sans text-sm md:text-base text-muted leading-relaxed">
                  At Skycomfy, we celebrate culinary diversity. Our restaurant serves premium authentic Kenyan delicacies (including perfectly flame-grilled chicken, fresh tilapia, and locally sourced traditional greens) along with seasoned continental dishes.
                </p>
                <p className="font-sans text-sm md:text-base text-muted leading-relaxed">
                  Enjoy your meal in our warm, beautifully lit indoor dining area or dine al fresco in the garden gazebos, soaking in the gentle breeze and pure tranquility.
                </p>
              </div>
            </SectionWrapper>
          </div>

        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <CTASection
        headline="Ready to Plan Your Stay or Garden Event?"
        subtext="Contact our booking managers today to secure your luxury room reservation or schedule a private garden venue viewing."
      />
    </PageFadeIn>
  );
}
