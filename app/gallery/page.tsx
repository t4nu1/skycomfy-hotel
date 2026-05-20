'use client';

import Image from 'next/image';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryImages } from '@/constants/gallery';
import PageFadeIn from '@/components/ui/PageFadeIn';
import SectionWrapper from '@/components/ui/SectionWrapper';

type FilterCategory = 'all' | 'rooms' | 'restaurant' | 'events' | 'garden';

const categories: { label: string; value: FilterCategory }[] = [
  { label: 'All Photos', value: 'all' },
  { label: 'Rooms & Suites', value: 'rooms' },
  { label: 'Restaurant & Bar', value: 'restaurant' },
  { label: 'Meetings & Events', value: 'events' },
  { label: 'Lush Gardens', value: 'garden' },
];

export default function GalleryPage() {
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter gallery items dynamically
  const filteredImages = useMemo(() => {
    if (selectedFilter === 'all') return galleryImages;
    return galleryImages.filter((img) => img.category === selectedFilter);
  }, [selectedFilter]);

  // Lightbox controls
  const handlePrevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === 0 ? filteredImages.length - 1 : (prev ?? 0) - 1));
  };

  const handleNextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === filteredImages.length - 1 ? 0 : (prev ?? 0) + 1));
  };

  return (
    <PageFadeIn>
      {/* 1. HERO HEADER */}
      <section className="relative h-[35vh] min-h-[250px] flex items-center justify-center bg-primary text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600"
            alt="Skycomfy bar and dining lounge background"
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
            Visual Journey
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
          >
            Our Gallery
          </motion.h1>
        </div>
      </section>

      {/* 2. GALLERY INTERACTIVE VIEWPORTS */}
      <section className="bg-background py-16 px-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Tabs / Filters */}
          <SectionWrapper direction="up">
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12 border-b border-border pb-6">
              {categories.map((cat) => {
                const isActive = selectedFilter === cat.value;
                return (
                  <button
                    key={cat.value}
                    onClick={() => {
                      setSelectedFilter(cat.value);
                      setLightboxIndex(null); // Reset lightbox bounds
                    }}
                    className={`relative font-sans text-xs md:text-sm font-semibold px-4 py-2.5 rounded-btn transition-colors duration-200 cursor-pointer ${
                      isActive ? 'text-primary bg-accent' : 'text-muted hover:text-primary bg-surface border border-border'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </SectionWrapper>

          {/* Photo Grid with animated Framer Motion layout transitions */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((img, idx) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setLightboxIndex(idx)}
                  className="relative aspect-[4/3] w-full rounded-card overflow-hidden group bg-primary shadow-card cursor-pointer"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                  {/* Glassmorphic hover details */}
                  <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-10">
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-white flex flex-col gap-1">
                        <span className="font-sans text-[10px] text-accent uppercase font-bold tracking-widest">
                          {img.category}
                        </span>
                        <p className="font-serif text-sm font-semibold leading-tight line-clamp-2">
                          {img.alt}
                        </p>
                      </div>
                      <div className="h-9 w-9 bg-accent text-primary rounded-full flex items-center justify-center shrink-0">
                        <Maximize2 size={16} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* 3. LIGHTBOX MODAL OVERLAY */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 cursor-zoom-out"
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              aria-label="Close image slideshow"
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-accent text-white hover:text-primary rounded-full transition-colors duration-200 z-50 cursor-pointer"
            >
              <X size={24} />
            </button>

            {/* Slider container */}
            <div className="relative w-full max-w-4xl aspect-[4/3] flex items-center justify-center overflow-hidden">
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="relative w-full h-full"
                onClick={(e) => e.stopPropagation()} // Stop overlay closing when clicking actual image
              >
                <Image
                  src={filteredImages[lightboxIndex].src}
                  alt={filteredImages[lightboxIndex].alt}
                  fill
                  className="object-contain"
                />
              </motion.div>

              {/* Slider Arrows */}
              <button
                type="button"
                onClick={handlePrevImage}
                aria-label="Previous slide"
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 hover:bg-accent text-white hover:text-primary rounded-full transition-all duration-200 border border-white/10 z-40 cursor-pointer"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
                onClick={handleNextImage}
                aria-label="Next slide"
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 hover:bg-accent text-white hover:text-primary rounded-full transition-all duration-200 border border-white/10 z-40 cursor-pointer"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Slide Title / Alt */}
            <div className="text-center mt-6 text-white max-w-xl px-4 z-40 select-none">
              <p className="font-serif text-base font-medium">
                {filteredImages[lightboxIndex].alt}
              </p>
              <span className="font-sans text-xs text-white/50 block mt-2">
                Image {lightboxIndex + 1} of {filteredImages.length} ({filteredImages[lightboxIndex].category.toUpperCase()})
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageFadeIn>
  );
}
