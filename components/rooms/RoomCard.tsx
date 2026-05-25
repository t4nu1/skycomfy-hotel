'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { cardHoverVariants } from '@/lib/variants';
import type { Room } from '@/types';

/* ─────────────────────────────────────────────────────────────
   Props
───────────────────────────────────────────────────────────── */
interface RoomCardProps {
  room: Room;
  variant?: 'featured' | 'full';
  /** `full` variant only — called with the clicked image index */
  onImageClick?: (index: number) => void;
}

/* ─────────────────────────────────────────────────────────────
   Featured variant
   Compact card used on the homepage (FeaturedRooms section).
   Shows: image · name · shortDescription · first 3 amenity
   chips · "View Details" + "Book Now" CTAs.
───────────────────────────────────────────────────────────── */
function FeaturedCard({ room }: { room: Room }) {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? { rest: {}, hover: {} } : cardHoverVariants;

  const visibleAmenities = room.amenities.slice(0, 3);

  return (
    <motion.article
      variants={variants}
      initial="rest"
      animate="rest"
      whileHover={prefersReducedMotion ? undefined : 'hover'}
      className="group flex flex-col rounded-card bg-surface border border-border shadow-card overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-primary">
        <Image
          src={room.images[0]}
          alt={`${room.name} at SKYCOMFY HOTEL KITALE`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {/* Price badge */}
        {room.priceFrom && (
          <div
            className="absolute bottom-3 left-3 rounded-pill font-sans text-[0.65rem] font-bold
                       text-white uppercase tracking-wider"
            style={{
              background: 'rgba(26,39,68,0.80)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.12)',
              padding: '4px 12px',
            }}
          >
            From {room.priceFrom}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 p-6 flex-1">
        <h3 className="font-serif text-xl font-semibold text-foreground leading-snug">
          {room.name}
        </h3>

        <p className="text-sm leading-relaxed text-muted line-clamp-3">
          {room.shortDescription}
        </p>

        {/* Amenity chips */}
        {visibleAmenities.length > 0 && (
          <div className="flex flex-wrap gap-2" aria-label="Room amenities">
            {visibleAmenities.map((amenity) => (
              <span
                key={amenity}
                className="inline-flex items-center rounded-pill border border-border bg-background
                           px-3 py-1 font-sans text-[0.7rem] font-medium text-muted"
              >
                {amenity}
              </span>
            ))}
            {room.amenities.length > 3 && (
              <span
                className="inline-flex items-center rounded-pill border border-accent/30 bg-accent/8
                           px-3 py-1 font-sans text-[0.7rem] font-medium text-accent"
              >
                +{room.amenities.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-2">
          <Link
            href={`/rooms/${room.slug}`}
            className="btn-primary flex-1 justify-center text-center"
          >
            View Details
          </Link>
          <Link
            href="/contact"
            className="btn-outline-dark flex-1 justify-center text-center"
          >
            Book Now
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────────────────────
   Full variant
   Detailed card used on the Rooms page.
   Shows: image gallery with thumbnails · name · fullDescription
   · full amenity list with checkmarks · "Explore Room" + "Book
   Room" CTAs.
───────────────────────────────────────────────────────────── */
function FullCard({
  room,
  onImageClick,
}: {
  room: Room;
  onImageClick?: (index: number) => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? { rest: {}, hover: {} } : cardHoverVariants;

  return (
    <motion.article
      variants={variants}
      initial="rest"
      animate="rest"
      whileHover={prefersReducedMotion ? undefined : 'hover'}
      className="group flex flex-col rounded-card bg-surface border border-border shadow-card overflow-hidden"
    >
      {/* ── Image gallery ── */}
      <div className="flex flex-col gap-3 p-4 pb-0">
        {/* Main image */}
        <button
          type="button"
          onClick={() => onImageClick?.(0)}
          className="relative aspect-[16/9] w-full overflow-hidden rounded-[calc(var(--radius-card)-4px)] bg-primary cursor-zoom-in"
          aria-label={`View ${room.name} gallery`}
        >
          <Image
            src={room.images[0]}
            alt={`${room.name} — main photo`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          {/* Overlay hint */}
          <div
            className="absolute inset-0 flex items-center justify-center bg-primary/0
                       group-hover:bg-primary/20 transition-colors duration-300"
            aria-hidden="true"
          >
            <span
              className="rounded-full bg-white/90 px-4 py-1.5 font-sans text-xs font-semibold
                         text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              View Gallery
            </span>
          </div>
        </button>

        {/* Thumbnails */}
        {room.images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1" role="list" aria-label="Room photo thumbnails">
            {room.images.map((src, idx) => (
              <button
                key={idx}
                type="button"
                role="listitem"
                onClick={() => onImageClick?.(idx)}
                className="relative h-16 w-24 shrink-0 overflow-hidden rounded-sm bg-primary
                           border-2 border-transparent hover:border-accent transition-all duration-200
                           opacity-80 hover:opacity-100 cursor-zoom-in"
                aria-label={`View photo ${idx + 1} of ${room.images.length}`}
              >
                <Image
                  src={src}
                  alt={`${room.name} photo ${idx + 1}`}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col gap-5 p-6 flex-1">
        {/* Name + price */}
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-4">
          <h3 className="font-serif text-2xl font-bold text-foreground">
            {room.name}
          </h3>
          {room.priceFrom && (
            <div className="text-right">
              <span className="font-sans text-lg font-bold text-accent">{room.priceFrom}</span>
              <span className="block font-sans text-[0.625rem] text-muted">per night</span>
            </div>
          )}
        </div>

        {/* Full description */}
        <p className="text-sm leading-relaxed text-muted">
          {room.fullDescription}
        </p>

        {/* Amenity list with checkmarks */}
        {room.amenities.length > 0 && (
          <div>
            <h4 className="font-sans text-[0.65rem] font-bold uppercase tracking-widest text-foreground/70 mb-3">
              Room Amenities
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
              {room.amenities.map((amenity) => (
                <li key={amenity} className="flex items-center gap-2.5 text-sm text-muted/90">
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15"
                    aria-hidden="true"
                  >
                    <Check size={11} className="text-accent" strokeWidth={3} />
                  </span>
                  {amenity}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-2">
          <Link
            href={`/rooms/${room.slug}`}
            className="btn-primary flex-1 justify-center text-center"
          >
            Explore Room
          </Link>
          <Link
            href="/contact"
            className="btn-outline-dark flex-1 justify-center text-center"
          >
            Book Room
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────────────────────
   Public export — dispatches to the correct variant
───────────────────────────────────────────────────────────── */
export default function RoomCard({
  room,
  variant = 'featured',
  onImageClick,
}: RoomCardProps) {
  if (variant === 'full') {
    return <FullCard room={room} onImageClick={onImageClick} />;
  }
  return <FeaturedCard room={room} />;
}
