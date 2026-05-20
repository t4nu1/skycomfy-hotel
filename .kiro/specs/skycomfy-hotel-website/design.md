# Design Document — SKYCOMFY HOTEL KITALE Website

## Overview

SKYCOMFY HOTEL KITALE requires a five-page marketing website that positions the hotel as a premium hospitality destination in Kitale, Kenya. The site must load fast, look polished on every device, and be structured so that future features (booking engine, CMS, admin dashboard) can be added without architectural rework.

The stack is **Next.js 14+ App Router · TypeScript · Tailwind CSS · Framer Motion**. All pages are statically generated at build time (no server-side data fetching needed for the MVP). Content is sourced from typed constant files. Animations are handled exclusively by Framer Motion with reduced-motion support baked in.

---

## Architecture

### Tech Stack

| Concern | Choice | Rationale |
|---|---|---|
| Framework | Next.js 14+ (App Router) | File-based routing, built-in image optimisation, metadata API, sitemap/robots conventions |
| Language | TypeScript (strict mode) | Type safety across components, data models, and props |
| Styling | Tailwind CSS v3 | Utility-first, design-token-friendly, zero runtime CSS |
| Animation | Framer Motion v11 | Declarative, performant, `useReducedMotion` support |
| Fonts | `next/font/google` | Self-hosted, no layout shift |
| Images | `next/image` | Automatic WebP conversion, lazy loading, `srcset` |
| Deployment | Vercel | Zero-config Next.js hosting, edge CDN |


### Folder Structure

```
skycomfy/
├── app/                          # Next.js App Router pages & layouts
│   ├── layout.tsx                # Root layout (fonts, Navbar, Footer, WhatsApp button)
│   ├── page.tsx                  # Homepage (/)
│   ├── about/
│   │   └── page.tsx              # About page (/about)
│   ├── rooms/
│   │   └── page.tsx              # Rooms page (/rooms)
│   ├── gallery/
│   │   └── page.tsx              # Gallery page (/gallery)
│   ├── contact/
│   │   └── page.tsx              # Contact page (/contact)
│   ├── sitemap.ts                # Auto-generated sitemap.xml
│   └── robots.ts                 # Auto-generated robots.txt
├── components/                   # All shared UI components
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── ui/
│   │   ├── FloatingWhatsAppButton.tsx
│   │   ├── SectionWrapper.tsx
│   │   ├── CTASection.tsx
│   │   ├── SchemaMarkup.tsx
│   │   └── PageFadeIn.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── AboutPreview.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── FeaturedRooms.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── GalleryPreview.tsx
│   │   └── LocationSection.tsx
│   ├── rooms/
│   │   └── RoomCard.tsx
│   ├── gallery/
│   │   ├── GalleryGrid.tsx
│   │   ├── GalleryImage.tsx
│   │   └── Lightbox.tsx
│   ├── cards/
│   │   ├── ServiceCard.tsx
│   │   └── TestimonialCard.tsx
│   └── contact/
│       └── ContactForm.tsx
├── hooks/
│   ├── useScrollReveal.ts        # Framer Motion scroll-reveal hook
│   └── useNavbarScroll.ts        # Navbar background-on-scroll hook
├── types/
│   └── index.ts                  # All shared TypeScript interfaces
├── constants/
│   ├── rooms.ts
│   ├── services.ts
│   ├── testimonials.ts
│   ├── gallery.ts
│   └── navigation.ts
└── public/
    ├── images/                   # Any locally stored images
    ├── favicon.ico
    └── og-image.jpg              # Default Open Graph image
```


### Root Layout Pattern

`app/layout.tsx` is the single root layout that wraps every page. It:

1. Loads fonts via `next/font/google` and injects CSS variables into `<html>`.
2. Renders `<Navbar />` above `{children}` and `<Footer />` below.
3. Renders `<FloatingWhatsAppButton />` as a fixed overlay (outside the page flow).
4. Sets default `<html lang="en">` and `<body>` class with background and text colours.
5. Exports `metadata` defaults (title template, description, Open Graph base).

```tsx
// app/layout.tsx (structure only)
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-background text-foreground antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsAppButton />
      </body>
    </html>
  );
}
```

---

## Components and Interfaces

### Shared TypeScript Interfaces (`types/index.ts`)

```ts
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
```


### Navbar

**File:** `components/layout/Navbar.tsx`

**Behaviour:**
- Fixed to top (`position: fixed; top: 0; z-index: 50`).
- Transparent on load; gains `bg-primary/95 shadow-md backdrop-blur-sm` after scrolling 80 px (via `useNavbarScroll` hook).
- Desktop: horizontal link list + "Book Now" CTA button.
- Mobile (< 768 px): hamburger icon; clicking opens a full-screen overlay menu.
- Active link is highlighted with `text-accent border-b-2 border-accent`.

**Props:**
```ts
// No external props — reads from constants/navigation.ts and usePathname()
```

**Internal state:**
```ts
const [isMenuOpen, setIsMenuOpen] = useState(false);
const isScrolled = useNavbarScroll(80); // custom hook
const pathname = usePathname();
```

**`useNavbarScroll` hook (`hooks/useNavbarScroll.ts`):**
```ts
export function useNavbarScroll(threshold: number): boolean {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [threshold]);
  return isScrolled;
}
```

---

### Footer

**File:** `components/layout/Footer.tsx`

**Props:** None — all data is static.

**Sections rendered:**
1. Brand column: hotel name, tagline, social icons (Instagram, TikTok, X).
2. Quick links column: same nav links as Navbar.
3. Contact column: phone numbers, address.
4. Bottom bar: copyright `© {new Date().getFullYear()} SKYCOMFY HOTEL KITALE`.

---

### FloatingWhatsAppButton

**File:** `components/ui/FloatingWhatsAppButton.tsx`

**Props:** None — phone number is a constant.

```ts
const WHATSAPP_NUMBER = '254747118328';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
```

Renders a fixed `<a>` tag (`bottom-6 right-6 z-50`) with a WhatsApp SVG icon. Framer Motion `whileHover={{ scale: 1.1 }}` and a green glow box-shadow on hover. `aria-label="Chat with us on WhatsApp"`.

---

### SectionWrapper

**File:** `components/ui/SectionWrapper.tsx`

A scroll-reveal higher-order component. Wraps any section content and animates it into view when it enters the viewport.

```ts
interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;            // stagger delay in seconds, default 0
  direction?: 'up' | 'left' | 'right' | 'none'; // default 'up'
}
```

Internally uses `useScrollReveal()` hook and `motion.div` with `initial`, `animate`, and `transition` props.

---

### HeroSection

**File:** `components/home/HeroSection.tsx`

**Props:** None — all copy is static.

Full-viewport (`min-h-screen`) section with:
- `next/image` background (priority, fill, `object-cover`) + dark overlay (`bg-black/50`).
- Framer Motion `staggerChildren` container animating headline → subheadline → CTA buttons.
- Two buttons: "Book Your Stay" (links to `/contact`) and "Explore Rooms" (links to `/rooms`).

```ts
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};
```


### RoomCard

**File:** `components/rooms/RoomCard.tsx`

```ts
interface RoomCardProps {
  room: Room;
  variant?: 'featured' | 'full'; // 'featured' = compact homepage card, 'full' = rooms page card
}
```

- `featured` variant: image + name + short description + amenity chips + CTA button.
- `full` variant: image gallery (click → Lightbox) + name + full description + amenity list + CTA.
- Hover: `whileHover={{ y: -4, boxShadow: '...' }}` on the card wrapper; image `scale(1.05)` on hover via CSS group.

---

### ServiceCard

**File:** `components/cards/ServiceCard.tsx`

```ts
interface ServiceCardProps {
  service: Service;
}
```

Renders icon (Lucide React), name (`h3`), description (`p`). Framer Motion `whileHover={{ y: -4 }}`.

---

### TestimonialCard

**File:** `components/cards/TestimonialCard.tsx`

```ts
interface TestimonialCardProps {
  testimonial: Testimonial;
}
```

Renders star rating (filled/empty stars), review text in quotes, guest name. Card has a subtle border and cream background.

---

### GalleryGrid

**File:** `components/gallery/GalleryGrid.tsx`

```ts
interface GalleryGridProps {
  images: GalleryImage[];
  onImageClick: (index: number) => void;
}
```

CSS Grid with `columns-2 md:columns-3 lg:columns-4` (masonry via CSS columns). Maps images to `<GalleryImage>` components. Staggered Framer Motion entrance.

---

### GalleryImage

**File:** `components/gallery/GalleryImage.tsx`

```ts
interface GalleryImageProps {
  image: GalleryImage;
  index: number;
  onClick: (index: number) => void;
  priority?: boolean;
}
```

`next/image` with `sizes` prop. Hover: overlay div fades in (`opacity-0 group-hover:opacity-100`) with a zoom icon. `whileHover={{ scale: 1.02 }}` on wrapper.

---

### Lightbox

**File:** `components/gallery/Lightbox.tsx`

```ts
interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}
```

Full-screen fixed overlay (`z-[100]`). Framer Motion `AnimatePresence` for open/close fade. Keyboard support: `Escape` → close, `ArrowLeft/Right` → navigate. `aria-modal="true"` and focus trap. Previous/Next chevron buttons. Click outside image → close.

---

### ContactForm

**File:** `components/contact/ContactForm.tsx`

**Props:** None — self-contained client component (`'use client'`).

Fields: Name (required), Email (required), Phone (optional), Subject (required), Message (required, `<textarea>`).

State shape:
```ts
const [formData, setFormData] = useState<ContactFormData>({ name:'', email:'', phone:'', subject:'', message:'' });
const [errors, setErrors] = useState<ContactFormErrors>({});
const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
```

Validation runs on submit (not on blur for MVP). On success, shows a green confirmation banner. The MVP form does not send data to a backend — it simulates success after a 1-second delay (placeholder for future API integration).

---

### CTASection

**File:** `components/ui/CTASection.tsx`

```ts
interface CTASectionProps {
  headline?: string;
  subtext?: string;
}
```

Dark navy background, centred headline, three buttons: "Book Your Stay" → `/contact`, "Contact Us" → `/contact`, "WhatsApp Inquiry" → `https://wa.me/254747118328`. SectionWrapper wraps the whole section.

---

### SchemaMarkup

**File:** `components/ui/SchemaMarkup.tsx`

```ts
interface SchemaMarkupProps {
  schema: Record<string, unknown>; // JSON-LD object
}
```

Renders `<script type="application/ld+json">` via `dangerouslySetInnerHTML`. Used only on the Homepage inside `<head>` via `generateMetadata` or directly in `page.tsx`.

---

### PageFadeIn

**File:** `components/ui/PageFadeIn.tsx`

```ts
interface PageFadeInProps {
  children: React.ReactNode;
}
```

Wraps page content in `motion.div` with `initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}`. Used in every `page.tsx` as the outermost wrapper.


---

## Page Structure

### Homepage (`app/page.tsx`)

| Order | Component | Notes |
|---|---|---|
| 1 | `HeroSection` | Full-viewport, priority image |
| 2 | `AboutPreview` | Short brand intro + "Our Story" link |
| 3 | `ServicesSection` | 5 service cards, staggered entrance |
| 4 | `FeaturedRooms` | 3 room cards (featured variant) |
| 5 | `WhyChooseUs` | 6 feature items, staggered entrance |
| 6 | `TestimonialsSection` | 6+ testimonials, horizontal scroll on mobile |
| 7 | `GalleryPreview` | 6 images, "View Full Gallery" link |
| 8 | `LocationSection` | Google Maps iframe + address |
| 9 | `CTASection` | Final conversion prompt |

Schema markup (`Hotel` + `LocalBusiness` JSON-LD) is injected via `SchemaMarkup` inside the page component.

---

### About Page (`app/about/page.tsx`)

| Order | Component | Notes |
|---|---|---|
| 1 | Page hero banner | Reusable inner-page hero (title + breadcrumb) |
| 2 | Our Story section | `SectionWrapper` + text + image |
| 3 | Our Hospitality section | `SectionWrapper` + text |
| 4 | Dining Experience section | `SectionWrapper` + text + image |
| 5 | Events & Conferences section | `SectionWrapper` + text |
| 6 | Peaceful Environment section | `SectionWrapper` + text + image |
| 7 | `CTASection` | "View Rooms" + "Contact Us" |

---

### Rooms Page (`app/rooms/page.tsx`)

| Order | Component | Notes |
|---|---|---|
| 1 | Page hero banner | Title: "Our Rooms" |
| 2 | `RoomCard` × 3 | `full` variant, stacked on mobile, side-by-side on desktop |
| 3 | `CTASection` | "Book Your Stay" + "Contact Us" |

Lightbox state is managed in `page.tsx` and passed down to each `RoomCard`.

---

### Gallery Page (`app/gallery/page.tsx`)

| Order | Component | Notes |
|---|---|---|
| 1 | Page hero banner | Title: "Gallery" |
| 2 | Category filter tabs | Client component — filters `GalleryGrid` by category |
| 3 | `GalleryGrid` | Filtered image set |
| 4 | `Lightbox` | Controlled by `currentIndex` + `isOpen` state |

---

### Contact Page (`app/contact/page.tsx`)

| Order | Component | Notes |
|---|---|---|
| 1 | Page hero banner | Title: "Contact Us" |
| 2 | Contact info cards | Phone numbers (tel: links), address, WhatsApp button |
| 3 | `ContactForm` | Client component |
| 4 | Google Maps iframe | Same embed as Homepage |
| 5 | Social media links | Instagram, TikTok, X |

---

## Data Models

### `constants/rooms.ts`

```ts
import { Room } from '@/types';

export const rooms: Room[] = [
  {
    id: 'standard',
    name: 'Standard Room',
    slug: 'standard-room',
    shortDescription: 'Comfortable and well-appointed for the discerning traveller.',
    fullDescription: 'Our Standard Rooms offer a peaceful retreat with all the essentials...',
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800',
    ],
    amenities: ['Free Wi-Fi', 'Air Conditioning', 'En-suite Bathroom', 'Flat-screen TV', 'Daily Housekeeping'],
    priceFrom: 'KES 4,500/night',
  },
  {
    id: 'deluxe',
    name: 'Deluxe Room',
    slug: 'deluxe-room',
    shortDescription: 'Elevated comfort with premium furnishings and garden views.',
    fullDescription: 'The Deluxe Room elevates your stay with premium bedding...',
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
    ],
    amenities: ['Free Wi-Fi', 'Air Conditioning', 'King Bed', 'Garden View', 'Mini Bar', 'En-suite Bathroom'],
    priceFrom: 'KES 6,500/night',
  },
  {
    id: 'executive',
    name: 'Executive Suite',
    slug: 'executive-suite',
    shortDescription: 'The pinnacle of luxury — a spacious suite for the most discerning guests.',
    fullDescription: 'Our Executive Suite is the finest accommodation at SKYCOMFY...',
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
    ],
    amenities: ['Free Wi-Fi', 'Air Conditioning', 'King Bed', 'Sitting Area', 'Mini Bar', 'Bathtub', 'Premium Toiletries'],
    priceFrom: 'KES 9,500/night',
  },
];
```


### `constants/services.ts`

```ts
import { Service } from '@/types';

export const services: Service[] = [
  { id: 'accommodation', icon: 'BedDouble', name: 'Accommodation', description: 'Comfortable rooms and suites designed for rest and relaxation.' },
  { id: 'restaurant', icon: 'UtensilsCrossed', name: 'Restaurant', description: 'Savour authentic Kenyan and international cuisine prepared by our chefs.' },
  { id: 'bar', icon: 'Wine', name: 'Bar', description: 'Unwind with a curated selection of beverages in our welcoming bar.' },
  { id: 'conference', icon: 'Presentation', name: 'Conference Facilities', description: 'Fully equipped meeting rooms for corporate events and seminars.' },
  { id: 'garden', icon: 'Trees', name: 'Garden Events', description: 'Host weddings, celebrations, and bonfires in our serene garden.' },
];
```

### `constants/testimonials.ts`

```ts
import { Testimonial } from '@/types';

export const testimonials: Testimonial[] = [
  { id: 't1', text: 'The staff were incredibly warm and welcoming. I felt at home from the moment I arrived.', guestName: 'James M.', rating: 5 },
  { id: 't2', text: 'The garden bonfire experience was magical. Perfect for a family evening.', guestName: 'Amina W.', rating: 5 },
  { id: 't3', text: 'Spacious, clean rooms with a very comfortable bed. I slept better than I have in years.', guestName: 'Peter K.', rating: 5 },
  { id: 't4', text: 'The food at the restaurant was outstanding — fresh, flavourful, and generously portioned.', guestName: 'Grace N.', rating: 5 },
  { id: 't5', text: 'Excellent service throughout my stay. Every request was handled promptly and with a smile.', guestName: 'David O.', rating: 5 },
  { id: 't6', text: 'A truly peaceful environment. The perfect escape from the city noise.', guestName: 'Sarah L.', rating: 4 },
];
```

### `constants/gallery.ts`

```ts
import { GalleryImage } from '@/types';

export const galleryImages: GalleryImage[] = [
  { id: 'g1', src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800', alt: 'Standard room interior', category: 'rooms', width: 800, height: 600 },
  { id: 'g2', src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800', alt: 'Restaurant dining area', category: 'restaurant', width: 800, height: 533 },
  { id: 'g3', src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800', alt: 'Conference room setup', category: 'events', width: 800, height: 533 },
  { id: 'g4', src: 'https://images.unsplash.com/photo-1585320806297-9794b3e4aaae?w=800', alt: 'Hotel garden at dusk', category: 'garden', width: 800, height: 600 },
  { id: 'g5', src: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800', alt: 'Deluxe room bed', category: 'rooms', width: 800, height: 600 },
  { id: 'g6', src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800', alt: 'Bar and lounge area', category: 'restaurant', width: 800, height: 533 },
  // Additional images follow the same pattern
];
```

### `constants/navigation.ts`

```ts
import { NavLink } from '@/types';

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Rooms', href: '/rooms' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];
```


---

## Design System

### Tailwind Configuration (`tailwind.config.ts`)

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary:    '#1a2744',   // Deep navy — main brand colour
        accent:     '#c9a84c',   // Warm gold — CTAs, highlights, active states
        background: '#faf8f4',   // Warm cream — page background
        surface:    '#ffffff',   // Card/panel backgrounds
        foreground: '#1a1a1a',   // Primary text
        muted:      '#6b7280',   // Secondary text, captions
        border:     '#e5e0d8',   // Subtle borders
        'primary-light': '#243460', // Hover state for primary
        'accent-light':  '#d4b46a', // Hover state for accent
      },
      fontFamily: {
        serif:  ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:   ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['3.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-md': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      spacing: {
        'section': '5rem',       // py-section = 80px vertical padding for sections
        'section-sm': '3rem',    // py-section-sm = 48px for tighter sections
      },
      borderRadius: {
        'card': '0.75rem',       // 12px — room cards, service cards
        'btn':  '0.375rem',      // 6px — buttons
        'pill': '9999px',        // pill badges
      },
      boxShadow: {
        'card':    '0 4px 24px rgba(26,39,68,0.08)',
        'card-hover': '0 12px 40px rgba(26,39,68,0.16)',
        'navbar':  '0 2px 16px rgba(26,39,68,0.12)',
        'btn':     '0 2px 8px rgba(201,168,76,0.3)',
      },
      backgroundImage: {
        'hero-overlay': 'linear-gradient(to bottom, rgba(26,39,68,0.55) 0%, rgba(26,39,68,0.35) 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
```

### Typography

Fonts are loaded in `app/layout.tsx` using `next/font/google`:

```ts
import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});
```

**Typographic hierarchy:**

| Element | Font | Size | Weight |
|---|---|---|---|
| Page display headings (H1) | Playfair Display | `display-lg` / `display-xl` | 700 |
| Section headings (H2) | Playfair Display | `display-md` | 600 |
| Card headings (H3) | Playfair Display | `text-2xl` | 600 |
| Body text | Inter | `text-base` (16px) | 400 |
| Small / captions | Inter | `text-sm` (14px) | 400 |
| Buttons | Inter | `text-sm` | 600 |
| Navigation links | Inter | `text-sm` | 500 |


---

## Animation Strategy

### `useScrollReveal` Hook (`hooks/useScrollReveal.ts`)

```ts
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface ScrollRevealOptions {
  threshold?: number;   // default 0.15
  once?: boolean;       // default true
}

export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const { threshold = 0.15, once = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: threshold, once });
  return { ref, isInView };
}
```

### Framer Motion Variants

All variants are defined in a shared `lib/variants.ts` file and imported by components:

```ts
// Fade up — default scroll reveal
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

// Fade in — no directional movement
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

// Stagger container — wraps a list of staggered children
export const staggerContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

// Stagger item — used inside stagger container
export const staggerItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

// Page fade-in
export const pageFadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

// Card hover
export const cardHoverVariants = {
  rest: { y: 0, boxShadow: '0 4px 24px rgba(26,39,68,0.08)' },
  hover: { y: -4, boxShadow: '0 12px 40px rgba(26,39,68,0.16)', transition: { duration: 0.25 } },
};

// Button hover
export const buttonHoverVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.03, transition: { duration: 0.2 } },
  tap: { scale: 0.97 },
};
```

### Reduced Motion Support

Every animated component checks `useReducedMotion()` from Framer Motion:

```ts
import { useReducedMotion } from 'framer-motion';

// Inside component:
const shouldReduceMotion = useReducedMotion();
const variants = shouldReduceMotion ? { hidden: {}, visible: {} } : fadeUpVariants;
```

When `prefers-reduced-motion: reduce` is set, all variants collapse to no-op objects so content is immediately visible without animation.

### Animation Usage by Context

| Context | Variant | Notes |
|---|---|---|
| Section scroll reveal | `fadeUpVariants` | Via `SectionWrapper` |
| Card grids (services, rooms, gallery) | `staggerContainerVariants` + `staggerItemVariants` | Parent is `motion.div` with stagger |
| Hero content | Custom stagger (0.2s delay between items) | Runs on mount, not scroll |
| Page entry | `pageFadeVariants` | Via `PageFadeIn` wrapper |
| Card hover | `cardHoverVariants` | `whileHover` on card `motion.div` |
| Button hover | `buttonHoverVariants` | `whileHover` + `whileTap` |
| Image hover | CSS `group-hover:scale-105` | Tailwind transition, not Framer Motion |
| Lightbox open/close | `AnimatePresence` + `fadeInVariants` | Framer Motion `AnimatePresence` |
| Mobile menu | `AnimatePresence` + slide-in variant | `x: '-100%'` → `x: 0` |


---

## SEO Architecture

### Per-Page `generateMetadata`

Each `page.tsx` exports a `generateMetadata` function (or a static `metadata` object for non-dynamic pages):

```ts
// app/page.tsx (Homepage)
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SKYCOMFY HOTEL KITALE — Comfort Meets Elegance',
  description: 'Experience premium accommodation, fine dining, and exceptional hospitality at SKYCOMFY HOTEL KITALE. Best hotel in Kitale, Kenya.',
  keywords: ['Hotel in Kitale', 'Best hotel in Kitale', 'Accommodation in Kitale', 'Luxury hotel in Kitale', 'Conference facilities in Kitale'],
  openGraph: {
    title: 'SKYCOMFY HOTEL KITALE — Comfort Meets Elegance',
    description: 'Premium accommodation and hospitality in the heart of Kitale, Kenya.',
    url: 'https://www.skycomfyhotel.co.ke',
    siteName: 'SKYCOMFY HOTEL KITALE',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'SKYCOMFY HOTEL KITALE' }],
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SKYCOMFY HOTEL KITALE',
    description: 'Premium accommodation and hospitality in Kitale, Kenya.',
    images: ['/og-image.jpg'],
  },
};
```

### Root Layout Metadata Defaults (`app/layout.tsx`)

```ts
export const metadata: Metadata = {
  metadataBase: new URL('https://www.skycomfyhotel.co.ke'),
  title: { default: 'SKYCOMFY HOTEL KITALE', template: '%s | SKYCOMFY HOTEL KITALE' },
  description: 'Premium hotel in Kitale, Kenya offering accommodation, dining, conferences, and garden events.',
  robots: { index: true, follow: true },
};
```

### JSON-LD Schema Components

Two schemas are injected on the Homepage via `<SchemaMarkup>`:

```ts
// Hotel schema
const hotelSchema = {
  '@context': 'https://schema.org',
  '@type': 'Hotel',
  name: 'SKYCOMFY HOTEL KITALE',
  url: 'https://www.skycomfyhotel.co.ke',
  telephone: ['+254747118328', '+254719530249'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Off Kitale-Kapenguria Highway',
    addressLocality: 'Kitale',
    addressRegion: 'Trans-Nzoia County',
    postalCode: '30200',
    addressCountry: 'KE',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 1.0154, longitude: 35.0062 },
  priceRange: '$$',
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Free Wi-Fi', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Restaurant', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Conference Room', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Garden', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Parking', value: true },
  ],
};

// LocalBusiness schema (extends Hotel)
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'SKYCOMFY HOTEL KITALE',
  image: 'https://www.skycomfyhotel.co.ke/og-image.jpg',
  telephone: '+254747118328',
  address: hotelSchema.address,
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  ],
};
```

### Sitemap (`app/sitemap.ts`)

```ts
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.skycomfyhotel.co.ke';
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/rooms`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/gallery`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.8 },
  ];
}
```

### Robots (`app/robots.ts`)

```ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://www.skycomfyhotel.co.ke/sitemap.xml',
  };
}
```


---

## Image Strategy

### `next/image` Usage Rules

1. **Above-the-fold images** (hero, page banners): `priority` prop set to `true` — preloaded, no lazy loading.
2. **All other images**: default lazy loading (no `priority` prop).
3. **`sizes` prop**: always set to match the CSS layout:
   - Full-width hero: `sizes="100vw"`
   - 3-column card grid: `sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"`
   - Gallery masonry: `sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"`
4. **`alt` text**: always descriptive, never empty.
5. **`fill` prop**: used for hero and gallery images where the container defines dimensions.
6. **`width` / `height`**: used for card images with known aspect ratios.

### Unsplash Placeholder URLs

All placeholder images use Unsplash with explicit dimensions to avoid layout shift:

```
https://images.unsplash.com/photo-{id}?w=800&q=80&auto=format&fit=crop
```

The `next.config.ts` must whitelist the Unsplash domain:

```ts
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
```

---

## Contact Form

### Validation Logic

Validation runs on form submit. The `validate` function returns a `ContactFormErrors` object:

```ts
function validate(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};
  if (!data.name.trim()) errors.name = 'Name is required.';
  if (!data.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!data.subject.trim()) errors.subject = 'Subject is required.';
  if (!data.message.trim()) errors.message = 'Message is required.';
  else if (data.message.trim().length < 10) errors.message = 'Message must be at least 10 characters.';
  return errors;
}
```

### Submit Handler

```ts
async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  const validationErrors = validate(formData);
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }
  setStatus('submitting');
  // MVP: simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  setStatus('success');
  setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
}
```

### Field Definitions

| Field | Type | Required | Validation |
|---|---|---|---|
| Name | `text` | Yes | Non-empty |
| Email | `email` | Yes | Non-empty + valid email format |
| Phone | `tel` | No | None (optional) |
| Subject | `text` | Yes | Non-empty |
| Message | `textarea` | Yes | Non-empty, min 10 chars |

### Error Display

Each field renders its error below the input:
```tsx
{errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
```

Success state renders a green banner above the form:
```tsx
{status === 'success' && (
  <div role="alert" className="bg-green-50 border border-green-200 text-green-800 rounded-card p-4 mb-6">
    Thank you! Your message has been received. We will be in touch shortly.
  </div>
)}
```


---

## Deployment

### Vercel Configuration

No `vercel.json` is required for this project — Vercel auto-detects Next.js and applies optimal defaults.

**Deployment steps:**
1. Push repository to GitHub.
2. Import project in Vercel dashboard.
3. Framework preset: Next.js (auto-detected).
4. Build command: `next build` (default).
5. Output directory: `.next` (default).
6. Install command: `npm install` (default).

### Environment Variables

No environment variables are required for the MVP. The contact form simulates submission client-side. When a backend email service (e.g., Resend, SendGrid) is added in a future phase, the following variable will be needed:

```
RESEND_API_KEY=re_xxxxxxxxxxxx   # Future use only
```

### `next.config.ts` Settings

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  // Strict mode for catching React issues early
  reactStrictMode: true,
};

export default nextConfig;
```

### Custom Domain

The site will be served at `www.skycomfyhotel.co.ke`. DNS configuration:
- Add a CNAME record pointing `www` to `cname.vercel-dns.com`.
- Add an A record for the apex domain pointing to Vercel's IP (76.76.21.21).


---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

This feature is a marketing website with a mix of UI rendering, data-driven card components, form validation logic, and layout invariants. Property-based testing applies to the data-driven rendering functions, form validation logic, and layout invariants. UI-only concerns (CSS classes, animation variants, responsive breakpoints) are covered by example-based tests.

---

### Property 1: Active navigation link matches current route

*For any* pathname that corresponds to a valid page route (`/`, `/about`, `/rooms`, `/gallery`, `/contact`), rendering the Navbar with that pathname should result in exactly one navigation link having the active highlight class, and that link's `href` should equal the current pathname.

**Validates: Requirements 2.7**

---

### Property 2: Card components render all required data fields

*For any* data object of type `Service`, `Room`, `Testimonial`, or feature item, rendering the corresponding card component (`ServiceCard`, `RoomCard`, `TestimonialCard`) should produce output that contains every required display field defined in the data object — specifically: name/title, description/text, and all list items (amenities, rating stars). No field present in the data object should be silently omitted from the rendered output.

**Validates: Requirements 5.2, 6.2, 7.2, 8.2**

---

### Property 3: Gallery preview visibility threshold

*For any* array of `GalleryImage` objects, if the array length is less than 6, the `GalleryPreview` component should render nothing (return `null` or an empty container). If the array length is 6 or greater, the component should render and display all images in the array.

**Validates: Requirements 9.1**

---

### Property 4: Non-hero images use lazy loading and have non-empty alt text

*For any* `GalleryImage` or `Room` image data object, (a) the `alt` field must be a non-empty string, and (b) when rendered outside of the hero section or page banner, the `next/image` component must not have `priority={true}` set, ensuring lazy loading is applied.

**Validates: Requirements 9.3, 20.2, 20.4**

---

### Property 5: Footer copyright year matches the current year

*For any* year value returned by `new Date().getFullYear()`, the Footer component should render a copyright notice string that contains that exact year. The copyright year must never be hardcoded to a past year.

**Validates: Requirements 12.3**

---

### Property 6: Global layout components are present on every page

*For any* page route in the site (`/`, `/about`, `/rooms`, `/gallery`, `/contact`), the rendered page output should contain both the `Footer` component and the `FloatingWhatsAppButton` component. Neither component should be conditionally hidden on any page.

**Validates: Requirements 12.4, 17.1**

---

### Property 7: Contact form validation covers all combinations of missing required fields

*For any* `ContactFormData` object where one or more required fields (`name`, `email`, `subject`, `message`) are empty or whitespace-only, calling the `validate` function should return a `ContactFormErrors` object that contains an error entry for every missing required field. No missing required field should be silently ignored.

**Validates: Requirements 16.5**

---

### Property 8: All pages have unique, non-empty metadata titles and descriptions

*For any* two distinct page routes in the site, their exported `metadata.title` and `metadata.description` values must both be non-empty strings and must differ from each other. No two pages should share an identical title or description.

**Validates: Requirements 19.1**

---

## Error Handling

### Navigation Errors
- Invalid routes are handled by Next.js's built-in `not-found.tsx`. A minimal 404 page should be created at `app/not-found.tsx` with a link back to the homepage.

### Image Load Failures
- `next/image` handles broken image URLs gracefully by rendering a broken image placeholder. No additional error handling is needed for the MVP.
- All images have descriptive `alt` text so screen readers and broken-image states remain informative.

### Contact Form
- Network/submission errors (future API integration): the `status === 'error'` state renders a red error banner prompting the user to try again or call directly.
- Client-side validation prevents submission of invalid data before any network call is made.

### Lightbox
- If `images` array is empty or `currentIndex` is out of bounds, the Lightbox renders nothing (`isOpen` guard prevents rendering).
- Keyboard event listeners are added/removed via `useEffect` cleanup to prevent memory leaks.

### WhatsApp Links
- All WhatsApp links use `https://wa.me/` URLs. If WhatsApp is not installed, the browser handles the fallback (opens web.whatsapp.com). No custom error handling is needed.

### Google Maps Iframe
- The iframe is wrapped in a `try/catch`-free container. If the embed fails to load (e.g., network issue), the browser renders the iframe's fallback content. A text fallback with the address and a Google Maps link is displayed below the iframe.

---

## Testing Strategy

### Unit Tests (Example-Based)

Use **Vitest** + **React Testing Library** for component unit tests.

Focus areas:
- Navbar: active link highlighting, scroll state class application, mobile menu open/close.
- HeroSection: presence of headline, subheadline, and both CTA buttons.
- ContactForm: field rendering, validation error display, success state display.
- Footer: presence of hotel name, nav links, contact info, social links, copyright year.
- FloatingWhatsAppButton: correct href and target attribute.
- SchemaMarkup: valid JSON-LD output with correct `@type` values.
- Lightbox: keyboard navigation (Escape, ArrowLeft, ArrowRight), close on backdrop click.
- GalleryPreview: hidden when < 6 images, visible when >= 6 images.

### Property-Based Tests

Use **fast-check** (TypeScript-native PBT library) for property tests.

Each property test runs a minimum of **100 iterations**.

Tag format: `// Feature: skycomfy-hotel-website, Property {N}: {property_text}`

**Property 1 — Active nav link matches current route:**
```ts
// Feature: skycomfy-hotel-website, Property 1: Active navigation link matches current route
fc.assert(fc.property(
  fc.constantFrom('/', '/about', '/rooms', '/gallery', '/contact'),
  (pathname) => {
    const { getAllByRole } = render(<Navbar />, { wrapper: withPathname(pathname) });
    const activeLinks = getAllByRole('link').filter(l => l.classList.contains('active-class'));
    return activeLinks.length === 1 && activeLinks[0].getAttribute('href') === pathname;
  }
), { numRuns: 100 });
```

**Property 2 — Card components render all required data fields:**
```ts
// Feature: skycomfy-hotel-website, Property 2: Card components render all required data fields
fc.assert(fc.property(
  arbitraryService(), // fast-check arbitrary for Service type
  (service) => {
    const { getByText } = render(<ServiceCard service={service} />);
    return !!getByText(service.name) && !!getByText(service.description);
  }
), { numRuns: 100 });
// Repeated for Room, Testimonial arbitraries
```

**Property 3 — Gallery preview visibility threshold:**
```ts
// Feature: skycomfy-hotel-website, Property 3: Gallery preview visibility threshold
fc.assert(fc.property(
  fc.array(arbitraryGalleryImage(), { minLength: 0, maxLength: 20 }),
  (images) => {
    const { container } = render(<GalleryPreview images={images} />);
    if (images.length < 6) return container.firstChild === null;
    return container.querySelectorAll('img').length === images.length;
  }
), { numRuns: 100 });
```

**Property 7 — Contact form validation covers all combinations of missing required fields:**
```ts
// Feature: skycomfy-hotel-website, Property 7: Contact form validation covers all combinations of missing required fields
const requiredFields = ['name', 'email', 'subject', 'message'] as const;
fc.assert(fc.property(
  fc.subarray(requiredFields, { minLength: 1 }),
  (missingFields) => {
    const data = { name: 'Test', email: 'test@test.com', phone: '', subject: 'Test', message: 'Test message' };
    missingFields.forEach(f => { data[f] = ''; });
    const errors = validate(data);
    return missingFields.every(f => !!errors[f]);
  }
), { numRuns: 100 });
```

### Integration Tests

- Sitemap: assert `sitemap.ts` returns exactly 5 URLs, all with valid absolute URLs.
- Robots: assert `robots.ts` returns `allow: '/'` rule.
- Schema markup: assert JSON-LD objects are valid JSON and contain required Schema.org fields.

### Accessibility Tests

- Use **axe-core** via `@axe-core/react` or `jest-axe` to run automated accessibility checks on each page component.
- Manual testing with keyboard navigation and VoiceOver/NVDA for WCAG 2.1 AA compliance.

### Performance

- Lighthouse CI run on Vercel preview deployments targeting score ≥ 85 on desktop.
- `next/image` usage audited to ensure no `priority` prop on below-fold images.
