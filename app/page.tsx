'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BedDouble, Trees, UtensilsCrossed, CalendarDays, ArrowRight, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { rooms } from '@/constants/rooms';
import { services } from '@/constants/services';
import { testimonials } from '@/constants/testimonials';
import ServiceCard from '@/components/cards/ServiceCard';
import TestimonialCard from '@/components/cards/TestimonialCard';
import SectionWrapper from '@/components/ui/SectionWrapper';
import PageFadeIn from '@/components/ui/PageFadeIn';
import CTASection from '@/components/ui/CTASection';

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Auto-advance testimonials every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <PageFadeIn>
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] min-h-[600px] flex items-center justify-center overflow-hidden bg-primary">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1600"
            alt="Skycomfy Hotel premium room accommodation"
            fill
            priority
            className="object-cover object-center brightness-[0.65] contrast-[1.05]"
          />
          {/* Theme overlay fromGlobals */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/65" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-sans text-xs md:text-sm font-semibold tracking-[0.25em] text-accent uppercase mb-4"
          >
            Welcome to SKYCOMFY HOTEL KITALE
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1] max-w-4xl"
          >
            Comfort Meets Elegance in the Heart of Kitale
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="font-sans text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mb-10 leading-relaxed"
          >
            Experience premium accommodations, delectable local and international cuisine, fully equipped conference centers, and serene garden wedding settings.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link
              href="/rooms"
              className="inline-flex items-center justify-center px-8 py-3 bg-accent text-primary font-sans font-semibold text-sm rounded-btn shadow-btn hover:bg-accent-light transition-all duration-200"
            >
              Explore Our Rooms
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-white/70 hover:border-white text-white font-sans font-semibold text-sm rounded-btn hover:bg-white/5 transition-all duration-200"
            >
              Book Your Stay
            </Link>
          </motion.div>
        </div>

        {/* Scroll down mouse animation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/50 text-xs tracking-widest font-sans">
          <span>SCROLL</span>
          <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-1 h-1.5 bg-accent rounded-full"
            />
          </div>
        </div>
      </section>

      {/* 2. ABOUT PREVIEW SECTION */}
      <section className="bg-background py-20 px-4 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image stack (visual beauty) */}
            <SectionWrapper direction="left">
              <div className="relative group rounded-card overflow-hidden shadow-card aspect-[4/3] lg:aspect-[1.1] w-full">
                <Image
                  src="https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=800"
                  alt="Cozy garden pathways at Skycomfy Hotel"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/0 transition-colors duration-300" />
              </div>
            </SectionWrapper>

            {/* Text description */}
            <SectionWrapper direction="right">
              <div className="flex flex-col gap-6">
                <span className="font-sans text-xs md:text-sm font-semibold tracking-wider text-accent uppercase">
                  A Sanctuary of Serenity
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  Discover a True Oasis in Kitale
                </h2>
                <div className="w-16 h-1 bg-accent rounded-full" />
                <p className="font-sans text-sm md:text-base text-muted leading-relaxed">
                  Located off the Kitale-Kapenguria Highway, <strong>SKYCOMFY HOTEL KITALE</strong> offers a peaceful and luxurious escape from the hustle of city life. We offer a space where comfort, modern convenience, and the warmth of Kenyan hospitality merge.
                </p>
                <p className="font-sans text-sm md:text-base text-muted leading-relaxed">
                  Whether you are visiting for business, planning a dynamic corporate conference, exploring scenic tourism, or looking to tie the knot in our gorgeous lush gardens, our team is committed to making your stay flawless.
                </p>
                <div className="flex flex-wrap gap-6 mt-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <BedDouble size={20} />
                    </div>
                    <span className="font-sans text-sm font-semibold text-foreground">Cozy Rooms</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <UtensilsCrossed size={20} />
                    </div>
                    <span className="font-sans text-sm font-semibold text-foreground">Fine Dining</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <Trees size={20} />
                    </div>
                    <span className="font-sans text-sm font-semibold text-foreground">Lush Gardens</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-accent hover:text-accent-light font-sans font-semibold text-sm transition-colors duration-200 group"
                  >
                    Learn More About Us
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </SectionWrapper>
          </div>
        </div>
      </section>

      {/* 3. FEATURED ROOMS SECTION */}
      <section className="bg-surface py-20 md:py-28 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionWrapper direction="up">
            <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-4">
              <span className="font-sans text-xs md:text-sm font-semibold tracking-wider text-accent uppercase">
                Premium Stays
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                Our Luxurious Rooms & Suites
              </h2>
              <div className="w-16 h-1 bg-accent rounded-full" />
              <p className="font-sans text-sm md:text-base text-muted">
                Each room is meticulously designed to offer a peaceful haven, boasting premium linens, modern en-suite amenities, and scenic regional views.
              </p>
            </div>
          </SectionWrapper>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rooms.map((room, index) => (
              <SectionWrapper key={room.id} direction="up" delay={index * 0.15}>
                <article className="flex flex-col h-full bg-background rounded-card border border-border overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group">
                  {/* Image container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-primary">
                    <Image
                      src={room.images[0]}
                      alt={room.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 bg-accent text-primary px-3 py-1 font-sans text-xs font-bold rounded-pill shadow-sm">
                      {room.priceFrom}
                    </div>
                  </div>

                  {/* Room Details */}
                  <div className="flex flex-col flex-grow p-6">
                    <h3 className="font-serif text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-200">
                      {room.name}
                    </h3>
                    <p className="font-sans text-xs md:text-sm text-muted leading-relaxed flex-grow mb-5">
                      {room.shortDescription}
                    </p>

                    {/* Key amenities icons */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {room.amenities.slice(0, 3).map((amenity) => (
                        <span
                          key={amenity}
                          className="font-sans text-[11px] bg-primary/5 text-primary/80 px-2 py-0.5 rounded-sm"
                        >
                          {amenity}
                        </span>
                      ))}
                      {room.amenities.length > 3 && (
                        <span className="font-sans text-[11px] bg-primary/5 text-primary/80 px-2 py-0.5 rounded-sm">
                          +{room.amenities.length - 3} More
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between border-t border-border pt-4 mt-auto">
                      <Link
                        href={`/rooms/${room.slug}`}
                        className="font-sans text-xs font-semibold text-primary hover:text-accent transition-colors duration-200"
                      >
                        View Details
                      </Link>
                      <Link
                        href="/contact"
                        className="font-sans text-xs font-bold text-accent hover:text-accent-light flex items-center gap-1 transition-colors duration-200"
                      >
                        Book Now
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </article>
              </SectionWrapper>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/rooms"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white hover:bg-primary-light font-sans font-semibold text-sm rounded-btn transition-colors duration-200"
            >
              See All Accommodations
            </Link>
          </div>
        </div>
      </section>

      {/* 4. SERVICES SECTION */}
      <section className="bg-background py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionWrapper direction="up">
            <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-4">
              <span className="font-sans text-xs md:text-sm font-semibold tracking-wider text-accent uppercase">
                What We Offer
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                Exceptional Amenities & Experiences
              </h2>
              <div className="w-16 h-1 bg-accent rounded-full" />
              <p className="font-sans text-sm md:text-base text-muted">
                From cozy garden bonfire evenings to state-of-the-art business conferences, we tailor our amenities to your ultimate comfort.
              </p>
            </div>
          </SectionWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {services.map((service, index) => (
              <SectionWrapper key={service.id} direction="up" delay={index * 0.1}>
                <ServiceCard service={service} />
              </SectionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS SECTION */}
      <section className="bg-primary text-white py-20 md:py-28 overflow-hidden relative">
        {/* Subtle decorative background circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-accent/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionWrapper direction="up">
            <div className="text-center flex flex-col items-center gap-4 mb-12">
              <span className="font-sans text-xs md:text-sm font-semibold tracking-wider text-accent uppercase">
                Guest Reviews
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold">
                Loved by Our Guests
              </h2>
              <div className="w-16 h-1 bg-accent rounded-full" />
            </div>
          </SectionWrapper>

          {/* Testimonial Active Display Card with Fade transitions */}
          <SectionWrapper direction="none">
            <div className="relative bg-white/5 border border-white/10 rounded-card p-8 md:p-12 text-center flex flex-col items-center min-h-[250px] justify-center">
              <Star className="text-accent fill-accent w-8 h-8 mb-6" />

              <div className="relative flex-grow">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <blockquote className="font-serif text-lg md:text-xl leading-relaxed italic max-w-2xl">
                      &ldquo;{testimonials[activeTestimonial].text}&rdquo;
                    </blockquote>
                    <cite className="font-sans text-xs md:text-sm font-semibold text-accent not-italic">
                      — {testimonials[activeTestimonial].guestName}
                    </cite>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Slider pagination indicators */}
              <div className="flex items-center gap-2 mt-8">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      i === activeTestimonial ? 'bg-accent w-6' : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>

              {/* Slider Navigation Arrows */}
              <div className="absolute top-1/2 -translate-y-1/2 left-2 md:-left-16">
                <button
                  type="button"
                  onClick={handlePrevTestimonial}
                  aria-label="Previous testimonial"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-accent hover:text-primary transition-all duration-200 border border-white/15"
                >
                  <ChevronLeft size={20} />
                </button>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 right-2 md:-right-16">
                <button
                  type="button"
                  onClick={handleNextTestimonial}
                  aria-label="Next testimonial"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-accent hover:text-primary transition-all duration-200 border border-white/15"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* 6. CALL TO ACTION SECTION */}
      <CTASection />
    </PageFadeIn>
  );
}
