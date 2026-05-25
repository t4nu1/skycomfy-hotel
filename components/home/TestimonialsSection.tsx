'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import TestimonialCard from '@/components/cards/TestimonialCard';
import { testimonials } from '@/constants/testimonials';
import { staggerContainerVariants } from '@/lib/variants';

const noop = { hidden: {}, visible: {} };

/**
 * Featured review — shown prominently beside a real hotel photo.
 * Gives the section an editorial, magazine-style feel.
 */
const featuredReviews = [
  {
    quote: 'Very clean rooms and excellent customer service. Best hotel in Kitale town.',
    author: 'Peter K.',
    rating: 5,
    imageSrc: '/images/rooms/room-interior-01.jpg',
    imageAlt: 'Clean, comfortable room at SKYCOMFY HOTEL KITALE',
    tag: 'Rooms',
  },
  {
    quote: 'Best food in Kitale town. The local dishes are fresh, flavourful, and generous.',
    author: 'Grace N.',
    rating: 5,
    imageSrc: '/images/dining/dining-food-01.jpg',
    imageAlt: 'Freshly prepared cuisine at SKYCOMFY HOTEL KITALE restaurant',
    tag: 'Dining',
  },
  {
    quote: 'Lovely place with a beautiful garden space. Perfect for family gatherings.',
    author: 'Amina W.',
    rating: 5,
    imageSrc: '/images/gallery/hotel-garden-01.jpg',
    imageAlt: 'Serene garden and outdoor space at SKYCOMFY HOTEL KITALE',
    tag: 'Garden',
  },
];

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? 'fill-accent text-accent' : 'fill-transparent text-border/60'}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const reduce = useReducedMotion();
  const containerVariants = reduce ? noop : staggerContainerVariants;

  return (
    <section
      className="py-section bg-background"
      aria-labelledby="testimonials-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section heading ── */}
        <SectionWrapper className="mb-14 text-center">
          <p className="font-sans text-xs font-semibold tracking-widest uppercase text-accent mb-3">
            Guest Reviews
          </p>
          <h2
            id="testimonials-heading"
            className="font-serif text-display-md text-foreground"
          >
            What Our Guests Say
          </h2>
          <p className="mt-4 font-sans text-base text-muted max-w-xl mx-auto">
            Real experiences from guests who have stayed, dined, and celebrated at
            SKYCOMFY HOTEL KITALE in Kitale, Kenya.
          </p>
        </SectionWrapper>

        {/* ── Featured photo + quote panels ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {featuredReviews.map((item, idx) => (
            <SectionWrapper key={item.author} direction="up" delay={idx * 0.12}>
              <div className="group relative rounded-card overflow-hidden shadow-card aspect-[4/3] bg-primary">
                {/* Real hotel photo */}
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Dark gradient overlay — stronger at bottom for text legibility */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent"
                  aria-hidden="true"
                />

                {/* Category tag */}
                <div className="absolute top-4 left-4 bg-accent/90 text-primary font-sans text-[0.6rem] font-bold uppercase tracking-widest px-2.5 py-1 rounded-pill">
                  {item.tag}
                </div>

                {/* Quote overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-2">
                  <Quote size={18} className="text-accent/70 fill-accent/20" aria-hidden="true" />
                  <p className="font-sans text-sm text-white/90 leading-relaxed italic">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <StarRow rating={item.rating} />
                    <span className="font-sans text-[0.65rem] font-semibold text-white/60 uppercase tracking-wider">
                      — {item.author}
                    </span>
                  </div>
                </div>
              </div>
            </SectionWrapper>
          ))}
        </div>

        {/* ── All testimonial cards — horizontal scroll on mobile, grid on md+ ── */}
        <SectionWrapper direction="none">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className={[
              'flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory',
              'md:grid md:grid-cols-2 md:overflow-visible md:pb-0 md:snap-none',
              'lg:grid-cols-3',
              '[&::-webkit-scrollbar]:h-1.5',
              '[&::-webkit-scrollbar-track]:bg-border/20',
              '[&::-webkit-scrollbar-thumb]:bg-accent/40',
              '[&::-webkit-scrollbar-thumb]:rounded-full',
            ].join(' ')}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="snap-start shrink-0 w-[300px] sm:w-[340px] md:w-auto md:shrink"
              >
                <TestimonialCard testimonial={testimonial} index={index} />
              </div>
            ))}
          </motion.div>
        </SectionWrapper>

      </div>
    </section>
  );
}
