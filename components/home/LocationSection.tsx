'use client';

import Link from 'next/link';
import { MapPin, Navigation, Phone, Clock } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';

/**
 * LocationSection
 *
 * Homepage section displaying the hotel's location via an embedded Google Maps
 * iframe, the physical address, contact details, and a "Get Directions" link.
 *
 * Requirements: 10.1, 10.2, 10.3, 10.4
 */

const MAP_IFRAME_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.4682056157813!2d34.99616787496695!3d1.0191599989679659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1782276cb0db7ad3%3A0xe543eaec166d1f05!2sKitale!5e0!3m2!1sen!2ske!4v1716200000000!5m2!1sen!2ske';

const GOOGLE_MAPS_DIRECTIONS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=Kitale,Kenya&destination_place_id=ChIJ00vbsGYnGBgR8B9tFuziQ-U';

const INFO_ITEMS = [
  {
    icon: MapPin,
    label: 'Address',
    content: (
      <address className="not-italic font-sans text-sm text-muted leading-relaxed">
        Off Kitale-Kapenguria Highway,
        <br />
        Kitale, Kenya, 30200
      </address>
    ),
  },
  {
    icon: Phone,
    label: 'Phone',
    content: (
      <div className="flex flex-col gap-0.5">
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
    ),
  },
  {
    icon: Clock,
    label: 'Reception Hours',
    content: (
      <p className="font-sans text-sm text-muted leading-relaxed">
        Open 24 hours, 7 days a week
      </p>
    ),
  },
] as const;

export default function LocationSection() {
  return (
    <section
      className="py-section bg-surface"
      aria-labelledby="location-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section heading ── */}
        <SectionWrapper className="mb-12 text-center">
          <p className="font-sans text-xs font-semibold tracking-widest uppercase text-accent mb-3">
            Find Us
          </p>
          <h2
            id="location-heading"
            className="font-serif text-display-md text-foreground"
          >
            Our Location
          </h2>
          <p className="mt-4 font-sans text-base text-muted max-w-xl mx-auto">
            Conveniently situated off the Kitale–Kapenguria Highway, SKYCOMFY HOTEL
            KITALE is easy to reach whether you are arriving by road or air.
          </p>
        </SectionWrapper>

        {/* ── Two-column layout: map left, info right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* ── Left: Google Maps iframe (Req 10.1, 10.4) ── */}
          <SectionWrapper direction="left">
            {/* Responsive wrapper — 4:3 on mobile, 16:9 on lg+ */}
            <div
              className="relative w-full overflow-hidden rounded-card border border-border shadow-card bg-primary/5"
              style={{ paddingBottom: 'clamp(56.25%, 56.25%, 75%)' }}
            >
              <iframe
                src={MAP_IFRAME_URL}
                title="SKYCOMFY HOTEL KITALE location on Google Maps"
                aria-label="Interactive Google Maps showing SKYCOMFY HOTEL KITALE in Kitale, Kenya"
                width="100%"
                height="100%"
                style={{ border: 0, position: 'absolute', inset: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </SectionWrapper>

          {/* ── Right: address, contact info, CTA ── */}
          <SectionWrapper direction="right">
            <div className="flex flex-col gap-8">

              {/* Info cards */}
              <div className="flex flex-col gap-5">
                {INFO_ITEMS.map(({ icon: Icon, label, content }) => (
                  <div
                    key={label}
                    className="flex items-start gap-4 p-4 bg-background rounded-card border border-border shadow-sm"
                  >
                    <div
                      className="h-10 w-10 shrink-0 rounded-full bg-accent/10 text-accent flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <Icon size={18} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-sans text-xs font-bold text-foreground uppercase tracking-wider">
                        {label}
                      </span>
                      {content}
                    </div>
                  </div>
                ))}
              </div>

              {/* Get Directions CTA (Req 10.3) */}
              <Link
                href={GOOGLE_MAPS_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto
                           rounded-btn bg-primary px-7 py-3 font-sans font-semibold text-sm
                           text-white shadow-btn transition-all duration-200
                           hover:bg-primary-light focus-visible:outline-none
                           focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label="Get directions to SKYCOMFY HOTEL KITALE on Google Maps (opens in new tab)"
              >
                <Navigation size={16} aria-hidden="true" />
                Get Directions
              </Link>

            </div>
          </SectionWrapper>

        </div>
      </div>
    </section>
  );
}
