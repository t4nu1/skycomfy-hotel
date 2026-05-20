export interface NavLink {
  label: string;
  href: string;
}

export interface Room {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  images: string[];          // Unsplash URLs
  amenities: string[];
  priceFrom?: string;        // e.g. "KES 4,500/night" — optional for MVP
}

export interface Service {
  id: string;
  icon: string;              // Lucide icon name or SVG path
  name: string;
  description: string;
}

export interface Testimonial {
  id: string;
  text: string;
  guestName: string;
  rating: number;            // 1–5
}

export interface GalleryImage {
  id: string;
  src: string;               // Unsplash URL
  alt: string;
  category: 'rooms' | 'restaurant' | 'events' | 'garden';
  width: number;
  height: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;             // optional
  subject: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}
