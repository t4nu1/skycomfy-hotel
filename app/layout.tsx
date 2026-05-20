import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingWhatsAppButton from '@/components/ui/FloatingWhatsAppButton';
import SchemaMarkup from '@/components/ui/SchemaMarkup';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SKYCOMFY HOTEL KITALE | Premium Accommodation & Fine Dining',
  description:
    'Experience the perfect blend of modern comfort and exceptional hospitality in Kitale, Kenya. Book luxurious rooms, enjoy authentic cuisine, or host serene garden events.',
  keywords: [
    'Skycomfy Hotel',
    'Skycomfy Kitale',
    'Hotels in Kitale',
    'Best hotels in Trans-Nzoia',
    'Kitale accommodation',
    'Kitale conference facilities',
    'Garden wedding venue Kitale',
    'Kenyan hospitality',
  ],
  authors: [{ name: 'Skycomfy Hotel Kitale' }],
  creator: 'Skycomfy Hotel',
  publisher: 'Skycomfy Hotel Kitale',
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: 'SKYCOMFY HOTEL KITALE',
    description: 'Experience premium comfort and warm hospitality in the heart of Kitale.',
    url: 'https://skycomfy.co.ke',
    siteName: 'Skycomfy Hotel Kitale',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200',
        width: 1200,
        height: 630,
        alt: 'SKYCOMFY HOTEL KITALE — Deluxe Room',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SKYCOMFY HOTEL KITALE',
    description: 'Experience premium comfort and warm hospitality in the heart of Kitale.',
    images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200'],
  },
};

const hotelSchema = {
  '@context': 'https://schema.org',
  '@type': 'Hotel',
  name: 'SKYCOMFY HOTEL KITALE',
  description:
    'A premium hotel offering cozy accommodations, delicious local and international dining, state-of-the-art conference facilities, and serene garden wedding venues.',
  image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
  telephone: '+254747118328',
  email: 'info@skycomfyhotel.com',
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
    latitude: '1.0191',
    longitude: '35.0023',
  },
  url: 'https://skycomfy.co.ke',
  starRating: {
    '@type': 'Rating',
    ratingValue: '4.5',
  },
  priceRange: 'KES 4500 - KES 9500',
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Free Wi-Fi', value: 'true' },
    { '@type': 'LocationFeatureSpecification', name: 'Air Conditioning', value: 'true' },
    { '@type': 'LocationFeatureSpecification', name: 'Restaurant & Bar', value: 'true' },
    { '@type': 'LocationFeatureSpecification', name: 'Conference Facilities', value: 'true' },
    { '@type': 'LocationFeatureSpecification', name: 'Lush Event Gardens', value: 'true' },
    { '@type': 'LocationFeatureSpecification', name: 'Daily Housekeeping', value: 'true' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <SchemaMarkup schema={hotelSchema} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-accent/30 selection:text-primary">
        {/* Global Navbar */}
        <Navbar />

        {/* Dynamic page content wrapped in a container that accounts for fixed header height */}
        <main className="flex-grow pt-16 md:pt-20">{children}</main>

        {/* Global Footer */}
        <Footer />

        {/* Floating WhatsApp reservation channel */}
        <FloatingWhatsAppButton />
      </body>
    </html>
  );
}
