import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FloatingWhatsAppButton from '@/components/ui/FloatingWhatsAppButton';

describe('FloatingWhatsAppButton', () => {
  it('renders a link with the correct WhatsApp href', () => {
    render(<FloatingWhatsAppButton />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://wa.me/254747118328');
  });

  it('opens in a new tab with target="_blank"', () => {
    render(<FloatingWhatsAppButton />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('has rel="noopener noreferrer" for security', () => {
    render(<FloatingWhatsAppButton />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('has an accessible aria-label', () => {
    render(<FloatingWhatsAppButton />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-label');
    expect(link.getAttribute('aria-label')).toBeTruthy();
  });

  it('renders the WhatsApp SVG icon', () => {
    render(<FloatingWhatsAppButton />);
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });
});
