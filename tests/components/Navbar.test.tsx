import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '@/components/layout/Navbar';
import { navLinks } from '@/constants/navigation';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/'),
}));

// Mock next/link to render a plain anchor
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock framer-motion to avoid animation issues in jsdom
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => <div {...props}>{children}</div>,
    li: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => <li {...props}>{children}</li>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useReducedMotion: () => false,
}));

import { usePathname } from 'next/navigation';

describe('Navbar', () => {
  beforeEach(() => {
    vi.mocked(usePathname).mockReturnValue('/');
  });

  it('renders the hotel logo/name', () => {
    render(<Navbar />);
    // The logo text "SKYCOMFY" should be visible
    expect(screen.getAllByText(/SKYCOMFY/i).length).toBeGreaterThan(0);
  });

  it('renders all 5 nav links in the desktop nav', () => {
    render(<Navbar />);
    // Desktop nav links use role="listitem" (inside a role="list" div)
    // Query by href to verify all nav links are present
    for (const link of navLinks) {
      const anchor = document.querySelector(`a[href="${link.href}"][role="listitem"]`);
      expect(anchor).not.toBeNull();
      expect(anchor?.textContent).toContain(link.label);
    }
  });

  it('renders the "Book Now" CTA button linking to /contact', () => {
    render(<Navbar />);
    const bookNowLinks = screen.getAllByRole('link', { name: /book now/i });
    expect(bookNowLinks.length).toBeGreaterThan(0);
    expect(bookNowLinks[0]).toHaveAttribute('href', '/contact');
  });

  it('hamburger button has correct aria-label', () => {
    render(<Navbar />);
    const hamburger = screen.getByRole('button', { name: /open navigation menu/i });
    expect(hamburger).toBeInTheDocument();
  });

  it('mobile menu opens when hamburger button is clicked', () => {
    render(<Navbar />);
    // Mobile menu should not be visible initially
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    const hamburger = screen.getByRole('button', { name: /open navigation menu/i });
    fireEvent.click(hamburger);

    // Mobile menu dialog should now be present
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('hamburger button aria-expanded reflects menu state', () => {
    render(<Navbar />);
    const hamburger = screen.getByRole('button', { name: /open navigation menu/i });

    expect(hamburger).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(hamburger);
    expect(hamburger).toHaveAttribute('aria-expanded', 'true');
  });

  it('mobile menu closes when a nav link inside it is clicked', () => {
    render(<Navbar />);
    const hamburger = screen.getByRole('button', { name: /open navigation menu/i });
    fireEvent.click(hamburger);

    // Menu is open
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Click the first nav link inside the mobile menu
    const mobileNav = screen.getByRole('navigation', { name: /mobile navigation links/i });
    const firstLink = mobileNav.querySelector('a');
    expect(firstLink).not.toBeNull();
    fireEvent.click(firstLink!);

    // Menu should be closed
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('active link has aria-current="page" for the current pathname', () => {
    vi.mocked(usePathname).mockReturnValue('/rooms');
    render(<Navbar />);

    // Desktop nav links use role="listitem"; query by href
    const roomsLink = document.querySelector('a[href="/rooms"][role="listitem"]');
    expect(roomsLink).not.toBeNull();
    expect(roomsLink?.getAttribute('aria-current')).toBe('page');
  });

  it('non-active links do not have aria-current="page"', () => {
    vi.mocked(usePathname).mockReturnValue('/rooms');
    render(<Navbar />);

    // "About" desktop nav link should not be active
    const aboutLink = document.querySelector('a[href="/about"][role="listitem"]');
    expect(aboutLink).not.toBeNull();
    expect(aboutLink?.getAttribute('aria-current')).not.toBe('page');
  });
});
