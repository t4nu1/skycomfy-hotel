import type { Metadata } from 'next';
import PageFadeIn from '@/components/ui/PageFadeIn';
import InnerPageHero from '@/components/ui/InnerPageHero';
import CTASection from '@/components/ui/CTASection';
import RoomsClient from '@/components/rooms/RoomsClient';

/* ─────────────────────────────────────────────────────────────
   Page metadata — Requirements 19.1, 19.2, 19.3
───────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: 'Rooms & Suites',
  description:
    'Explore our Standard, Deluxe, and Executive rooms at SKYCOMFY HOTEL KITALE. Comfortable, elegantly furnished accommodation off the Kitale-Kapenguria Highway in Trans-Nzoia County, Kenya.',
  openGraph: {
    title: 'Rooms & Suites — SKYCOMFY HOTEL KITALE',
    description:
      'Choose from our Standard, Deluxe, or Executive Suite. Each room features premium bedding, free Wi-Fi, air conditioning, and warm Kenyan hospitality.',
    url: 'https://www.skycomfyhotel.co.ke/rooms',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SKYCOMFY HOTEL KITALE — Rooms & Suites',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rooms & Suites — SKYCOMFY HOTEL KITALE',
    description:
      'Standard, Deluxe, and Executive rooms in Kitale, Kenya. Book your stay today.',
    images: ['/og-image.jpg'],
  },
};

/* ─────────────────────────────────────────────────────────────
   Rooms Page — Server Component
   Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 19.1, 19.2, 19.3
───────────────────────────────────────────────────────────── */
export default function RoomsPage() {
  return (
    <PageFadeIn>
      {/* ── 1. INNER-PAGE HERO BANNER ── */}
      <InnerPageHero
        eyebrow="Luxurious Stays"
        title="Rooms &amp; Suites"
        imageSrc="/images/rooms/room-interior-02.jpg"
        imageAlt="Comfortable room interior at SKYCOMFY HOTEL KITALE"
      />

      {/* ── 2. ROOM CARDS + LIGHTBOX (client island) ── */}
      <RoomsClient />

      {/* ── 3. CTA SECTION ── */}
      <CTASection
        headline="Ready to Book Your Perfect Room?"
        subtext="Contact our reservations team today to secure your preferred room and enjoy a memorable stay at SKYCOMFY HOTEL KITALE."
      />
    </PageFadeIn>
  );
}
