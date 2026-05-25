'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, AlertCircle, CheckCircle2, Sparkles, MessageCircle, XCircle } from 'lucide-react';
import type { ContactFormData, ContactFormErrors } from '@/types';

// ─── Types ────────────────────────────────────────────────────────────────────

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

// ─── Constants ────────────────────────────────────────────────────────────────

const WHATSAPP_NUMBER = '254747118328';

const INITIAL_FORM_DATA: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  subject: 'Room Reservation',
  message: '',
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!data.name.trim()) {
    errors.name = 'Please enter your full name.';
  }

  if (!data.email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!data.subject.trim()) {
    errors.subject = 'Please select or enter an inquiry subject.';
  }

  if (!data.message.trim()) {
    errors.message = 'Please type a short message detailing your request.';
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message details should be at least 10 characters long.';
  }

  return errors;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the field error as the user corrects it
    if (errors[name as keyof ContactFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('submitting');

    // Simulate API call — replace with real fetch() when backend is ready
    setTimeout(() => {
      setStatus('success');
    }, 1000);
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setStatus('idle');
  };

  // ── Derived ───────────────────────────────────────────────────────────────

  const isSubmitting = status === 'submitting';
  const hasErrors = Object.keys(errors).length > 0;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="bg-surface rounded-card border border-border p-6 md:p-10 shadow-card">
      <AnimatePresence mode="wait">
        {status !== 'success' ? (
          <motion.form
            key="contact-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
            noValidate
            aria-label="Contact and booking inquiry form"
          >
            {/* Form header */}
            <div className="flex flex-col gap-2 mb-2">
              <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground">
                Send Booking Inquiry
              </h3>
              <p className="font-sans text-xs md:text-sm text-muted">
                Complete the fields below and we&apos;ll reply to your email or call you back
                directly within 1 hour.
              </p>
            </div>

            {/* Error summary banner */}
            <AnimatePresence>
              {status === 'error' && (
                <motion.div
                  role="alert"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-btn text-red-700"
                >
                  <XCircle size={18} className="shrink-0 mt-0.5" />
                  <p className="font-sans text-sm">
                    Something went wrong. Please try again or contact us directly via WhatsApp.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Inline validation summary (screen-reader friendly) */}
            {hasErrors && (
              <p className="sr-only" role="alert">
                The form has validation errors. Please review the fields below.
              </p>
            )}

            {/* ── Name ── */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="form-name"
                className="font-sans text-xs font-bold text-foreground uppercase tracking-wider"
              >
                Full Name <span aria-hidden="true">*</span>
                <span className="sr-only">(required)</span>
              </label>
              <input
                id="form-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                autoComplete="name"
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'error-name' : undefined}
                className={`w-full bg-background border rounded-btn py-2.5 px-4 text-sm font-sans focus:outline-none transition-colors ${
                  errors.name
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-border focus:border-accent'
                }`}
              />
              {errors.name && (
                <span
                  id="error-name"
                  role="alert"
                  className="font-sans text-xs text-red-500 flex items-center gap-1 mt-0.5"
                >
                  <AlertCircle size={12} aria-hidden="true" />
                  {errors.name}
                </span>
              )}
            </div>

            {/* ── Email / Phone ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="form-email"
                  className="font-sans text-xs font-bold text-foreground uppercase tracking-wider"
                >
                  Email Address <span aria-hidden="true">*</span>
                  <span className="sr-only">(required)</span>
                </label>
                <input
                  id="form-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  autoComplete="email"
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'error-email' : undefined}
                  className={`w-full bg-background border rounded-btn py-2.5 px-4 text-sm font-sans focus:outline-none transition-colors ${
                    errors.email
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-border focus:border-accent'
                  }`}
                />
                {errors.email && (
                  <span
                    id="error-email"
                    role="alert"
                    className="font-sans text-xs text-red-500 flex items-center gap-1 mt-0.5"
                  >
                    <AlertCircle size={12} aria-hidden="true" />
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Phone (optional) */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="form-phone"
                  className="font-sans text-xs font-bold text-foreground uppercase tracking-wider"
                >
                  Phone Number{' '}
                  <span className="font-normal normal-case text-muted">(Optional)</span>
                </label>
                <input
                  id="form-phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+254 7XX XXX XXX"
                  autoComplete="tel"
                  className="w-full bg-background border border-border focus:border-accent rounded-btn py-2.5 px-4 text-sm font-sans focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* ── Subject ── */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="form-subject"
                className="font-sans text-xs font-bold text-foreground uppercase tracking-wider"
              >
                Subject of Inquiry <span aria-hidden="true">*</span>
                <span className="sr-only">(required)</span>
              </label>
              <select
                id="form-subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={!!errors.subject}
                aria-describedby={errors.subject ? 'error-subject' : undefined}
                className={`w-full bg-background border rounded-btn py-2.5 px-4 text-sm font-sans focus:outline-none transition-colors appearance-none cursor-pointer ${
                  errors.subject
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-border focus:border-accent'
                }`}
              >
                <option value="Room Reservation">Room &amp; Stay Reservation</option>
                <option value="Garden Venue Event">Garden Venue &amp; Weddings</option>
                <option value="Conference Facility">Conference &amp; Business Events</option>
                <option value="General Question">General Inquiry</option>
              </select>
              {errors.subject && (
                <span
                  id="error-subject"
                  role="alert"
                  className="font-sans text-xs text-red-500 flex items-center gap-1 mt-0.5"
                >
                  <AlertCircle size={12} aria-hidden="true" />
                  {errors.subject}
                </span>
              )}
            </div>

            {/* ── Message ── */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="form-message"
                className="font-sans text-xs font-bold text-foreground uppercase tracking-wider"
              >
                Your Message <span aria-hidden="true">*</span>
                <span className="sr-only">(required, minimum 10 characters)</span>
              </label>
              <textarea
                id="form-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Type details about your inquiry here (e.g. check-in/out dates, guest counts, wedding layout requests...)"
                aria-required="true"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'error-message' : undefined}
                className={`w-full bg-background border rounded-btn py-2.5 px-4 text-sm font-sans focus:outline-none transition-colors resize-y ${
                  errors.message
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-border focus:border-accent'
                }`}
              />
              {errors.message && (
                <span
                  id="error-message"
                  role="alert"
                  className="font-sans text-xs text-red-500 flex items-center gap-1 mt-0.5"
                >
                  <AlertCircle size={12} aria-hidden="true" />
                  {errors.message}
                </span>
              )}
            </div>

            {/* ── Submit ── */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-primary hover:bg-primary-light text-white font-sans font-bold text-sm rounded-btn shadow-md flex items-center justify-center gap-2 transition-colors duration-200 disabled:opacity-75 cursor-pointer mt-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {isSubmitting ? (
                <>
                  <div
                    className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                    aria-hidden="true"
                  />
                  <span>Sending…</span>
                </>
              ) : (
                <>
                  <Send size={15} aria-hidden="true" />
                  Send Inquiry
                </>
              )}
            </button>
          </motion.form>
        ) : (
          /* ── Success screen ── */
          <motion.div
            key="success-screen"
            role="alert"
            aria-live="polite"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-8 flex flex-col items-center gap-6"
          >
            <div className="h-16 w-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center shadow-inner">
              <CheckCircle2 size={36} strokeWidth={2.5} aria-hidden="true" />
            </div>

            <div className="flex flex-col gap-3">
              <span className="font-sans text-xs font-bold text-accent uppercase tracking-widest flex items-center justify-center gap-1">
                <Sparkles size={12} className="fill-accent" aria-hidden="true" />
                Delivery Successful
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                Thank You, {formData.name}!
              </h3>
              <p className="font-sans text-sm text-muted leading-relaxed max-w-md mx-auto">
                We have received your reservation inquiry. Our booking desk will review the
                details and reach out to you via{' '}
                <strong className="text-foreground">{formData.email}</strong> within 1–2 hours.
              </p>
            </div>

            {/* Success actions */}
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-4">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20Skycomfy%20Hotel%20Kitale,%20my%20name%20is%20${encodeURIComponent(
                  formData.name
                )}.%20I%20just%20submitted%20a%20website%20inquiry%20for%20a%20${encodeURIComponent(
                  formData.subject
                )}.`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow up on WhatsApp (opens in new tab)"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-sans font-bold text-sm rounded-btn transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
              >
                <MessageCircle size={16} className="fill-white" aria-hidden="true" />
                Follow up on WhatsApp
              </a>

              <button
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-transparent border-2 border-primary/20 hover:border-primary/50 text-primary font-sans font-semibold text-sm rounded-btn transition-colors duration-200 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Send Another Message
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
