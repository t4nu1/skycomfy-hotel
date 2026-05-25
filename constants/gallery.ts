import { GalleryImage } from '@/types';

/**
 * Real photos from SKYCOMFY HOTEL KITALE.
 * All images are local assets served from /public/images/.
 * Categorized by content for the gallery filter tabs.
 */
export const galleryImages: GalleryImage[] = [
  /* ── Rooms & Suites ── */
  {
    id: 'g-room-01',
    src: '/images/gallery/room-interior-01.jpg',
    alt: 'Elegantly furnished room interior at SKYCOMFY HOTEL KITALE',
    category: 'rooms',
    width: 400,
    height: 533,
  },
  {
    id: 'g-room-02',
    src: '/images/gallery/room-interior-02.jpg',
    alt: 'Comfortable bedroom with warm lighting at SKYCOMFY HOTEL KITALE',
    category: 'rooms',
    width: 400,
    height: 533,
  },
  {
    id: 'g-room-03',
    src: '/images/gallery/room-interior-03.jpg',
    alt: 'Spacious room with quality furnishings at SKYCOMFY HOTEL KITALE',
    category: 'rooms',
    width: 400,
    height: 300,
  },

  /* ── Restaurant & Dining ── */
  {
    id: 'g-dining-01',
    src: '/images/gallery/restaurant-ambience-01.jpg',
    alt: 'Warm restaurant ambience at SKYCOMFY HOTEL KITALE',
    category: 'restaurant',
    width: 400,
    height: 533,
  },
  {
    id: 'g-dining-02',
    src: '/images/gallery/restaurant-interior-02.jpg',
    alt: 'Restaurant interior and dining area at SKYCOMFY HOTEL KITALE',
    category: 'restaurant',
    width: 400,
    height: 224,
  },
  {
    id: 'g-dining-03',
    src: '/images/gallery/dining-food-01.jpg',
    alt: 'Freshly prepared cuisine served at SKYCOMFY HOTEL KITALE',
    category: 'restaurant',
    width: 400,
    height: 533,
  },

  /* ── Exterior & Entrance ── */
  {
    id: 'g-ext-01',
    src: '/images/gallery/hotel-exterior-01.jpg',
    alt: 'SKYCOMFY HOTEL KITALE exterior view',
    category: 'events',
    width: 400,
    height: 224,
  },
  {
    id: 'g-ext-02',
    src: '/images/gallery/hotel-entrance-02.jpg',
    alt: 'Hotel entrance and reception area at SKYCOMFY HOTEL KITALE',
    category: 'events',
    width: 400,
    height: 300,
  },
  {
    id: 'g-ext-03',
    src: '/images/gallery/hotel-exterior-03.jpg',
    alt: 'SKYCOMFY HOTEL KITALE building and grounds',
    category: 'events',
    width: 400,
    height: 224,
  },

  /* ── Garden & Ambience ── */
  {
    id: 'g-garden-01',
    src: '/images/gallery/hotel-garden-01.jpg',
    alt: 'Serene garden and outdoor space at SKYCOMFY HOTEL KITALE',
    category: 'garden',
    width: 400,
    height: 300,
  },
  {
    id: 'g-ambience-01',
    src: '/images/gallery/hotel-ambience-evening.jpg',
    alt: 'Evening ambience and atmosphere at SKYCOMFY HOTEL KITALE',
    category: 'garden',
    width: 400,
    height: 300,
  },
];
