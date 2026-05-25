'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { galleryImages } from '@/constants/gallery';
import { staggerContainerVariants, staggerItemVariants } from '@/lib/variants';

const PREVIEW_COUNT = 6;

/**
 * GalleryPreview
 * Homepage section — shows 6 real hotel photos in a responsive
 * masonry-style grid. Uses only local /public/images assets.
 * Returns null if fewer than 6 images are available.
 * Requirements: 9.1–9.5
 */
export default function GalleryPreview() {
  const prefersReducedMotion = useReducedMotion();
  const displayImages = galleryImages.slice(0, PREVIEW_COUNT);

  if (displayImages.length < PREVIEW_COUNT) return null;

  return (
    <section className="py-section bg-surface" aria-labelledby="gallery-preview-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <SectionWrapper className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">
            Our Gallery
          </p>
          <h2
            id="gallery-preview-heading"
            className="font-serif text-display-md text-foreground mb-4"
          >
            A Glimpse of SKYCOMFY
          </h2>
          <p className="mx-auto max-w-xl text-muted">
            Real photos from SKYCOMFY HOTEL KITALE — rooms, dining, gardens, and the
            warm atmosphere that makes every stay memorable.
          </p>
        </SectionWrapper>

        {/* ── Asymmetric grid: 2 tall left + 4 right ── */}
        <motion.div
          variants={prefersReducedMotion ? undefined : staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4"
        >
          {displayImages.map((image, index) => (
            <motion.div
              key={image.id}
              variants={prefersReducedMotion ? undefined : staggerItemVariants}
              className={`group relative overflow-hidden rounded-card bg-primary ${
                /* First image spans 2 rows on md+ for editorial feel */
                index === 0 ? 'md:row-span-2' : ''
              }`}
              style={{
                aspectRatio: index === 0 ? '3/4' : '4/3',
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Hover overlay */}
              <div
                className="absolute inset-0 bg-primary/0 group-hover:bg-primary/25 transition-colors duration-400"
                aria-hidden="true"
              />
              {/* Category label on hover */}
              <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-sans text-[0.6rem] font-bold uppercase tracking-widest text-white/90 bg-primary/70 backdrop-blur-sm px-2.5 py-1 rounded-pill">
                  {image.category === 'rooms' ? 'Rooms'
                    : image.category === 'restaurant' ? 'Dining'
                    : image.category === 'events' ? 'Exterior'
                    : 'Garden'}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <SectionWrapper className="mt-10 flex justify-center" delay={0.2}>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 rounded-btn bg-accent px-7 py-3 font-semibold text-primary shadow-btn transition-all duration-200 hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            View Full Gallery
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </SectionWrapper>

      </div>
    </section>
  );
}
