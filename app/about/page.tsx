import type { Metadata } from 'next';
import Image from 'next/image';
import { ShieldCheck, HeartHandshake, Compass, Users } from 'lucide-react';
import PageFadeIn from '@/components/ui/PageFadeIn';
import SectionWrapper from '@/components/ui/SectionWrapper';
import CTASection from '@/components/ui/CTASection';
import InnerPageHero from '@/components/ui/InnerPageHero';

/* ─────────────────────────────────────────────────────────────
   Page metadata — Requirements 19.1, 19.2, 19.3
───────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Discover the story, values, and hospitality philosophy behind SKYCOMFY HOTEL KITALE — a premier hotel off the Kitale-Kapenguria Highway in Trans-Nzoia County, Kenya.',
  openGraph: {
    title: 'About SKYCOMFY HOTEL KITALE — Our Story & Values',
    description:
      'Learn about our heritage of warm Kenyan hospitality, exceptional dining, serene garden events, and comfortable accommodation in Kitale, Kenya.',
    url: 'https://www.skycomfyhotel.co.ke/about',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SKYCOMFY HOTEL KITALE — About Us',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About SKYCOMFY HOTEL KITALE',
    description:
      'Our story, values, and hospitality philosophy — premium hotel in Kitale, Kenya.',
    images: ['/og-image.jpg'],
  },
};

/* ─────────────────────────────────────────────────────────────
   Static data
───────────────────────────────────────────────────────────── */
const pillars = [
  {
    icon: HeartHandshake,
    title: 'Warm Kenyan Hospitality',
    description:
      'We treat every guest like family. Our team is dedicated to providing personalised service with a genuine Kenyan smile from the moment you arrive.',
  },
  {
    icon: ShieldCheck,
    title: 'Uncompromised Comfort',
    description:
      'Our rooms and common spaces are crafted to offer premium comfort, blending contemporary elegance with cosy home touches for a restful stay.',
  },
  {
    icon: Compass,
    title: 'Peaceful Natural Spaces',
    description:
      'Nestled amidst lush botanical surroundings, our quiet gardens and outdoor bonfires offer a restorative sanctuary away from the city.',
  },
  {
    icon: Users,
    title: 'Community & Connection',
    description:
      'We serve as a hub for celebrations, business events, family gatherings, and community milestones across Trans-Nzoia County.',
  },
];

/* ─────────────────────────────────────────────────────────────
   About Page — Server Component
   Requirements: 13.1, 13.2, 13.3, 13.4, 19.1, 19.2, 19.3
───────────────────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <PageFadeIn>
      {/* ── 1. INNER-PAGE HERO BANNER ── */}
      <InnerPageHero
        eyebrow="Who We Are"
        title="Our Story &amp; Values"
        imageSrc="/images/exterior/hotel-exterior-01.jpg"
        imageAlt="SKYCOMFY HOTEL KITALE exterior — real hotel in Kitale, Kenya"
      />

      {/* ── 2. OUR STORY ── */}
      <section
        className="bg-background py-16 md:py-24"
        aria-labelledby="our-story-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text */}
            <SectionWrapper direction="left">
              <div className="flex flex-col gap-6">
                <span className="font-sans text-xs md:text-sm font-semibold tracking-wider text-accent uppercase">
                  Heritage of Hospitality
                </span>
                <h2
                  id="our-story-heading"
                  className="font-serif text-3xl md:text-4xl font-bold text-foreground"
                >
                  Where Comfort Meets Elegance in Kitale
                </h2>
                <div className="w-16 h-1 bg-accent rounded-full" aria-hidden="true" />
                <p className="font-sans text-sm md:text-base text-muted leading-relaxed">
                  Founded with the vision to elevate Kitale&apos;s travel experience,
                  SKYCOMFY HOTEL KITALE has blossomed into one of the region&apos;s premier
                  destinations. Strategically positioned off the scenic Kitale-Kapenguria
                  Highway, we provide a quiet, securely gated getaway for leisure, business,
                  and celebrations.
                </p>
                <p className="font-sans text-sm md:text-base text-muted leading-relaxed">
                  We believe that a great stay goes beyond a comfortable bed. It is defined
                  by memorable moments — like an evening bonfire under the stars in our lush
                  botanical gardens, a perfectly seasoned Kenyan dish prepared by our
                  professional chefs, or a business summit that runs seamlessly thanks to our
                  modern conference facilities.
                </p>
              </div>
            </SectionWrapper>

            {/* Image */}
            <SectionWrapper direction="right">
              <div className="relative group rounded-card overflow-hidden shadow-card aspect-[4/3] w-full max-w-lg mx-auto">
                <Image
                  src="/images/rooms/room-interior-01.jpg"
                  alt="Elegantly furnished room at SKYCOMFY HOTEL KITALE"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div
                  className="absolute inset-0 bg-primary/5 group-hover:bg-primary/0 transition-colors duration-300"
                  aria-hidden="true"
                />
              </div>
            </SectionWrapper>
          </div>
        </div>
      </section>

      {/* ── 3. OUR HOSPITALITY — CORE PILLARS ── */}
      <section
        className="bg-surface py-16 md:py-24 border-y border-border"
        aria-labelledby="hospitality-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionWrapper direction="up">
            <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-4">
              <span className="font-sans text-xs md:text-sm font-semibold tracking-wider text-accent uppercase">
                Our Foundation
              </span>
              <h2
                id="hospitality-heading"
                className="font-serif text-3xl md:text-4xl font-bold text-foreground"
              >
                The Values That Drive Us
              </h2>
              <div className="w-16 h-1 bg-accent rounded-full" aria-hidden="true" />
              <p className="font-sans text-sm md:text-base text-muted leading-relaxed">
                Every decision we make is guided by four core pillars that define the
                SKYCOMFY experience.
              </p>
            </div>
          </SectionWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <SectionWrapper key={pillar.title} direction="up" delay={index * 0.1}>
                  <article className="flex flex-col items-center text-center p-6 bg-background rounded-card border border-border h-full shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent mb-5"
                      aria-hidden="true"
                    >
                      <Icon size={24} />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-foreground mb-3">
                      {pillar.title}
                    </h3>
                    <p className="font-sans text-xs md:text-sm text-muted leading-relaxed">
                      {pillar.description}
                    </p>
                  </article>
                </SectionWrapper>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. DINING EXPERIENCE ── */}
      <section
        className="bg-background py-16 md:py-24"
        aria-labelledby="dining-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <SectionWrapper direction="left">
              <div className="relative group rounded-card overflow-hidden shadow-card aspect-[4/3] w-full max-w-lg mx-auto">
                <Image
                  src="/images/dining/dining-food-01.jpg"
                  alt="Freshly prepared authentic Kenyan cuisine at SKYCOMFY HOTEL KITALE restaurant"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </SectionWrapper>

            {/* Text */}
            <SectionWrapper direction="right">
              <div className="flex flex-col gap-5">
                <span className="font-sans text-xs md:text-sm font-semibold tracking-wider text-accent uppercase">
                  Culinary Delights
                </span>
                <h2
                  id="dining-heading"
                  className="font-serif text-2xl md:text-3xl font-bold text-foreground"
                >
                  A Gastronomic Journey in Trans-Nzoia
                </h2>
                <div className="w-12 h-1 bg-accent rounded-full" aria-hidden="true" />
                <p className="font-sans text-sm md:text-base text-muted leading-relaxed">
                  At Skycomfy, we celebrate culinary diversity. Our restaurant serves premium
                  authentic Kenyan delicacies — including perfectly flame-grilled chicken,
                  fresh tilapia, and locally sourced traditional greens — alongside seasoned
                  continental dishes crafted by our professional chefs.
                </p>
                <p className="font-sans text-sm md:text-base text-muted leading-relaxed">
                  Enjoy your meal in our warm, beautifully lit indoor dining area or dine
                  al fresco in the garden gazebos, soaking in the gentle breeze and pure
                  tranquility of Kitale&apos;s highland air.
                </p>
              </div>
            </SectionWrapper>
          </div>
        </div>
      </section>

      {/* ── 5. EVENTS & CONFERENCES ── */}
      <section
        className="bg-surface py-16 md:py-24 border-y border-border"
        aria-labelledby="events-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text */}
            <SectionWrapper direction="left">
              <div className="flex flex-col gap-5">
                <span className="font-sans text-xs md:text-sm font-semibold tracking-wider text-accent uppercase">
                  Events &amp; Conferences
                </span>
                <h2
                  id="events-heading"
                  className="font-serif text-2xl md:text-3xl font-bold text-foreground"
                >
                  Your Premier Event Venue in Kitale
                </h2>
                <div className="w-12 h-1 bg-accent rounded-full" aria-hidden="true" />
                <p className="font-sans text-sm md:text-base text-muted leading-relaxed">
                  Whether you are hosting a corporate seminar, a product launch, a team
                  building retreat, or a board meeting, our fully equipped conference
                  facilities provide everything you need for a productive and professional
                  event. High-speed Wi-Fi, projectors, and flexible seating arrangements
                  are all available.
                </p>
                <p className="font-sans text-sm md:text-base text-muted leading-relaxed">
                  For social celebrations, our beautifully manicured outdoor garden provides
                  an exquisite backdrop for romantic garden weddings, milestone birthdays,
                  baby showers, and family reunions — all set against the lush greenery of
                  Trans-Nzoia County.
                </p>
              </div>
            </SectionWrapper>

            {/* Image */}
            <SectionWrapper direction="right">
              <div className="relative group rounded-card overflow-hidden shadow-card aspect-[4/3] w-full max-w-lg mx-auto">
                <Image
                  src="/images/exterior/hotel-entrance-02.jpg"
                  alt="SKYCOMFY HOTEL KITALE venue — ideal for conferences and corporate events"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </SectionWrapper>
          </div>
        </div>
      </section>

      {/* ── 6. PEACEFUL ENVIRONMENT ── */}
      <section
        className="bg-background py-16 md:py-24"
        aria-labelledby="environment-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <SectionWrapper direction="left">
              <div className="relative group rounded-card overflow-hidden shadow-card aspect-[4/3] w-full max-w-lg mx-auto">
                <Image
                  src="/images/gallery/hotel-garden-01.jpg"
                  alt="Serene garden and outdoor space at SKYCOMFY HOTEL KITALE"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </SectionWrapper>

            {/* Text */}
            <SectionWrapper direction="right">
              <div className="flex flex-col gap-5">
                <span className="font-sans text-xs md:text-sm font-semibold tracking-wider text-accent uppercase">
                  Peaceful Environment
                </span>
                <h2
                  id="environment-heading"
                  className="font-serif text-2xl md:text-3xl font-bold text-foreground"
                >
                  Serene Gardens &amp; Magical Bonfires
                </h2>
                <div className="w-12 h-1 bg-accent rounded-full" aria-hidden="true" />
                <p className="font-sans text-sm md:text-base text-muted leading-relaxed">
                  Our pride is our beautifully manicured outdoor garden. Framed by tropical
                  blooms and mature trees, it provides an exquisite setting for romantic
                  garden weddings, milestone celebrations, team building activities, and
                  intimate family gatherings.
                </p>
                <p className="font-sans text-sm md:text-base text-muted leading-relaxed">
                  In the evenings, the garden transforms into something truly magical. We
                  host bonfire sessions under the stars where families and friends gather to
                  chat, enjoy warm beverages, and share laughter in the cool, crisp Kitale
                  highland air — a memory you will carry long after you check out.
                </p>
              </div>
            </SectionWrapper>
          </div>
        </div>
      </section>

      {/* ── 7. CTA SECTION ── */}
      <CTASection
        headline="Ready to Plan Your Stay or Garden Event?"
        subtext="Contact our booking managers today to secure your room reservation or schedule a private garden venue viewing."
      />
    </PageFadeIn>
  );
}
