# Implementation Plan: SKYCOMFY HOTEL KITALE Website

## Overview

Build a five-page Next.js 14+ marketing website for SKYCOMFY HOTEL KITALE using TypeScript, Tailwind CSS, and Framer Motion. All pages are statically generated. Content is sourced from typed constant files. The implementation follows a bottom-up approach: foundation → shared UI → card components → pages → testing.

## Tasks

- [x] 1. Project foundation and configuration
  - [x] 1.1 Initialise Next.js 14+ project with TypeScript, Tailwind CSS, and Framer Motion
    - Run `npx create-next-app@latest skycomfy --typescript --tailwind --app --src-dir=false --import-alias="@/*"`
    - Install Framer Motion: `npm install framer-motion`
    - Install Lucide React: `npm install lucide-react`
    - Verify `tsconfig.json` has `"strict": true` and path alias `@/*`
    - _Requirements: 1.1, 1.2, 1.3_

  - [x] 1.2 Configure `tailwind.config.ts` with full design token system
    - Extend `colors` with `primary`, `accent`, `background`, `surface`, `foreground`, `muted`, `border`, `primary-light`, `accent-light`
    - Extend `fontFamily` with `serif` (`--font-playfair`) and `sans` (`--font-inter`)
    - Extend `fontSize` with `display-xl`, `display-lg`, `display-md`
    - Extend `spacing` with `section` (5rem) and `section-sm` (3rem)
    - Extend `borderRadius` with `card`, `btn`, `pill`
    - Extend `boxShadow` with `card`, `card-hover`, `navbar`, `btn`
    - Extend `backgroundImage` with `hero-overlay`
    - _Requirements: 1.2, 21.1, 21.2, 21.3_

  - [x] 1.3 Configure `next.config.ts` with Unsplash remote patterns and strict mode
    - Add `images.remotePatterns` for `images.unsplash.com`
    - Set `reactStrictMode: true`
    - _Requirements: 1.1, 20.3_

  - [x] 1.4 Create folder structure and `types/index.ts`
    - Create directories: `components/layout/`, `components/ui/`, `components/home/`, `components/rooms/`, `components/gallery/`, `components/cards/`, `components/contact/`, `hooks/`, `types/`, `constants/`, `lib/`, `public/images/`
    - Write `types/index.ts` with interfaces: `NavLink`, `Room`, `Service`, `Testimonial`, `GalleryImage`, `ContactFormData`, `ContactFormErrors`
    - _Requirements: 1.4, 1.5_

  - [x] 1.5 Create all constants files
    - Write `constants/navigation.ts` with `navLinks: NavLink[]` (5 entries)
    - Write `constants/rooms.ts` with `rooms: Room[]` (Standard, Deluxe, Executive — Unsplash URLs)
    - Write `constants/services.ts` with `services: Service[]` (5 entries with Lucide icon names)
    - Write `constants/testimonials.ts` with `testimonials: Testimonial[]` (6 entries, ratings 4–5)
    - Write `constants/gallery.ts` with `galleryImages: GalleryImage[]` (≥ 8 entries across 4 categories)
    - _Requirements: 1.4, 5.1, 6.1, 8.1, 9.1, 15.1_

  - [x] 1.6 Create `lib/variants.ts` with all Framer Motion variant objects
    - Export: `fadeUpVariants`, `fadeInVariants`, `staggerContainerVariants`, `staggerItemVariants`, `pageFadeVariants`, `cardHoverVariants`, `buttonHoverVariants`
    - _Requirements: 1.3, 18.1, 18.2, 18.3, 18.4_

  - [x] 1.7 Create custom hooks
    - Write `hooks/useNavbarScroll.ts` — passive scroll listener returning `boolean` above threshold
    - Write `hooks/useScrollReveal.ts` — wraps `useInView` from Framer Motion, returns `{ ref, isInView }`
    - _Requirements: 2.2, 18.1_

  - [x] 1.8 Add `public/og-image.jpg` placeholder and `public/favicon.ico`
    - Place a 1200×630 placeholder image at `public/og-image.jpg`
    - _Requirements: 19.2, 21.5_

- [x] 2. Shared layout components
  - [x] 2.1 Build `components/layout/Navbar.tsx`
    - Fixed positioning (`top-0 z-50`), transparent → `bg-primary/95 shadow-md backdrop-blur-sm` after 80 px scroll via `useNavbarScroll`
    - Desktop: horizontal `navLinks` list + "Book Now" CTA button linking to `/contact`
    - Mobile (< 768 px): hamburger icon; `AnimatePresence` slide-in full-screen overlay menu
    - Active link: `text-accent border-b-2 border-accent` via `usePathname()` comparison
    - Close mobile menu on link click; `aria-label` on hamburger button
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

  - [x] 2.2 Build `components/layout/Footer.tsx`
    - Three columns: brand (name + tagline + social icons), quick links, contact info
    - Social icons for Instagram, TikTok, X with placeholder `href="#"` and `aria-label`
    - Copyright: `© {new Date().getFullYear()} SKYCOMFY HOTEL KITALE`
    - Fully responsive (stacked on mobile, 3-column on desktop)
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_

  - [x] 2.3 Build `components/ui/FloatingWhatsAppButton.tsx`
    - Fixed `bottom-6 right-6 z-50`, `<a>` linking to `https://wa.me/254747118328` with `target="_blank" rel="noopener noreferrer"`
    - WhatsApp SVG icon; `whileHover={{ scale: 1.1 }}` + green glow box-shadow
    - `aria-label="Chat with us on WhatsApp"`
    - _Requirements: 17.1, 17.2, 17.3_

  - [x] 2.4 Build `components/ui/SectionWrapper.tsx`
    - Props: `children`, `className?`, `delay?` (default 0), `direction?` (`'up' | 'left' | 'right' | 'none'`, default `'up'`)
    - Uses `useScrollReveal()` hook and `motion.div` with `fadeUpVariants` (or directional variant)
    - Checks `useReducedMotion()` — collapses variants to no-op when true
    - _Requirements: 18.1, 18.3, 20.6_

  - [x] 2.5 Build `components/ui/PageFadeIn.tsx`
    - Wraps `children` in `motion.div` with `pageFadeVariants`; checks `useReducedMotion()`
    - _Requirements: 18.3, 18.6_

  - [x] 2.6 Build `components/ui/CTASection.tsx`
    - Props: `headline?`, `subtext?`
    - Dark navy background, centred layout; three buttons: "Book Your Stay" → `/contact`, "Contact Us" → `/contact`, "WhatsApp Inquiry" → `https://wa.me/254747118328` (`target="_blank"`)
    - Wrapped in `SectionWrapper`
    - _Requirements: 11.1, 11.2, 11.3, 11.4_

  - [x] 2.7 Build `components/ui/SchemaMarkup.tsx`
    - Props: `schema: Record<string, unknown>`
    - Renders `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />`
    - _Requirements: 19.7_

  - [x] 2.8 Build `app/not-found.tsx` (404 page)
    - Minimal 404 page with hotel branding, message, and link back to `/`
    - _Requirements: 1.4_

- [ ] 3. Card components
  - [-] 3.1 Build `components/cards/ServiceCard.tsx`
    - Props: `service: Service`
    - Renders Lucide icon (by name), `<h3>` name, `<p>` description
    - `whileHover={{ y: -4 }}` via `cardHoverVariants`; `useReducedMotion()` guard
    - _Requirements: 5.2, 5.3, 18.4_

  - [-] 3.2 Build `components/cards/TestimonialCard.tsx`
    - Props: `testimonial: Testimonial`
    - Renders star rating (filled/empty), quoted review text, guest name
    - Subtle border + cream background; responsive width
    - _Requirements: 8.2_

  - [-] 3.3 Build `components/rooms/RoomCard.tsx`
    - Props: `room: Room`, `variant?: 'featured' | 'full'`
    - `featured`: `next/image` + name + short description + amenity chips + CTA button
    - `full`: image gallery (click triggers `onImageClick` callback) + name + full description + amenity list + CTA
    - `whileHover={{ y: -4 }}` on card wrapper; CSS `group-hover:scale-105` on image
    - _Requirements: 6.2, 6.3, 14.2, 14.5, 18.4_

  - [-] 3.4 Build `components/gallery/GalleryImage.tsx`
    - Props: `image: GalleryImage`, `index: number`, `onClick: (index: number) => void`, `priority?: boolean`
    - `next/image` with `sizes` prop; hover overlay with zoom icon (`opacity-0 group-hover:opacity-100`)
    - `whileHover={{ scale: 1.02 }}` on wrapper; `useReducedMotion()` guard
    - _Requirements: 9.2, 9.3, 15.3, 20.2, 20.4_

  - [-] 3.5 Build `components/gallery/GalleryGrid.tsx`
    - Props: `images: GalleryImage[]`, `onImageClick: (index: number) => void`
    - CSS columns masonry (`columns-2 md:columns-3 lg:columns-4`); maps to `<GalleryImage>`
    - `staggerContainerVariants` + `staggerItemVariants` entrance; `useReducedMotion()` guard
    - _Requirements: 9.1, 15.2, 15.6, 18.2_

  - [-] 3.6 Build `components/gallery/Lightbox.tsx`
    - Props: `images: GalleryImage[]`, `currentIndex: number`, `isOpen: boolean`, `onClose`, `onPrev`, `onNext`
    - Full-screen fixed overlay (`z-[100]`); `AnimatePresence` + `fadeInVariants` for open/close
    - Keyboard: `Escape` → close, `ArrowLeft/Right` → navigate; focus trap; `aria-modal="true"`
    - Previous/Next chevron buttons; click outside image → close
    - Guard: render nothing if `!isOpen` or `images` empty or index out of bounds
    - _Requirements: 14.4, 15.4, 20.6, 20.7_

- [ ] 4. Contact form component
  - [ ] 4.1 Build `components/contact/ContactForm.tsx`
    - `'use client'` directive; fields: Name, Email, Phone (optional), Subject, Message (`<textarea>`)
    - State: `formData: ContactFormData`, `errors: ContactFormErrors`, `status: 'idle' | 'submitting' | 'success' | 'error'`
    - `validate()` function: non-empty name/subject/message (min 10 chars), valid email regex
    - Submit handler: run validation → if errors set them and return; else set `submitting` → simulate 1 s delay → set `success`
    - Success: green `role="alert"` banner above form; error: red banner
    - Inline error messages below each field; accessible labels on all inputs
    - _Requirements: 16.3, 16.4, 16.5, 20.6, 20.7_

- [ ] 5. Root layout and SEO infrastructure
  - [~] 5.1 Build `app/layout.tsx`
    - Load `Playfair_Display` and `Inter` via `next/font/google`; inject CSS variables into `<html>`
    - Render `<Navbar />`, `<main>{children}</main>`, `<Footer />`, `<FloatingWhatsAppButton />`
    - Export `metadata` defaults: `metadataBase`, title template, description, `robots`
    - `<html lang="en">`, `<body>` with `bg-background text-foreground antialiased`
    - _Requirements: 1.1, 2.6, 12.4, 17.1, 19.1, 19.4, 21.2_

  - [~] 5.2 Create `app/sitemap.ts`
    - Return 5 entries: `/`, `/about`, `/rooms`, `/gallery`, `/contact` with `lastModified`, `changeFrequency`, `priority`
    - _Requirements: 19.5_

  - [~] 5.3 Create `app/robots.ts`
    - Return `{ rules: { userAgent: '*', allow: '/' }, sitemap: 'https://www.skycomfyhotel.co.ke/sitemap.xml' }`
    - _Requirements: 19.6_

- [ ] 6. Homepage sections
  - [~] 6.1 Build `components/home/HeroSection.tsx`
    - Full-viewport (`min-h-screen`); `next/image` background with `priority fill object-cover` + `bg-black/50` overlay
    - Headline "Comfort Meets Elegance in the Heart of Kitale" in `font-serif display-lg`
    - Supporting subheadline; two CTA buttons: "Book Your Stay" → `/contact`, "Explore Rooms" → `/rooms`
    - `staggerChildren` container (0.2 s delay) animating headline → subheadline → buttons on mount
    - `useReducedMotion()` guard
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

  - [~] 6.2 Build `components/home/AboutPreview.tsx`
    - Short brand introduction paragraph + "Our Story" link → `/about`
    - Wrapped in `SectionWrapper` for scroll reveal
    - _Requirements: 4.1, 4.2, 4.3_

  - [~] 6.3 Build `components/home/ServicesSection.tsx`
    - Import `services` from constants; render 5 `<ServiceCard>` components
    - `staggerContainerVariants` + `staggerItemVariants` entrance via `SectionWrapper`
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

  - [~] 6.4 Build `components/home/FeaturedRooms.tsx`
    - Import `rooms` from constants; render 3 `<RoomCard variant="featured">` components
    - "View All Rooms" link → `/rooms`; staggered entrance via `SectionWrapper`
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

  - [~] 6.5 Build `components/home/WhyChooseUs.tsx`
    - 6 feature items: Friendly Staff, Elegant Ambience, Exceptional Dining, Spacious Rooms, Peaceful Environment, Secure Parking
    - Each item: Lucide icon + label/sentence; staggered entrance via `SectionWrapper`
    - _Requirements: 7.1, 7.2, 7.3_

  - [~] 6.6 Build `components/home/TestimonialsSection.tsx`
    - Import `testimonials` from constants; render 6 `<TestimonialCard>` components
    - Horizontal scroll / overflow-x-auto on mobile; fade-in via `SectionWrapper`
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

  - [~] 6.7 Build `components/home/GalleryPreview.tsx`
    - Props: `images: GalleryImage[]` (default: first 6 from `galleryImages` constant)
    - Return `null` if `images.length < 6`; otherwise render 6 images in responsive grid
    - Lazy loading (no `priority`); hover overlay; "View Full Gallery" link → `/gallery`
    - Staggered entrance via `SectionWrapper`
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

  - [~] 6.8 Build `components/home/LocationSection.tsx`
    - Google Maps iframe (responsive, correct aspect ratio) centred on Kitale, Kenya
    - Display address: Off Kitale-Kapenguria Highway, Kitale, Kenya, 30200
    - "Get Directions" link opening Google Maps in new tab
    - _Requirements: 10.1, 10.2, 10.3, 10.4_

  - [~] 6.9 Assemble `app/page.tsx` (Homepage)
    - Compose all 9 sections in order: Hero → AboutPreview → Services → FeaturedRooms → WhyChooseUs → Testimonials → GalleryPreview → Location → CTASection
    - Add `<SchemaMarkup>` with Hotel + LocalBusiness JSON-LD objects
    - Export `metadata` with title, description, keywords, Open Graph, Twitter card
    - Wrap page in `<PageFadeIn>`
    - _Requirements: 3.1–3.6, 4.1–4.3, 5.1–5.4, 6.1–6.5, 7.1–7.3, 8.1–8.4, 9.1–9.5, 10.1–10.4, 11.1–11.4, 19.1, 19.2, 19.3, 19.7, 19.8_

- [~] 7. Checkpoint — verify foundation and homepage
  - Ensure `npm run build` completes without TypeScript or lint errors
  - Ensure all homepage sections render correctly in the browser
  - Ensure Navbar scroll behaviour, mobile menu, and active link highlighting work
  - Ensure all animations respect `prefers-reduced-motion`
  - Ask the user if questions arise before proceeding.

- [ ] 8. About page
  - [~] 8.1 Build `app/about/page.tsx`
    - Inner-page hero banner (title "About Us" + breadcrumb)
    - Five `SectionWrapper`-wrapped sections: Our Story, Our Hospitality, Dining Experience, Events & Conferences, Peaceful Environment
    - Each section uses warm storytelling copy and `next/image` where appropriate
    - `<CTASection>` at the bottom with "View Rooms" + "Contact Us"
    - Export `metadata` with unique title and description
    - Wrap page in `<PageFadeIn>`
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 19.1, 19.2, 19.3_

- [ ] 9. Rooms page
  - [~] 9.1 Build `app/rooms/page.tsx`
    - Inner-page hero banner (title "Our Rooms")
    - Manage `lightboxState: { isOpen: boolean; currentIndex: number; roomId: string }` in page state
    - Render 3 `<RoomCard variant="full">` components; pass `onImageClick` callback to each
    - Render `<Lightbox>` controlled by page state
    - `<CTASection>` at the bottom
    - Export `metadata` with unique title and description
    - Wrap page in `<PageFadeIn>`
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 19.1, 19.2, 19.3_

- [ ] 10. Gallery page
  - [~] 10.1 Build `app/gallery/page.tsx`
    - Inner-page hero banner (title "Gallery")
    - Client component with `activeCategory` state (`'all' | 'rooms' | 'restaurant' | 'events' | 'garden'`)
    - Category filter tabs (pill buttons); filter `galleryImages` by active category
    - Render `<GalleryGrid>` with filtered images; pass `onImageClick` to open Lightbox
    - Render `<Lightbox>` controlled by page state
    - Export `metadata` with unique title and description
    - Wrap page in `<PageFadeIn>`
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6, 19.1, 19.2, 19.3_

- [ ] 11. Contact page
  - [~] 11.1 Build `app/contact/page.tsx`
    - Inner-page hero banner (title "Contact Us")
    - Contact info cards: two phone numbers as `tel:` links, address, WhatsApp button
    - Render `<ContactForm>`
    - Google Maps iframe (same embed as Homepage)
    - Social media links: Instagram, TikTok, X with `aria-label`
    - Export `metadata` with unique title and description
    - Wrap page in `<PageFadeIn>`
    - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.5, 16.6, 16.7, 16.8, 16.9, 19.1, 19.2, 19.3_

- [~] 12. Checkpoint — verify all pages
  - Ensure `npm run build` completes without errors
  - Verify all five pages render correctly and are fully responsive (320 px – 1920 px)
  - Verify Lightbox keyboard navigation (Escape, ArrowLeft, ArrowRight) on Rooms and Gallery pages
  - Verify contact form validation and success state
  - Verify `sitemap.xml` and `robots.txt` are accessible at their routes
  - Ask the user if questions arise before proceeding.

- [ ] 13. Testing infrastructure and unit tests
  - [~] 13.1 Set up Vitest and React Testing Library
    - Install: `npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom`
    - Create `vitest.config.ts` with jsdom environment and `@testing-library/jest-dom` setup file
    - Create `tests/setup.ts` with `import '@testing-library/jest-dom'`
    - Add `"test": "vitest --run"` script to `package.json`
    - _Requirements: 1.1_

  - [~] 13.2 Write unit tests for `Navbar`
    - Test: hotel name/logo is rendered
    - Test: all 5 nav links are rendered
    - Test: "Book Now" CTA is rendered and links to `/contact`
    - Test: hamburger button has correct `aria-label`
    - Test: mobile menu opens when hamburger is clicked
    - Test: mobile menu closes when a nav link is clicked
    - _Requirements: 2.1, 2.3, 2.4, 2.5_

  - [~] 13.3 Write unit tests for `Footer`
    - Test: hotel name is present
    - Test: all 5 nav links are present
    - Test: phone numbers are present
    - Test: address is present
    - Test: social links (Instagram, TikTok, X) are present with `aria-label`
    - Test: copyright notice contains the current year
    - _Requirements: 12.1, 12.2, 12.3_

  - [~] 13.4 Write unit tests for `FloatingWhatsAppButton`
    - Test: `href` equals `https://wa.me/254747118328`
    - Test: `target="_blank"` and `rel="noopener noreferrer"` are set
    - Test: `aria-label="Chat with us on WhatsApp"` is present
    - _Requirements: 17.1, 17.2_

  - [~] 13.5 Write unit tests for `ContactForm`
    - Test: all 5 fields are rendered with correct labels
    - Test: submitting empty form shows error messages for all required fields
    - Test: submitting with invalid email shows email error
    - Test: submitting with message < 10 chars shows message error
    - Test: submitting valid data shows success banner with `role="alert"`
    - _Requirements: 16.3, 16.4, 16.5_

  - [~] 13.6 Write unit tests for `GalleryPreview`
    - Test: renders `null` when given fewer than 6 images
    - Test: renders all images when given exactly 6 images
    - Test: renders all images when given more than 6 images
    - Test: "View Full Gallery" link is present when images ≥ 6
    - _Requirements: 9.1, 9.4_

  - [~] 13.7 Write unit tests for `Lightbox`
    - Test: renders nothing when `isOpen` is false
    - Test: renders image when `isOpen` is true
    - Test: `onClose` is called when Escape key is pressed
    - Test: `onPrev` is called when ArrowLeft key is pressed
    - Test: `onNext` is called when ArrowRight key is pressed
    - Test: `onClose` is called when backdrop is clicked
    - Test: `aria-modal="true"` is present when open
    - _Requirements: 14.4, 15.4, 20.6, 20.7_

  - [~] 13.8 Write unit tests for `SchemaMarkup`
    - Test: renders a `<script>` tag with `type="application/ld+json"`
    - Test: the script content is valid JSON
    - Test: Hotel schema contains `@type: 'Hotel'`
    - Test: LocalBusiness schema contains `@type: 'LocalBusiness'`
    - _Requirements: 19.7_

- [ ] 14. Property-based tests
  - Install fast-check: `npm install -D fast-check`

  - [ ]* 14.1 Write property test for active navigation link (Property 1)
    - `// Feature: skycomfy-hotel-website, Property 1: Active navigation link matches current route`
    - For any pathname in `['/', '/about', '/rooms', '/gallery', '/contact']`, render `<Navbar>` with that pathname and assert exactly one link has the active class and its `href` equals the pathname
    - Minimum 100 runs
    - **Property 1: Active navigation link matches current route**
    - **Validates: Requirements 2.7**

  - [ ]* 14.2 Write property test for card data field rendering (Property 2)
    - `// Feature: skycomfy-hotel-website, Property 2: Card components render all required data fields`
    - For arbitrary `Service` objects: render `<ServiceCard>` and assert name and description are present
    - For arbitrary `Room` objects: render `<RoomCard variant="featured">` and assert name, short description, and all amenities are present
    - For arbitrary `Testimonial` objects: render `<TestimonialCard>` and assert text, guestName, and correct star count are present
    - Minimum 100 runs per type
    - **Property 2: Card components render all required data fields**
    - **Validates: Requirements 5.2, 6.2, 7.2, 8.2**

  - [ ]* 14.3 Write property test for gallery preview visibility threshold (Property 3)
    - `// Feature: skycomfy-hotel-website, Property 3: Gallery preview visibility threshold`
    - For any array of `GalleryImage` objects (length 0–20): if length < 6 assert component renders null; if length ≥ 6 assert all images are rendered
    - Minimum 100 runs
    - **Property 3: Gallery preview visibility threshold**
    - **Validates: Requirements 9.1**

  - [ ]* 14.4 Write property test for non-hero image lazy loading and alt text (Property 4)
    - `// Feature: skycomfy-hotel-website, Property 4: Non-hero images use lazy loading and have non-empty alt text`
    - For any `GalleryImage` object: assert `alt` is a non-empty string and rendered `<img>` does not have `loading="eager"` or `fetchpriority="high"` (i.e., no `priority` prop)
    - Minimum 100 runs
    - **Property 4: Non-hero images use lazy loading and have non-empty alt text**
    - **Validates: Requirements 9.3, 20.2, 20.4**

  - [ ]* 14.5 Write property test for footer copyright year (Property 5)
    - `// Feature: skycomfy-hotel-website, Property 5: Footer copyright year matches the current year`
    - For any year returned by `new Date().getFullYear()`, render `<Footer>` and assert the copyright string contains that year
    - Minimum 100 runs
    - **Property 5: Footer copyright year matches the current year**
    - **Validates: Requirements 12.3**

  - [ ]* 14.6 Write property test for global layout components on every page (Property 6)
    - `// Feature: skycomfy-hotel-website, Property 6: Global layout components are present on every page`
    - For any route in `['/', '/about', '/rooms', '/gallery', '/contact']`, render the root layout and assert `<Footer>` and `<FloatingWhatsAppButton>` are present in the output
    - Minimum 100 runs
    - **Property 6: Global layout components are present on every page**
    - **Validates: Requirements 12.4, 17.1**

  - [ ]* 14.7 Write property test for contact form validation completeness (Property 7)
    - `// Feature: skycomfy-hotel-website, Property 7: Contact form validation covers all combinations of missing required fields`
    - For any non-empty subset of `['name', 'email', 'subject', 'message']` set to empty/whitespace, call `validate()` and assert every missing field has a corresponding error entry
    - Minimum 100 runs
    - **Property 7: Contact form validation covers all combinations of missing required fields**
    - **Validates: Requirements 16.5**

  - [ ]* 14.8 Write property test for unique page metadata (Property 8)
    - `// Feature: skycomfy-hotel-website, Property 8: All pages have unique, non-empty metadata titles and descriptions`
    - For any two distinct page routes, assert their `metadata.title` and `metadata.description` are both non-empty strings and differ from each other
    - Minimum 100 runs
    - **Property 8: All pages have unique, non-empty metadata titles and descriptions**
    - **Validates: Requirements 19.1**

- [ ] 15. Integration tests
  - [ ]* 15.1 Write integration tests for `sitemap.ts`
    - Test: returns exactly 5 URL entries
    - Test: all URLs are absolute and start with `https://www.skycomfyhotel.co.ke`
    - Test: all 5 page paths are present (`/`, `/about`, `/rooms`, `/gallery`, `/contact`)
    - Test: all entries have `lastModified`, `changeFrequency`, and `priority` fields
    - _Requirements: 19.5_

  - [ ]* 15.2 Write integration tests for `robots.ts`
    - Test: `rules.userAgent` equals `'*'`
    - Test: `rules.allow` equals `'/'`
    - Test: `sitemap` equals `'https://www.skycomfyhotel.co.ke/sitemap.xml'`
    - _Requirements: 19.6_

- [~] 16. Final checkpoint — all tests pass
  - Run `npm run test` and ensure all unit, property, and integration tests pass
  - Run `npm run build` and ensure no TypeScript or build errors
  - Ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP delivery
- Each task references specific requirements for full traceability
- Checkpoints (tasks 7, 12, 16) ensure incremental validation at logical milestones
- Property tests use **fast-check** with a minimum of 100 runs each
- Unit tests use **Vitest** + **React Testing Library**
- All animated components must check `useReducedMotion()` and collapse variants to no-ops when true
- The contact form simulates submission client-side (no backend in MVP); `status === 'error'` state is wired for future API integration
- All `next/image` usage outside hero/banner sections must omit the `priority` prop to ensure lazy loading
- Unsplash placeholder images are used throughout; real hotel photography replaces them post-MVP

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "1.3", "1.4"] },
    { "id": 2, "tasks": ["1.5", "1.6", "1.7", "1.8"] },
    { "id": 3, "tasks": ["2.1", "2.2", "2.3", "2.4", "2.5", "2.6", "2.7", "2.8"] },
    { "id": 4, "tasks": ["3.1", "3.2", "3.3", "3.4", "3.5", "3.6", "4.1"] },
    { "id": 5, "tasks": ["5.1", "5.2", "5.3"] },
    { "id": 6, "tasks": ["6.1", "6.2", "6.3", "6.4", "6.5", "6.6", "6.7", "6.8"] },
    { "id": 7, "tasks": ["6.9"] },
    { "id": 8, "tasks": ["8.1", "9.1", "10.1", "11.1"] },
    { "id": 9, "tasks": ["13.1"] },
    { "id": 10, "tasks": ["13.2", "13.3", "13.4", "13.5", "13.6", "13.7", "13.8"] },
    { "id": 11, "tasks": ["14.1", "14.2", "14.3", "14.4", "14.5", "14.6", "14.7", "14.8", "15.1", "15.2"] }
  ]
}
```
