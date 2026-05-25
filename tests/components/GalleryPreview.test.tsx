import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { GalleryImage } from '@/types';

// ── Helper ────────────────────────────────────────────────────────────────────
function makeImage(id: string): GalleryImage {
  return {
    id,
    src: `/images/gallery/image-${id}.jpg`,
    alt: `Gallery image ${id}`,
    category: 'rooms',
    width: 400,
    height: 300,
  };
}

const sixImages = Array.from({ length: 6 }, (_, i) => makeImage(String(i + 1)));
const fiveImages = Array.from({ length: 5 }, (_, i) => makeImage(String(i + 1)));

// ── Mocks ─────────────────────────────────────────────────────────────────────

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
  }: {
    src: string;
    alt: string;
    [key: string]: unknown;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      ...props
    }: {
      children?: React.ReactNode;
      [key: string]: unknown;
    }) => <div>{children}</div>,
  },
  useReducedMotion: () => false,
  useInView: () => true,
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock('@/components/ui/SectionWrapper', () => ({
  default: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <div className={className}>{children}</div>,
}));

// ── Control the gallery constant via a mutable ref ────────────────────────────
// vi.hoisted cannot reference module-level variables — use a plain object instead.
const galleryMock = { images: [] as GalleryImage[] };

vi.mock('@/constants/gallery', () => ({
  get galleryImages() {
    return galleryMock.images;
  },
}));

// ── Tests ─────────────────────────────────────────────────────────────────────
describe('GalleryPreview', () => {
  beforeEach(() => {
    galleryMock.images = sixImages;
    vi.resetModules();
  });

  it('renders null when gallery has fewer than 6 images', async () => {
    galleryMock.images = fiveImages;
    const { default: GalleryPreview } = await import('@/components/home/GalleryPreview');
    const { container } = render(<GalleryPreview />);
    expect(container.firstChild).toBeNull();
  });

  it('renders null when gallery is empty', async () => {
    galleryMock.images = [];
    const { default: GalleryPreview } = await import('@/components/home/GalleryPreview');
    const { container } = render(<GalleryPreview />);
    expect(container.firstChild).toBeNull();
  });

  it('renders images when gallery has exactly 6 images', async () => {
    galleryMock.images = sixImages;
    const { default: GalleryPreview } = await import('@/components/home/GalleryPreview');
    render(<GalleryPreview />);
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThanOrEqual(6);
  });

  it('renders a "View Full Gallery" link pointing to /gallery', async () => {
    galleryMock.images = sixImages;
    const { default: GalleryPreview } = await import('@/components/home/GalleryPreview');
    render(<GalleryPreview />);
    const link = screen.getByRole('link', { name: /view full gallery/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/gallery');
  });

  it('does not render the "View Full Gallery" link when images < 6', async () => {
    galleryMock.images = fiveImages;
    const { default: GalleryPreview } = await import('@/components/home/GalleryPreview');
    render(<GalleryPreview />);
    expect(screen.queryByRole('link', { name: /view full gallery/i })).not.toBeInTheDocument();
  });

  it('all rendered images have non-empty alt text', async () => {
    galleryMock.images = sixImages;
    const { default: GalleryPreview } = await import('@/components/home/GalleryPreview');
    render(<GalleryPreview />);
    const images = screen.getAllByRole('img');
    images.forEach((img) => {
      expect(img).toHaveAttribute('alt');
      expect(img.getAttribute('alt')).not.toBe('');
    });
  });
});
