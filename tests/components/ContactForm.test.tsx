import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '@/components/contact/ContactForm';

// Mock framer-motion to avoid animation issues in jsdom
vi.mock('framer-motion', () => ({
  motion: {
    form: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { initial, animate, exit, ...rest } = props as Record<string, unknown>;
      return <form {...rest}>{children}</form>;
    },
    div: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { initial, animate, exit, ...rest } = props as Record<string, unknown>;
      return <div {...rest}>{children}</div>;
    },
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useReducedMotion: () => false,
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Send: () => <svg data-testid="icon-send" />,
  AlertCircle: () => <svg data-testid="icon-alert" />,
  CheckCircle2: () => <svg data-testid="icon-check" />,
  Sparkles: () => <svg data-testid="icon-sparkles" />,
  MessageCircle: () => <svg data-testid="icon-message" />,
  XCircle: () => <svg data-testid="icon-xcircle" />,
}));

describe('ContactForm', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // ── Field rendering ──────────────────────────────────────────────────────

  it('renders all 5 fields with correct labels', () => {
    render(<ContactForm />);

    // Name field
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    // Email field
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    // Phone field (optional)
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    // Subject field
    expect(screen.getByLabelText(/subject of inquiry/i)).toBeInTheDocument();
    // Message field
    expect(screen.getByLabelText(/your message/i)).toBeInTheDocument();
  });

  it('renders the submit button', () => {
    render(<ContactForm />);
    expect(screen.getByRole('button', { name: /send inquiry/i })).toBeInTheDocument();
  });

  // ── Validation errors on empty submit ────────────────────────────────────

  it('shows validation errors for all required fields when submitting empty form', () => {
    render(<ContactForm />);

    fireEvent.submit(screen.getByRole('form', { hidden: true }) ?? screen.getByLabelText(/contact and booking inquiry form/i));

    expect(screen.getByText(/please enter your full name/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter your email address/i)).toBeInTheDocument();
    expect(screen.getByText(/please type a short message/i)).toBeInTheDocument();
  });

  it('shows invalid email error when email format is wrong', () => {
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'not-an-email' } });
    fireEvent.change(screen.getByLabelText(/your message/i), { target: { value: 'This is a valid message.' } });

    fireEvent.submit(screen.getByRole('form', { hidden: true }) ?? screen.getByLabelText(/contact and booking inquiry form/i));

    expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
  });

  it('shows message length error when message is fewer than 10 characters', () => {
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByLabelText(/your message/i), { target: { value: 'Short' } });

    fireEvent.submit(screen.getByRole('form', { hidden: true }) ?? screen.getByLabelText(/contact and booking inquiry form/i));

    expect(screen.getByText(/at least 10 characters/i)).toBeInTheDocument();
  });

  // ── Error clears when user types ─────────────────────────────────────────

  it('clears the name error when the user starts typing in the name field', () => {
    render(<ContactForm />);

    fireEvent.submit(screen.getByRole('form', { hidden: true }) ?? screen.getByLabelText(/contact and booking inquiry form/i));
    expect(screen.getByText(/please enter your full name/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'J' } });
    expect(screen.queryByText(/please enter your full name/i)).not.toBeInTheDocument();
  });

  it('clears the email error when the user starts typing in the email field', () => {
    render(<ContactForm />);

    fireEvent.submit(screen.getByRole('form', { hidden: true }) ?? screen.getByLabelText(/contact and booking inquiry form/i));
    expect(screen.getByText(/please enter your email address/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'a' } });
    expect(screen.queryByText(/please enter your email address/i)).not.toBeInTheDocument();
  });

  // ── Valid submission shows success screen ────────────────────────────────

  it('shows success screen after valid form submission', async () => {
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Alice Smith' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'alice@example.com' } });
    fireEvent.change(screen.getByLabelText(/your message/i), { target: { value: 'I would like to book a room for two nights.' } });

    fireEvent.submit(screen.getByRole('form', { hidden: true }) ?? screen.getByLabelText(/contact and booking inquiry form/i));

    // Advance the simulated 1-second API delay and flush all pending state updates
    await act(async () => {
      vi.advanceTimersByTime(1500);
    });

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/delivery successful/i)).toBeInTheDocument();
  });

  // ── Success screen shows user's name ─────────────────────────────────────

  it("shows the user's name in the success screen", async () => {
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Bob Johnson' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'bob@example.com' } });
    fireEvent.change(screen.getByLabelText(/your message/i), { target: { value: 'Please confirm my reservation details.' } });

    fireEvent.submit(screen.getByRole('form', { hidden: true }) ?? screen.getByLabelText(/contact and booking inquiry form/i));

    await act(async () => {
      vi.advanceTimersByTime(1500);
    });

    expect(screen.getByText(/thank you, bob johnson/i)).toBeInTheDocument();
  });
});
