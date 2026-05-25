import type { Metadata } from 'next';
import PageFadeIn from '@/components/ui/PageFadeIn';
import SchemaMarkup from '@/components/ui/SchemaMarkup';
import HeroSection from '@/components/home/HeroSection';
import AboutPreview from '@/components/home/AboutPreview';
import ServicesSection from '@/components/home/ServicesSection';
import FeaturedRooms from '@/components/home/FeaturedRooms';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import GalleryPreview from '@/components/home/GalleryPreview';
import LocationSection from '@/components/home/LocationSection';
import CTASection from '@/components/ui/CTASection';

/* ─────────────────────────────────────────────────────────────
   Page metadata — Requirements 19.1, 19.2, 19.3
───────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: 'Home',
  description:
    'SKYCOMFY HOTEL KITALE — a premium hotel in Kitale, Kenya offering comfortable accommodation, fine dining, conference facilities, and beautiful garden event spaces off the Kitale-Kapenguria Highway.',
  keywords: [
    'hotel Kitale',
    'Skycomfy Hotel',
    'accommodation Kitale Kenya',
    'conference venue Kitale',
    'garden wedding Kitale',
    'Trans-Nzoia hotel',
  ],
  openGraph: {
    title: 'SKYCOMFY HOTEL KITALE — Comfort Meets Elegance',
    description:
      'Experience premium accommodation, fine dining, and exceptional hospitality at SKYCOMFY HOTEL KITALE in Kitale, Kenya.',
    url: 'https://www.skycomfyhotel.co.ke',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SKYCOMFY HOTEL KITALE — Comfort Meets Elegance in the Heart of Kitale',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SKYCOMFY HOTEL KITALE — Comfort Meets Elegance',
    description:
      'Premium hotel in Kitale, Kenya. Accommodation, dining, conferences, and garden events.',
    images: ['/og-image.jpg'],
  },
};

/* ─────────────────────────────────────────────────────────────
   JSON-LD structured data — Requirements 19.7
───────────────────────────────────────────────────────────── */
const hotelSchema = {
  '@context': 'https://schema.org',
  '@type': 'Hotel',
  name: 'SKYCOMFY HOTEL KITALE',
  description:
    'A premium hotel in Kitale, Kenya offering comfortable accommodation, fine dining, conference facilities, and garden event spaces.',
  url: 'https://www.skycomfyhotel.co.ke',
  logo: 'https://www.skycomfyhotel.co.ke/favicon.ico',
  image: 'https://www.skycomfyhotel.co.ke/og-image.jpg',
  telephone: ['+254747118328', '+254719530249'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Off Kitale-Kapenguria Highway',
    addressLocality: 'Kitale',
    addressRegion: 'Trans-Nzoia County',
    postalCode: '30200',
    addressCountry: 'KE',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 1.0191599989679659,
    longitude: 34.99616787496695,
  },
  priceRange: '$$',
  starRating: {
    '@type': 'Rating',
    ratingValue: '4',
  },
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Free Parking', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Restaurant', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Conference Facilities', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Garden Events', value: true },
    { '@type': 'LocationFeatureSpecification', name: '24-Hour Reception', value: true },
  ],
  sameAs: [
    'https://www.instagram.com/skycomfyhotel',
    'https://www.tiktok.com/@skycomfyhotel',
  ],
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'SKYCOMFY HOTEL KITALE',
  description:
    'Premium hotel and event venue in Kitale, Kenya. Accommodation, dining, conferences, and garden weddings.',
  url: 'https://www.skycomfyhotel.co.ke',
  telephone: '+254747118328',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Off Kitale-Kapenguria Highway',
    addressLocality: 'Kitale',
    addressRegion: 'Trans-Nzoia County',
    postalCode: '30200',
    addressCountry: 'KE',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 1.0191599989679659,
    longitude: 34.99616787496695,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
    ],
    opens: '00:00',
    closes: '23:59',
  },
  hasMap: 'https://www.google.com/maps/place/Kitale,+Kenya',
  priceRange: '$$',
};

/* ─────────────────────────────────────────────────────────────
   Homepage — Server Component
   Composes all home sections in order.
   Requirements: 3.1–3.6, 4.1–4.3, 5.1–5.4, 6.1–6.5, 7.1–7.3,
                 8.1–8.4, 9.1–9.5, 10.1–10.4, 11.1–11.4,
                 19.1, 19.2, 19.3, 19.7, 19.8
───────────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      {/* Structured data — injected into <head> via Next.js */}
      <SchemaMarkup schema={hotelSchema} />
      <SchemaMarkup schema={localBusinessSchema} />

      <PageFadeIn>
        <HeroSection />
        <AboutPreview />
        <ServicesSection />
        <FeaturedRooms />
        <WhyChooseUs />
        <TestimonialsSection />
        <GalleryPreview />
        <LocationSection />
        <CTASection />
      </PageFadeIn>
    </>
  );
}
