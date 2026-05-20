import Link from 'next/link';
import { navLinks } from '@/constants/navigation';

// Social media SVG icons
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socialLinks = [
  {
    label: 'Follow us on Instagram',
    href: '#',
    Icon: InstagramIcon,
  },
  {
    label: 'Follow us on TikTok',
    href: '#',
    Icon: TikTokIcon,
  },
  {
    label: 'Follow us on X (Twitter)',
    href: '#',
    Icon: XIcon,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">

          {/* Column 1: Brand */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="font-serif text-xl font-bold tracking-wide text-white hover:text-accent transition-colors duration-200 w-fit"
            >
              SKYCOMFY HOTEL KITALE
            </Link>
            <p className="font-sans text-sm text-white/70 leading-relaxed max-w-xs">
              Comfort meets elegance in the heart of Kitale. Experience premium
              hospitality, fine dining, and unforgettable moments.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-4 mt-2">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-white/60 hover:text-accent transition-colors duration-200"
                  rel="noopener noreferrer"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-base font-semibold text-white tracking-wide">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-white/70 hover:text-accent transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-base font-semibold text-white tracking-wide">
              Contact Us
            </h3>
            <address className="not-italic flex flex-col gap-2.5">
              <p className="font-sans text-sm text-white/70 leading-relaxed">
                Off Kitale-Kapenguria Highway,
                <br />
                Kitale, Kenya, 30200
              </p>
              <a
                href="tel:+254747118328"
                className="font-sans text-sm text-white/70 hover:text-accent transition-colors duration-200 w-fit"
              >
                +254 747 118 328
              </a>
              <a
                href="tel:+254719530249"
                className="font-sans text-sm text-white/70 hover:text-accent transition-colors duration-200 w-fit"
              >
                +254 719 530 249
              </a>
            </address>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-sans text-xs text-white/50">
            &copy; {currentYear} SKYCOMFY HOTEL KITALE. All rights reserved.
          </p>
          <p className="font-sans text-xs text-white/40">
            Kitale, Trans-Nzoia County, Kenya
          </p>
        </div>
      </div>
    </footer>
  );
}
