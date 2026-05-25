import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import PageFadeIn from '@/components/ui/PageFadeIn';
import SectionWrapper from '@/components/ui/SectionWrapper';
import InnerPageHero from '@/components/ui/InnerPageHero';
import ContactForm from '@/components/contact/ContactForm';

/* ─────────────────────────────────────────────────────────────
   Page metadata — Requirements 19.1, 19.2, 19.3
───────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: 'Contact & Reservations',
  description:
    'Get in touch with SKYCOMFY HOTEL KITALE for room reservations, garden event bookings, conference enquiries, or general questions. Call, email, or send us a message.',
  openGraph: {
    title: 'Contact SKYCOMFY HOTEL KITALE — Reservations & Enquiries',
    description:
      'Reach our booking team for room reservations, garden weddings, conference facilities, and general enquiries. Located off the Kitale-Kapenguria Highway, Kenya.',
    url: 'https://www.skycomfyhotel.co.ke/contact',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SKYCOMFY HOTEL KITALE — Contact Us',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact SKYCOMFY HOTEL KITALE',
    description:
      'Reservations, event bookings, and general enquiries — premium hotel in Kitale, Kenya.',
    images: ['/og-image.jpg'],
  },
};

/* ─────────────────────────────────────────────────────────────
   Constants
───────────────────────────────────────────────────────────── */
const MAP_IFRAME_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.4682056157813!2d34.99616787496695!3d1.0191599989679659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1782276cb0db7ad3%3A0xe543eaec166d1f05!2sKitale!5e0!3m2!1sen!2ske!4v1716200000000!5m2!1sen!2ske';

/* ─────────────────────────────────────────────────────────────
   Contact Page — Server Component
   Requirements: 16.1, 16.2, 16.3, 16.4, 16.5, 16.6, 16.7,
                 16.8, 16.9, 19.1, 19.2, 19.3
───────────────────────────────────────────────────────────── */
export default function ContactPage() {
  return (
    <PageFadeIn>
      {/* ── 1. INNER-PAGE HERO BANNER ── */}
      <InnerPageHero
        eyebrow="Get In Touch"
        title="Contact &amp; Reservations"
        imageSrc="/images/exterior/hotel-entrance-02.jpg"
        imageAlt="SKYCOMFY HOTEL KITALE entrance — welcoming guests in Kitale, Kenya"
      />

      {/* ── 2. CONTACT COLUMNS SECTION ── */}
      <section
        className="bg-background py-16 md:py-24"
        aria-labelledby="contact-section-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section intro */}
          <SectionWrapper direction="up">
            <div className="text-center max-w-2xl mx-auto mb-14 flex flex-col items-center gap-4">
              <span className="font-sans text-xs md:text-sm font-semibold tracking-wider text-accent uppercase">
                We&apos;d Love to Hear From You
              </span>
              <h2
                id="contact-section-heading"
                className="font-serif text-3xl md:text-4xl font-bold text-foreground"
              >
                Reach Our Booking Team
              </h2>
              <div className="w-16 h-1 bg-accent rounded-full" aria-hidden="true" />
              <p className="font-sans text-sm md:text-base text-muted leading-relaxed">
                Whether you have questions about room rates, availability, garden weddings,
                or conference facilities — our team is ready to assist you.
              </p>
            </div>
          </SectionWrapper>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* ── LEFT COLUMN: Contact info + Map (5 cols) ── */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <SectionWrapper direction="left">
                <div className="flex flex-col gap-6">
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground">
                    Connect With Our Managers
                  </h3>
                  <p className="font-sans text-sm text-muted leading-relaxed">
                    Reach out via phone, email, or WhatsApp. Our booking desk is available
                    around the clock to handle your enquiries.
                  </p>

                  <div className="flex flex-col gap-4">
                    {/* Phone card */}
                    <div className="flex items-start gap-4 p-4 bg-surface rounded-card border border-border shadow-sm">
                      <div
                        className="h-10 w-10 bg-accent/10 text-accent rounded-full flex items-center justify-center shrink-0"
                        aria-hidden="true"
                      >
                        <Phone size={18} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-sans text-xs font-bold text-foreground uppercase tracking-wider">
                          Call Reservations
                        </span>
                        <a
                          href="tel:+254747118328"
                          className="font-sans text-sm text-muted hover:text-accent transition-colors duration-200"
                        >
                          +254 747 118 328
                        </a>
                        <a
                          href="tel:+254719530249"
                          className="font-sans text-sm text-muted hover:text-accent transition-colors duration-200"
                        >
                          +254 719 530 249
                        </a>
                      </div>
                    </div>

                    {/* Email card */}
                    <div className="flex items-start gap-4 p-4 bg-surface rounded-card border border-border shadow-sm">
                      <div
                        className="h-10 w-10 bg-accent/10 text-accent rounded-full flex items-center justify-center shrink-0"
                        aria-hidden="true"
                      >
                        <Mail size={18} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-sans text-xs font-bold text-foreground uppercase tracking-wider">
                          Email Enquiries
                        </span>
                        <a
                          href="mailto:info@skycomfyhotel.com"
                          className="font-sans text-sm text-muted hover:text-accent transition-colors duration-200 break-all"
                        >
                          info@skycomfyhotel.com
                        </a>
                      </div>
                    </div>

                    {/* Address card */}
                    <div className="flex items-start gap-4 p-4 bg-surface rounded-card border border-border shadow-sm">
                      <div
                        className="h-10 w-10 bg-accent/10 text-accent rounded-full flex items-center justify-center shrink-0"
                        aria-hidden="true"
                      >
                        <MapPin size={18} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-sans text-xs font-bold text-foreground uppercase tracking-wider">
                          Physical Address
                        </span>
                        <p className="font-sans text-sm text-muted leading-relaxed">
                          Off Kitale-Kapenguria Highway,
                          <br />
                          Kitale, Kenya, 30200
                        </p>
                      </div>
                    </div>

                    {/* Hours card */}
                    <div className="flex items-start gap-4 p-4 bg-surface rounded-card border border-border shadow-sm">
                      <div
                        className="h-10 w-10 bg-accent/10 text-accent rounded-full flex items-center justify-center shrink-0"
                        aria-hidden="true"
                      >
                        <Clock size={18} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-sans text-xs font-bold text-foreground uppercase tracking-wider">
                          Operating Hours
                        </span>
                        <p className="font-sans text-sm text-muted">
                          Open 24 hours, 7 days a week
                        </p>
                        <p className="font-sans text-xs text-muted">
                          Reservations desk: 06:00 – 22:00
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp CTA */}
                  <a
                    href="https://wa.me/254747118328?text=Hello%20Skycomfy%20Hotel%20Kitale,%20I%20would%20like%20to%20make%20an%20enquiry."
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat with us on WhatsApp (opens in new tab)"
                    className="inline-flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-sans font-bold text-sm rounded-btn shadow-md transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
                  >
                    {/* WhatsApp icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Chat on WhatsApp
                  </a>

                  {/* Social media links */}
                  <div className="flex flex-col gap-3">
                    <span className="font-sans text-xs font-bold text-foreground uppercase tracking-wider">
                      Follow Us
                    </span>
                    <div className="flex items-center gap-4">
                      {/* Instagram */}
                      <a
                        href="#"
                        aria-label="Follow SKYCOMFY HOTEL KITALE on Instagram"
                        className="h-9 w-9 flex items-center justify-center rounded-full bg-surface border border-border text-muted hover:text-accent hover:border-accent transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.6}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                          aria-hidden="true"
                        >
                          <rect x="2" y="2" width="20" height="20" rx="5" />
                          <circle cx="12" cy="12" r="4" />
                          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                        </svg>
                      </a>
                      {/* TikTok */}
                      <a
                        href="#"
                        aria-label="Follow SKYCOMFY HOTEL KITALE on TikTok"
                        className="h-9 w-9 flex items-center justify-center rounded-full bg-surface border border-border text-muted hover:text-accent hover:border-accent transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-4 w-4"
                          aria-hidden="true"
                        >
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
                        </svg>
                      </a>
                      {/* X (Twitter) */}
                      <a
                        href="#"
                        aria-label="Follow SKYCOMFY HOTEL KITALE on X (Twitter)"
                        className="h-9 w-9 flex items-center justify-center rounded-full bg-surface border border-border text-muted hover:text-accent hover:border-accent transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-4 w-4"
                          aria-hidden="true"
                        >
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </SectionWrapper>

              {/* Google Maps embed */}
              <SectionWrapper direction="left" delay={0.15}>
                <div
                  className="relative aspect-[4/3] w-full rounded-card overflow-hidden border border-border shadow-card bg-primary/5"
                  aria-label="Map showing SKYCOMFY HOTEL KITALE location"
                >
                  <iframe
                    src={MAP_IFRAME_URL}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    title="SKYCOMFY HOTEL KITALE location on Google Maps"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </SectionWrapper>
            </div>

            {/* ── RIGHT COLUMN: Contact form (7 cols) ── */}
            <div className="lg:col-span-7 w-full">
              <SectionWrapper direction="right">
                <ContactForm />
              </SectionWrapper>
            </div>

          </div>
        </div>
      </section>
    </PageFadeIn>
  );
}
