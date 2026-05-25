'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, ArrowRight, MessageCircle } from 'lucide-react';
import { rooms } from '@/constants/rooms';
import Lightbox from '@/components/gallery/Lightbox';
import SectionWrapper from '@/components/ui/SectionWrapper';
import type { GalleryImage } from '@/types';

/* ─────────────────────────────────────────────────────────────
   Lightbox state
───────────────────────────────────────────────────────────── */
interface LightboxState {
  isOpen: boolean;
  currentIndex: number;
  roomId: string;
}

const CLOSED_STATE: LightboxState = { isOpen: false, currentIndex: 0, roomId: '' };

/* ─────────────────────────────────────────────────────────────
   Single editorial room row — alternating layout
───────────────────────────────────────────────────────────── */
function RoomRow({
  room,
  index,
  onImageClick,
}: {
  room: (typeof rooms)[0];
  index: number;
  onImageClick: (roomId: string, imageIndex: number) => void;
}) {
  const isEven = index % 2 === 0;

  return (
    <SectionWrapper direction="up" delay={index * 0.05}>
      <article
        className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-card overflow-hidden shadow-card border border-border bg-surface"
        aria-label={room.name}
      >
        {/* ── Image column — alternates left/right ── */}
        <div
          className={`relative aspect-[4/3] lg:aspect-auto lg:min-h-[420px] overflow-hidden bg-primary group cursor-zoom-in ${
            isEven ? 'lg:order-1' : 'lg:order-2'
          }`}
          onClick={() => onImageClick(room.id, 0)}
          role="button"
          tabIndex={0}
          aria-label={`View ${room.name} photo gallery`}
          onKeyDown={(e) => e.key === 'Enter' && onImageClick(room.id, 0)}
        >
          <Image
            src={room.images[0]}
            alt={`${room.name} at SKYCOMFY HOTEL KITALE`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* Price badge */}
          {room.priceFrom && (
            <div
              className="absolute top-4 left-4 font-sans text-[0.65rem] font-bold text-white uppercase tracking-wider rounded-pill"
              style={{
                background: 'rgba(26,39,68,0.82)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.12)',
                padding: '5px 14px',
              }}
            >
              From {room.priceFrom}
            </div>
          )}
          {/* Thumbnail strip */}
          {room.images.length > 1 && (
            <div className="absolute bottom-3 right-3 flex gap-1.5">
              {room.images.map((src, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); onImageClick(room.id, idx); }}
                  className={`relative w-10 h-8 rounded overflow-hidden border-2 transition-all duration-200 ${
                    idx === 0 ? 'border-accent' : 'border-white/30 hover:border-white/70'
                  }`}
                  aria-label={`View photo ${idx + 1}`}
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="40px" />
                </button>
              ))}
            </div>
          )}
          {/* Hover zoom hint */}
          <div
            className="absolute inset-0 flex items-center justify-center bg-primary/0 group-hover:bg-primary/15 transition-colors duration-300"
            aria-hidden="true"
          >
            <span className="font-sans text-xs font-semibold text-white bg-primary/70 backdrop-blur-sm px-4 py-1.5 rounded-pill opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              View Gallery
            </span>
          </div>
        </div>

        {/* ── Content column ── */}
        <div
          className={`flex flex-col justify-center gap-6 p-8 md:p-10 ${
            isEven ? 'lg:order-2' : 'lg:order-1'
          }`}
        >
          {/* Room type label */}
          <span className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.2em] text-accent">
            {index === 0 ? 'Standard' : index === 1 ? 'Deluxe' : 'Executive Suite'}
          </span>

          <div className="flex flex-col gap-3">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground leading-tight">
              {room.name}
            </h3>
            <div className="w-10 h-0.5 bg-accent rounded-full" aria-hidden="true" />
          </div>

          <p className="font-sans text-sm md:text-base text-muted leading-relaxed">
            {room.fullDescription}
          </p>

          {/* Amenities */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
            {room.amenities.map((amenity) => (
              <li key={amenity} className="flex items-center gap-2.5 font-sans text-sm text-muted/90">
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

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href={`/rooms/${room.slug}`}
              className="btn-primary inline-flex items-center gap-2 flex-1 justify-center"
            >
              View Details
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
            <a
              href={`https://wa.me/254747118328?text=${encodeURIComponent(`Hello SKYCOMFY HOTEL KITALE, I would like to enquire about the ${room.name}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-dark inline-flex items-center gap-2 flex-1 justify-center"
            >
              <MessageCircle size={14} aria-hidden="true" />
              Book via WhatsApp
            </a>
          </div>
        </div>
      </article>
    </SectionWrapper>
  );
}

/* ─────────────────────────────────────────────────────────────
   RoomsClient — manages lightbox state, renders editorial rows
───────────────────────────────────────────────────────────── */
export default function RoomsClient() {
  const [lightboxState, setLightboxState] = useState<LightboxState>(CLOSED_STATE);

  const activeRoom = rooms.find((r) => r.id === lightboxState.roomId);
  const lightboxImages: GalleryImage[] = activeRoom
    ? activeRoom.images.map((src, idx) => ({
        id: `${activeRoom.id}-${idx}`,
        src,
        alt: `${activeRoom.name} — photo ${idx + 1}`,
        category: 'rooms',
        width: 400,
        height: 300,
      }))
    : [];

  const handleImageClick = useCallback(
    (roomId: string, imageIndex: number) => {
      setLightboxState({ isOpen: true, currentIndex: imageIndex, roomId });
    },
    []
  );

  const handleClose = useCallback(() => setLightboxState(CLOSED_STATE), []);

  const handlePrev = useCallback(() => {
    setLightboxState((prev) => ({
      ...prev,
      currentIndex: prev.currentIndex === 0 ? lightboxImages.length - 1 : prev.currentIndex - 1,
    }));
  }, [lightboxImages.length]);

  const handleNext = useCallback(() => {
    setLightboxState((prev) => ({
      ...prev,
      currentIndex: prev.currentIndex === lightboxImages.length - 1 ? 0 : prev.currentIndex + 1,
    }));
  }, [lightboxImages.length]);

  return (
    <>
      <section
        className="bg-background py-section-sm"
        aria-labelledby="rooms-listing-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <SectionWrapper direction="up">
            <div className="text-center max-w-2xl mx-auto mb-14 flex flex-col items-center gap-4">
              <span className="font-sans text-xs md:text-sm font-semibold tracking-wider text-accent uppercase">
                Accommodations
              </span>
              <h2
                id="rooms-listing-heading"
                className="font-serif text-3xl md:text-4xl font-bold text-foreground"
              >
                Choose Your Perfect Room
              </h2>
              <div className="w-16 h-1 bg-accent rounded-full" aria-hidden="true" />
              <p className="font-sans text-sm md:text-base text-muted leading-relaxed">
                Three thoughtfully designed room types — each photographed here at
                SKYCOMFY HOTEL KITALE. Every space is crafted for comfort, privacy,
                and a genuinely restful stay.
              </p>
            </div>
          </SectionWrapper>

          {/* Editorial alternating room rows */}
          <div className="flex flex-col gap-8">
            {rooms.map((room, idx) => (
              <RoomRow
                key={room.id}
                room={room}
                index={idx}
                onImageClick={handleImageClick}
              />
            ))}
          </div>

        </div>
      </section>

      <Lightbox
        images={lightboxImages}
        currentIndex={lightboxState.currentIndex}
        isOpen={lightboxState.isOpen}
        onClose={handleClose}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </>
  );
}
