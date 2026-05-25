import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Footer from '@/components/layout/Footer';

// Mock next/link since we're in a jsdom environment
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe('Footer', () => {
  it('renders the hotel name', () => {
    render(<Footer />);
    // The brand link points to "/" and contains the hotel name text
    const footer = document.querySelector('footer');
    const brandLink = footer?.querySelector('a[href="/"]');
    expect(brandLink).toBeInTheDocument();
    expect(brandLink?.textContent).toMatch(/SKYCOMFY/i);
  });

  it('renders all quick nav links', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /rooms & suites/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about us/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /gallery/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
  });

  it('renders both phone numbers as tel: links', () => {
    render(<Footer />);
    const phone1 = screen.getByRole('link', { name: /\+254 747 118 328/i });
    const phone2 = screen.getByRole('link', { name: /\+254 719 530 249/i });
    expect(phone1).toHaveAttribute('href', 'tel:+254747118328');
    expect(phone2).toHaveAttribute('href', 'tel:+254719530249');
  });

  it('renders the address', () => {
    render(<Footer />);
    expect(screen.getByText(/Kitale-Kapenguria Highway/i)).toBeInTheDocument();
    // "Trans-Nzoia County" appears in both the address and the bottom bar — use getAllByText
    const countyMatches = screen.getAllByText(/Trans-Nzoia County/i);
    expect(countyMatches.length).toBeGreaterThanOrEqual(1);
  });

  it('renders the copyright notice with the current year', () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(String(year)))).toBeInTheDocument();
    expect(screen.getByText(/SKYCOMFY HOTEL KITALE/i)).toBeInTheDocument();
  });

  it('renders social media links with aria-labels', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /follow us on instagram/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /follow us on tiktok/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /follow us on x/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /follow us on facebook/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /follow us on youtube/i })).toBeInTheDocument();
  });

  it('renders the email contact link', () => {
    render(<Footer />);
    const emailLink = screen.getByRole('link', { name: /info@skycomfyhotel\.com/i });
    expect(emailLink).toHaveAttribute('href', 'mailto:info@skycomfyhotel.com');
  });

  it('renders the newsletter subscription section', () => {
    render(<Footer />);
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument();
  });
});
