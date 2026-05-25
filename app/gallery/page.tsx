import type { Metadata } from 'next';
import PageFadeIn from '@/components/ui/PageFadeIn';
import InnerPageHero from '@/components/ui/InnerPageHero';
import CTASection from '@/components/ui/CTASection';
import GalleryClient from '@/components/gallery/GalleryClient';

/* ─────────────────────────────────────────────────────────────
   Page metadata — Requirements 19.1, 19.2, 19.3
───────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Browse photos of our rooms, restaurant, garden, and events at SKYCOMFY HOTEL KITALE — a premier hotel off the Kitale-Kapenguria Highway in Trans-Nzoia County, Kenya.',
  openGraph: {
    title: 'Gallery — SKYCOMFY HOTEL KITALE',
    description:
      'Explore our photo gallery showcasing elegant rooms, authentic Kenyan dining, lush gardens, and memorable events at Skycomfy Hotel Kitale.',
    url: 'https://www.skycomfyhotel.co.ke/gallery',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SKYCOMFY HOTEL KITALE — Gallery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gallery — SKYCOMFY HOTEL KITALE',
    description:
      'Rooms, dining, gardens, and events — explore Skycomfy Hotel Kitale through our photo gallery.',
    images: ['/og-image.jpg'],
  },
};

/* ─────────────────────────────────────────────────────────────
   Gallery Page — Server Component
   Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6, 19.1, 19.2, 19.3
───────────────────────────────────────────────────────────── */
export default function GalleryPage() {
  return (
    <PageFadeIn>
      {/* ── 1. INNER-PAGE HERO BANNER ── */}
      <InnerPageHero
        eyebrow="Visual Journey"
        title="Our Gallery"
        imageSrc="/images/exterior/hotel-exterior-03.jpg"
        imageAlt="SKYCOMFY HOTEL KITALE — real hotel grounds and exterior"
      />

      {/* ── 2. GALLERY GRID + LIGHTBOX (client island) ── */}
      <GalleryClient />

      {/* ── 3. CTA SECTION ── */}
      <CTASection
        headline="Like What You See?"
        subtext="Book your stay at SKYCOMFY HOTEL KITALE and experience the elegance, comfort, and warm Kenyan hospitality in person."
      />
    </PageFadeIn>
  );
}
