'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Maximize2 } from 'lucide-react';
import type { GalleryImage as GalleryImageType } from '@/types';

interface GalleryImageProps {
  image: GalleryImageType;
  index: number;
  onClick: (index: number) => void;
  priority?: boolean;
}

export default function GalleryImage({
  image,
  index,
  onClick,
  priority = false,
}: GalleryImageProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onClick(index)}
      className="group relative cursor-pointer overflow-hidden rounded-card"
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
        {...(priority ? { priority: true } : {})}
      />

      {/* Hover overlay with zoom icon */}
      <div
        className="absolute inset-0 flex items-center justify-center bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        aria-hidden="true"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-primary shadow-float">
          <Maximize2 size={20} />
        </div>
      </div>
    </motion.div>
  );
}
