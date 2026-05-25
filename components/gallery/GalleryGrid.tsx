'use client';

import { motion, useReducedMotion } from 'framer-motion';
import GalleryImage from '@/components/gallery/GalleryImage';
import { staggerContainerVariants, staggerItemVariants } from '@/lib/variants';
import type { GalleryImage as GalleryImageType } from '@/types';

interface GalleryGridProps {
  images: GalleryImageType[];
  onImageClick: (index: number) => void;
}

export default function GalleryGrid({ images, onImageClick }: GalleryGridProps) {
  const prefersReducedMotion = useReducedMotion();

  if (images.length === 0) return null;

  return (
    <motion.div
      variants={prefersReducedMotion ? undefined : staggerContainerVariants}
      initial="hidden"
      animate="visible"
      className="columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4"
    >
      {images.map((image, index) => (
        <motion.div
          key={image.id}
          variants={prefersReducedMotion ? undefined : staggerItemVariants}
          className="relative mb-3 sm:mb-4 overflow-hidden rounded-card break-inside-avoid"
          style={{ aspectRatio: `${image.width} / ${image.height}` }}
        >
          <GalleryImage
            image={image}
            index={index}
            onClick={onImageClick}
            priority={false}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
