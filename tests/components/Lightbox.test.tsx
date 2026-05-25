import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Lightbox from '@/components/gallery/Lightbox';
import type { GalleryImage } from '@/types';

// next/image doesn't render well in jsdom — mock it with a plain <img>
vi.mock('next/image', () => ({
  default: ({ src, alt, ...rest }: { src: string; alt: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...rest} />
  ),
}));

// framer-motion AnimatePresence / motion.div don't animate in jsdom — render children directly
vi.mock('framer-motion', async (importOriginal) => {
  const actual = await importOriginal<typeof import('framer-motion')>();
  return {
    ...actual,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    motion: {
      ...actual.motion,
      div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) => (
        <div {...props}>{children}</div>
      ),
    },
    useReducedMotion: () => false,
  };
});

const mockImages: GalleryImage[] = [
  {
    id: '1',
    src: 'https://example.com/image1.jpg',
    alt: 'Room one',
    category: 'rooms',
    width: 800,
    height: 600,
  },
  {
    id: '2',
    src: 'https://example.com/image2.jpg',
    alt: 'Room two',
    category: 'rooms',
    width: 800,
    height: 600,
  },
  {
    id: '3',
    src: 'https://example.com/image3.jpg',
    alt: 'Garden view',
    category: 'garden',
    width: 800,
    height: 600,
  },
];

const defaultProps = {
  images: mockImages,
  currentIndex: 0,
  isOpen: true,
  onClose: vi.fn(),
  onPrev: vi.fn(),
  onNext: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Lightbox', () => {
  it('renders nothing when isOpen is false', () => {
    const { container } = render(<Lightbox {...defaultProps} isOpen={false} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing when images array is empty', () => {
    const { container } = render(<Lightbox {...defaultProps} images={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing when currentIndex is out of bounds', () => {
    const { container } = render(<Lightbox {...defaultProps} currentIndex={99} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the current image when isOpen is true', () => {
    render(<Lightbox {...defaultProps} />);
    const img = screen.getByRole('img', { name: 'Room one' });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/image1.jpg');
  });

  it('renders the correct image for the given currentIndex', () => {
    render(<Lightbox {...defaultProps} currentIndex={1} />);
    const img = screen.getByRole('img', { name: 'Room two' });
    expect(img).toBeInTheDocument();
  });

  it('has aria-modal="true" when open', () => {
    render(<Lightbox {...defaultProps} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('calls onClose when the close button is clicked', async () => {
    const onClose = vi.fn();
    render(<Lightbox {...defaultProps} onClose={onClose} />);
    await userEvent.click(screen.getByRole('button', { name: /close lightbox/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onPrev when the previous button is clicked', async () => {
    const onPrev = vi.fn();
    render(<Lightbox {...defaultProps} onPrev={onPrev} />);
    await userEvent.click(screen.getByRole('button', { name: /previous image/i }));
    expect(onPrev).toHaveBeenCalledTimes(1);
  });

  it('calls onNext when the next button is clicked', async () => {
    const onNext = vi.fn();
    render(<Lightbox {...defaultProps} onNext={onNext} />);
    await userEvent.click(screen.getByRole('button', { name: /next image/i }));
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when the Escape key is pressed', async () => {
    const onClose = vi.fn();
    render(<Lightbox {...defaultProps} onClose={onClose} />);
    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onPrev when the ArrowLeft key is pressed', async () => {
    const onPrev = vi.fn();
    render(<Lightbox {...defaultProps} onPrev={onPrev} />);
    await userEvent.keyboard('{ArrowLeft}');
    expect(onPrev).toHaveBeenCalledTimes(1);
  });

  it('calls onNext when the ArrowRight key is pressed', async () => {
    const onNext = vi.fn();
    render(<Lightbox {...defaultProps} onNext={onNext} />);
    await userEvent.keyboard('{ArrowRight}');
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when the backdrop overlay is clicked', async () => {
    const onClose = vi.fn();
    render(<Lightbox {...defaultProps} onClose={onClose} />);
    // The dialog element itself is the backdrop; clicking it triggers onClose
    const dialog = screen.getByRole('dialog');
    await userEvent.click(dialog);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('shows the correct image counter position', () => {
    render(<Lightbox {...defaultProps} currentIndex={1} />);
    // Counter should show "2 / 3"
    expect(screen.getByText('2 / 3')).toBeInTheDocument();
  });

  it('shows counter starting at 1 for the first image', () => {
    render(<Lightbox {...defaultProps} currentIndex={0} />);
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });

  it('shows counter at the last position for the last image', () => {
    render(<Lightbox {...defaultProps} currentIndex={2} />);
    expect(screen.getByText('3 / 3')).toBeInTheDocument();
  });

  it('does not render prev/next buttons when there is only one image', () => {
    render(<Lightbox {...defaultProps} images={[mockImages[0]]} currentIndex={0} />);
    expect(screen.queryByRole('button', { name: /previous image/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /next image/i })).not.toBeInTheDocument();
  });
});
