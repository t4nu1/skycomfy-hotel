import { Room } from '@/types';

export const rooms: Room[] = [
  {
    id: 'standard',
    name: 'Standard Room',
    slug: 'standard-room',
    shortDescription: 'Comfortable and well-appointed for the discerning traveller.',
    fullDescription:
      'Our Standard Rooms offer a peaceful retreat with all the essentials for a restful stay. Each room is tastefully furnished with a plush bed, modern en-suite bathroom, flat-screen TV, and complimentary high-speed Wi-Fi. Air conditioning ensures a comfortable temperature year-round, while daily housekeeping keeps your space immaculate throughout your visit.',
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800',
    ],
    amenities: [
      'Free Wi-Fi',
      'Air Conditioning',
      'En-suite Bathroom',
      'Flat-screen TV',
      'Daily Housekeeping',
    ],
    priceFrom: 'KES 4,500/night',
  },
  {
    id: 'deluxe',
    name: 'Deluxe Room',
    slug: 'deluxe-room',
    shortDescription: 'Elevated comfort with premium furnishings and garden views.',
    fullDescription:
      'The Deluxe Room elevates your stay with premium bedding, a king-size bed, and serene garden views that invite relaxation. Thoughtfully designed interiors blend warmth and sophistication, complemented by a well-stocked mini bar and a spacious en-suite bathroom. Ideal for couples and business travellers seeking a superior level of comfort.',
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
    ],
    amenities: [
      'Free Wi-Fi',
      'Air Conditioning',
      'King Bed',
      'Garden View',
      'Mini Bar',
      'En-suite Bathroom',
    ],
    priceFrom: 'KES 6,500/night',
  },
  {
    id: 'executive',
    name: 'Executive Suite',
    slug: 'executive-suite',
    shortDescription: 'The pinnacle of luxury — a spacious suite for the most discerning guests.',
    fullDescription:
      'Our Executive Suite is the finest accommodation at SKYCOMFY HOTEL KITALE. Featuring a generous living area, a king-size bed with premium linens, a deep-soak bathtub, and a fully stocked mini bar, every detail has been curated for an exceptional experience. Perfect for extended stays, honeymoons, and guests who expect nothing but the best.',
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
    ],
    amenities: [
      'Free Wi-Fi',
      'Air Conditioning',
      'King Bed',
      'Sitting Area',
      'Mini Bar',
      'Bathtub',
      'Premium Toiletries',
    ],
    priceFrom: 'KES 9,500/night',
  },
];
