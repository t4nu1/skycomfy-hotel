import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import GalleryPreview from '@/components/home/GalleryPreview';
import type { GalleryImage } from '@/types';

// Mock next/link
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

// Mock next/image
vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    ...props
  }: {
    src: string;
    alt: string;
    [key: string]: unknown;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  ),
}));

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      ...props
    }: {
      children?: React.ReactNode;
      [key: string]: unknown;
    }) => <div {...props}>{children}</div>,
  },
  useReducedMotion: () => false,
  useInView: () => true,
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock SectionWrapper to render children directly
vi.mock('@/components/ui/SectionWrapper', () => ({
  default: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <div className={className}>{children}</div>,
}));

// Mock GalleryImage component
vi.mock('@/components/gallery/GalleryImage', () => ({
  default: ({
    image,
    index,
  }: {
    image: GalleryImage;
    index: number;
    onClick: (index: number) => void;
    priority?: boolean;
  }) => <img src={image.src} alt={image.alt} data-index={index} />,
}));

// Helper to build a minimal GalleryImage
function makeImage(id: string): GalleryImage {
  return {
    id,
    src: `https://example.com/image-${id}.jpg`,
    alt: `Gallery image ${id}`,
    category: 'rooms',
    width: 800,
    height: 600,
  };
}

const sixImages = Array.from({ length: 6 }, (_, i) => makeImage(String(i + 1)));
const tenImages = Array.from({ length: 10 }, (_, i) => makeImage(String(i + 1)));
const fiveImages = Array.from({ length: 5 }, (_, i) => makeImage(String(i + 1)));

describe('GalleryPreview', () => {
  it('renders null when given fewer than 6 images', () => {
    const { container } = render(<GalleryPreview images={fiveImages} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders null when given an empty array', () => {
    const { container } = render(<GalleryPreview images={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders exactly 6 images when given exactly 6 images', () => {
    render(<GalleryPreview images={sixImages} />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(6);
  });

  it('renders only 6 images when given more than 6 images', () => {
    render(<GalleryPreview images={tenImages} />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(6);
  });

  it('renders a "View Full Gallery" link pointing to /gallery', () => {
    render(<GalleryPreview images={sixImages} />);
    const link = screen.getByRole('link', { name: /view full gallery/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/gallery');
  });

  it('does not render the "View Full Gallery" link when images < 6', () => {
    render(<GalleryPreview images={fiveImages} />);
    expect(screen.queryByRole('link', { name: /view full gallery/i })).not.toBeInTheDocument();
  });

  it('all rendered images have non-empty alt text', () => {
    render(<GalleryPreview images={sixImages} />);
    const images = screen.getAllByRole('img');
    images.forEach((img) => {
      expect(img).toHaveAttribute('alt');
      expect(img.getAttribute('alt')).not.toBe('');
    });
  });
});
