import Link from 'next/link';
import { navLinks } from '@/constants/navigation';

/* ─── Inline SVG social icons ─── */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
      className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
    </svg>
  );
}
function XIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
      className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
      className={className} aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}
function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
      className={className} aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

const socialLinks = [
  { label: 'Follow us on Instagram', href: '#', Icon: InstagramIcon },
  { label: 'Follow us on TikTok',     href: '#', Icon: TikTokIcon },
  { label: 'Follow us on X',          href: '#', Icon: XIcon },
  { label: 'Follow us on Facebook',   href: '#', Icon: FacebookIcon },
  { label: 'Follow us on YouTube',    href: '#', Icon: YouTubeIcon },
];

/* ─── Contact quick links ─── */
const quickLinks = [
  { label: 'Rooms & Suites', href: '/rooms' },
  { label: 'About Us',        href: '/about'  },
  { label: 'Gallery',         href: '/gallery' },
  { label: 'Contact',         href: '/contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white overflow-hidden" role="contentinfo">
      {/* ── Top accent stripe ── */}
      <div className="h-[3px] bg-accent" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-5 md:px-8 py-14 md:py-20">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* ── Col 1: Brand ── */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <Link
              href="/"
              className="font-serif text-xl md:text-2xl font-bold tracking-wider text-white"
            >
              SKYCOMFY<span className="text-accent">.</span>
            </Link>

            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Comfort meets elegance in the heart of Kitale. Experience
              premium hospitality, fine dining, and unforgettable moments.
            </p>

            {/* Gold accent rule */}
            <div className="divider-gold" aria-hidden="true" />

            {/* Social icons */}
            <div className="flex items-center gap-4 mt-1">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-accent transition-colors duration-300"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Col 2: Quick Links ── */}
          <div className="flex flex-col gap-5">
            <h3 className="font-serif text-base font-semibold text-white/90">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/55 hover:text-accent transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Contact ── */}
          <div className="flex flex-col gap-5">
            <h3 className="font-serif text-base font-semibold text-white/90">
              Contact
            </h3>
            <address className="not-italic flex flex-col gap-3 text-sm text-white/55 leading-relaxed">
              <span>
                Off Kitale-Kapenguria Highway,
                <br />
                Kitale, Trans-Nzoia County, 30200
              </span>
              <a href="tel:+254747118328" className="hover:text-accent transition-colors">
                +254 747 118 328
              </a>
              <a href="tel:+254719530249" className="hover:text-accent transition-colors">
                +254 719 530 249
              </a>
              <a href="mailto:info@skycomfyhotel.com" className="hover:text-accent transition-colors break-all">
                info@skycomfyhotel.com
              </a>
            </address>
          </div>

          {/* ── Col 4: Newsletter / CTA ── */}
          <div className="flex flex-col gap-5">
            <h3 className="font-serif text-base font-semibold text-white/90">
              Stay in Touch
            </h3>
            <p className="text-sm text-white/55 leading-relaxed">
              Join our guest list and receive seasonal offers, dining specials, and
              exclusive garden event invites.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-3"
              aria-label="Newsletter sign-up"
            >
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input
                id="footer-email"
                type="email"
                placeholder="Your email address"
                className="w-full rounded-btn bg-white/[0.08] border border-white/[0.12] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors"
              />
              <button
                type="submit"
                className="w-full py-3 bg-accent text-primary font-sans text-xs font-bold uppercase tracking-widest rounded-btn shadow-md hover:bg-accent-dark transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/[0.08]">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-white/35">
            &copy; {year} SKYCOMFY HOTEL KITALE. All rights reserved.
          </p>
          <p className="text-[11px] text-white/25">
            Kitale, Trans-Nzoia County, Kenya
          </p>
        </div>
      </div>
    </footer>
  );
}
