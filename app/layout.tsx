import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingWhatsAppButton from '@/components/ui/FloatingWhatsAppButton';

/* ─── Font loading via next/font/google (self-hosted, no layout shift) ─── */
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

/* ─── Root layout metadata defaults ─── */
export const metadata: Metadata = {
  metadataBase: new URL('https://www.skycomfyhotel.co.ke'),
  title: {
    default: 'SKYCOMFY HOTEL KITALE',
    template: '%s | SKYCOMFY HOTEL KITALE',
  },
  description:
    'Premium hotel in Kitale, Kenya offering accommodation, dining, conferences, and garden events.',
  robots: { index: true, follow: true },
  authors: [{ name: 'Skycomfy Hotel Kitale' }],
  creator: 'Skycomfy Hotel',
  publisher: 'Skycomfy Hotel Kitale',
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    siteName: 'SKYCOMFY HOTEL KITALE',
    locale: 'en_KE',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SKYCOMFY HOTEL KITALE',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.jpg'],
  },
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
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-accent/30 selection:text-primary">
        {/* Global Navbar — fixed, present on all pages */}
        <Navbar />

        {/* Page content — padded to clear the fixed navbar */}
        <main className="flex-grow pt-16 md:pt-20">{children}</main>

        {/* Global Footer — present on all pages */}
        <Footer />

        {/* Floating WhatsApp button — fixed overlay, present on all pages */}
        <FloatingWhatsAppButton />
      </body>
    </html>
  );
}
