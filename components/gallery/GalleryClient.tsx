'use client';

import { useState, useMemo, useCallback } from 'react';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import Lightbox from '@/components/gallery/Lightbox';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { galleryImages } from '@/constants/gallery';
import type { GalleryImage } from '@/types';

type FilterCategory = 'all' | 'rooms' | 'restaurant' | 'events' | 'garden';

const categories: { label: string; value: FilterCategory }[] = [
  { label: 'All Photos', value: 'all' },
  { label: 'Rooms & Suites', value: 'rooms' },
  { label: 'Restaurant & Bar', value: 'restaurant' },
  { label: 'Meetings & Events', value: 'events' },
  { label: 'Lush Gardens', value: 'garden' },
];

/**
 * GalleryClient
 * Client island that manages category filter state and lightbox state.
 * Renders category pill tabs, GalleryGrid, and Lightbox.
 * Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6
 */
export default function GalleryClient() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number>(-1);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const filteredImages: GalleryImage[] = useMemo(() => {
    if (activeCategory === 'all') return galleryImages;
    return galleryImages.filter((img) => img.category === activeCategory);
  }, [activeCategory]);

  const handleImageClick = useCallback((index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsLightboxOpen(false);
    setLightboxIndex(-1);
  }, []);

  const handlePrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev <= 0 ? filteredImages.length - 1 : prev - 1
    );
  }, [filteredImages.length]);

  const handleNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev >= filteredImages.length - 1 ? 0 : prev + 1
    );
  }, [filteredImages.length]);

  const handleCategoryChange = (category: FilterCategory) => {
    setActiveCategory(category);
    // Close lightbox when switching categories to avoid index out-of-bounds
    setIsLightboxOpen(false);
    setLightboxIndex(-1);
  };

  return (
    <section className="bg-background py-16 px-4" aria-label="Photo gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Category filter tabs ── */}
        <SectionWrapper direction="up">
          <div
            className="flex flex-wrap items-center justify-center gap-2 mb-12 border-b border-border pb-6"
            role="tablist"
            aria-label="Filter gallery by category"
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleCategoryChange(cat.value)}
                  className={`font-sans text-xs md:text-sm font-semibold px-4 py-2.5 rounded-pill transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    isActive
                      ? 'text-primary bg-accent'
                      : 'text-muted hover:text-primary bg-surface border border-border hover:border-accent'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </SectionWrapper>

        {/* ── Gallery grid ── */}
        <GalleryGrid images={filteredImages} onImageClick={handleImageClick} />

      </div>

      {/* ── Lightbox ── */}
      <Lightbox
        images={filteredImages}
        currentIndex={lightboxIndex}
        isOpen={isLightboxOpen}
        onClose={handleClose}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
}
