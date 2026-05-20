'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Calendar, Users, Calculator, ArrowLeft, Heart, Sparkles, MessageCircle } from 'lucide-react';
import { rooms } from '@/constants/rooms';
import PageFadeIn from '@/components/ui/PageFadeIn';
import SectionWrapper from '@/components/ui/SectionWrapper';

const WHATSAPP_NUMBER = '254747118328';

export default function RoomDetails() {
  const params = useParams();
  const slug = params?.slug as string;

  // Resolve active room
  const room = useMemo(() => {
    return rooms.find((r) => r.slug === slug);
  }, [slug]);

  // Gallery state
  const [activeImage, setActiveImage] = useState(0);

  // Date selection state
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guestCount, setGuestCount] = useState('1');

  // Parse price number safely (e.g. "KES 6,500/night" -> 6500)
  const priceNumeric = useMemo(() => {
    if (!room?.priceFrom) return 0;
    const match = room.priceFrom.match(/[\d,]+/);
    if (!match) return 0;
    return parseInt(match[0].replace(/,/g, ''), 10);
  }, [room]);

  // Calculate stays duration and totals
  const stayCalculations = useMemo(() => {
    if (!checkIn || !checkOut || priceNumeric === 0) {
      return { nights: 0, total: 0 };
    }
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const diffTime = d2.getTime() - d1.getTime();
    if (diffTime <= 0) return { nights: 0, total: 0 };

    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const total = nights * priceNumeric;
    return { nights, total };
  }, [checkIn, checkOut, priceNumeric]);

  // Pre-filled WhatsApp message
  const whatsappUrl = useMemo(() => {
    if (!room) return '#';
    let textMessage = `Hello SKYCOMFY HOTEL KITALE, I would like to make an inquiry for the *${room.name}*.`;

    if (checkIn && checkOut) {
      textMessage += `\n\n🗓️ Stay Dates: ${checkIn} to ${checkOut} (${stayCalculations.nights} Nights)`;
      textMessage += `\n👥 Guests: ${guestCount}`;
      if (stayCalculations.total > 0) {
        textMessage += `\n💰 Estimated Cost: KES ${stayCalculations.total.toLocaleString()}`;
      }
    } else {
      textMessage += `\n\nCould you please confirm availability and provide details for my upcoming visit?`;
    }

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(textMessage)}`;
  }, [room, checkIn, checkOut, guestCount, stayCalculations]);

  // 404 Room not found page
  if (!room) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-background px-4">
        <div className="bg-surface rounded-card border border-border p-8 text-center max-w-md w-full shadow-card flex flex-col items-center gap-6">
          <div className="h-16 w-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>
          <h1 className="font-serif text-2xl font-bold text-foreground">Room Not Found</h1>
          <p className="font-sans text-sm text-muted">
            The room tier you are searching for does not exist or has been modified.
          </p>
          <Link
            href="/rooms"
            className="w-full py-2.5 bg-primary text-white hover:bg-primary-light font-sans font-semibold text-sm rounded-btn transition-colors duration-200"
          >
            Back to Accommodations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <PageFadeIn>
      <div className="bg-background py-10 px-4 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb / Back button */}
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 text-primary hover:text-accent font-sans text-xs md:text-sm font-semibold mb-8 group transition-colors duration-200"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to Rooms & Suites
          </Link>

          {/* TWO-COLUMN LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* LEFT COLUMN: Gallery & Full Specs (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              {/* Photo Display Card */}
              <div className="flex flex-col gap-4">
                <div className="relative aspect-[4/3] w-full bg-primary rounded-card overflow-hidden shadow-card">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeImage}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={room.images[activeImage]}
                        alt={`${room.name} active display`}
                        fill
                        priority
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                  
                  {/* Luxury highlights badge */}
                  <div className="absolute top-4 left-4 bg-primary/70 backdrop-blur-sm border border-accent/20 text-accent text-xs font-sans px-3 py-1 font-bold rounded-pill flex items-center gap-1 shadow-sm">
                    <Sparkles size={12} className="fill-accent" />
                    Premium Comfort
                  </div>
                </div>

                {/* Thumbnails row */}
                <div className="flex items-center gap-3">
                  {room.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`relative w-20 h-16 rounded-sm overflow-hidden bg-primary shrink-0 transition-all duration-200 border-2 ${
                        idx === activeImage ? 'border-accent shadow-sm' : 'border-transparent opacity-75 hover:opacity-100'
                      }`}
                    >
                      <Image src={img} alt={`Room detail ${idx}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Description Card */}
              <div className="bg-surface rounded-card border border-border p-6 md:p-8 shadow-card flex flex-col gap-5">
                <h1 className="font-serif text-3xl font-bold text-foreground">
                  {room.name}
                </h1>
                <p className="font-sans text-sm md:text-base text-muted leading-relaxed">
                  {room.fullDescription}
                </p>
                <p className="font-sans text-sm md:text-base text-muted leading-relaxed">
                  Every square foot of our accommodation is engineered for deep restoration. Snuggle in a soft bed featuring clean cotton sheets and soundproofed walls that shield you from regional noise. Daily housekeeping keeps your room fresh, and full high-speed Wi-Fi handles all your streamings and business communications.
                </p>

                {/* Amenities Listing */}
                <div className="border-t border-border pt-6 mt-2">
                  <h3 className="font-serif text-lg font-bold text-foreground mb-4">
                    Exclusive Suite Features
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {room.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-3 font-sans text-sm text-muted">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/15 text-accent shrink-0">
                          <Check size={12} strokeWidth={3} />
                        </div>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Sticky Reservation card (5 Cols) */}
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <div className="bg-primary text-white rounded-card border border-primary-light p-6 md:p-8 shadow-card flex flex-col gap-6">
                
                {/* Header pricing */}
                <div className="border-b border-white/10 pb-4">
                  <span className="font-sans text-xs text-white/60 block">Price Per Night</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-sans text-2xl md:text-3xl font-bold text-accent">
                      {room.priceFrom}
                    </span>
                  </div>
                </div>

                {/* Booking Inputs Form */}
                <div className="flex flex-col gap-4">
                  
                  {/* Check In Date */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="check-in-date" className="font-sans text-xs font-semibold text-white/80">
                      Check-In Date
                    </label>
                    <div className="relative">
                      <input
                        id="check-in-date"
                        type="date"
                        value={checkIn}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full bg-primary-light border border-white/10 focus:border-accent rounded-btn py-2.5 pl-4 pr-10 text-sm font-sans text-white focus:outline-none transition-colors"
                      />
                      <Calendar size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
                    </div>
                  </div>

                  {/* Check Out Date */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="check-out-date" className="font-sans text-xs font-semibold text-white/80">
                      Check-Out Date
                    </label>
                    <div className="relative">
                      <input
                        id="check-out-date"
                        type="date"
                        value={checkOut}
                        min={checkIn ? new Date(new Date(checkIn).getTime() + 86400000).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full bg-primary-light border border-white/10 focus:border-accent rounded-btn py-2.5 pl-4 pr-10 text-sm font-sans text-white focus:outline-none transition-colors"
                      />
                      <Calendar size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
                    </div>
                  </div>

                  {/* Guest Dropdown */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="guest-select" className="font-sans text-xs font-semibold text-white/80">
                      Guests Count
                    </label>
                    <div className="relative">
                      <select
                        id="guest-select"
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        className="w-full bg-primary-light border border-white/10 focus:border-accent rounded-btn py-2.5 px-4 text-sm font-sans text-white focus:outline-none transition-colors appearance-none cursor-pointer"
                      >
                        <option value="1" className="bg-primary text-white">1 Guest</option>
                        <option value="2" className="bg-primary text-white">2 Guests</option>
                        <option value="3" className="bg-primary text-white">3 Guests</option>
                        <option value="4" className="bg-primary text-white">4+ Guests</option>
                      </select>
                      <Users size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
                    </div>
                  </div>

                </div>

                {/* Calculation Screen */}
                {stayCalculations.nights > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-primary-light/50 border border-white/5 rounded-btn p-4 flex flex-col gap-2.5 overflow-hidden"
                  >
                    <div className="flex items-center justify-between text-xs text-white/60">
                      <span>Rate Per Night</span>
                      <span>KES {priceNumeric.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-white/60">
                      <span>Stay Duration</span>
                      <span>{stayCalculations.nights} Nights</span>
                    </div>
                    <div className="border-t border-white/10 pt-2.5 mt-1 flex items-center justify-between font-sans text-sm font-bold">
                      <span className="flex items-center gap-1">
                        <Calculator size={14} className="text-accent" />
                        Est. Total
                      </span>
                      <span className="text-accent">
                        KES {stayCalculations.total.toLocaleString()}
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* Reservation Action Button */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-accent hover:bg-accent-light text-primary font-sans font-bold text-sm rounded-btn shadow-btn flex items-center justify-center gap-2 transition-colors duration-200"
                >
                  <MessageCircle size={16} className="fill-primary text-primary" />
                  Book via WhatsApp
                </a>

                <p className="font-sans text-[11px] text-white/50 text-center leading-relaxed">
                  Booking button will redirect you directly to our reservation line with check-in parameters ready. No payment required up-front.
                </p>

              </div>
            </div>

          </div>
        </div>
      </div>
    </PageFadeIn>
  );
}
