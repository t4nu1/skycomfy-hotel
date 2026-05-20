'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks } from '@/constants/navigation';
import { useNavbarScroll } from '@/hooks/useNavbarScroll';

const mobileMenuVariants: import('framer-motion').Variants = {
  hidden: { x: '-100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
  exit: {
    x: '-100%',
    opacity: 0,
    transition: { duration: 0.25, ease: 'easeIn' },
  },
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isScrolled = useNavbarScroll(80);
  const pathname = usePathname();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-primary/95 shadow-navbar backdrop-blur-sm'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo / Hotel Name */}
            <Link
              href="/"
              className="font-serif text-lg md:text-xl font-bold text-white tracking-wide hover:text-accent transition-colors duration-200"
              onClick={closeMenu}
            >
              SKYCOMFY HOTEL
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <ul className="flex items-center gap-6">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`font-sans text-sm font-medium transition-colors duration-200 pb-0.5 ${
                          isActive
                            ? 'text-accent border-b-2 border-accent'
                            : 'text-white/90 hover:text-accent'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Book Now CTA */}
              <Link
                href="/contact"
                className="inline-flex items-center px-5 py-2 bg-accent text-primary font-sans text-sm font-semibold rounded-btn shadow-btn hover:bg-accent-light transition-colors duration-200"
              >
                Book Now
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              type="button"
              className="md:hidden p-2 text-white hover:text-accent transition-colors duration-200"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Full-Screen Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-0 z-40 bg-primary flex flex-col md:hidden"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close button at top-right */}
            <div className="flex items-center justify-between px-4 h-16">
              <Link
                href="/"
                className="font-serif text-lg font-bold text-white tracking-wide"
                onClick={closeMenu}
              >
                SKYCOMFY HOTEL
              </Link>
              <button
                type="button"
                className="p-2 text-white hover:text-accent transition-colors duration-200"
                aria-label="Close navigation menu"
                onClick={closeMenu}
              >
                <X size={24} />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 flex flex-col justify-center px-8">
              <ul className="flex flex-col gap-6">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        className={`font-sans text-2xl font-medium transition-colors duration-200 ${
                          isActive
                            ? 'text-accent border-b-2 border-accent pb-0.5'
                            : 'text-white/90 hover:text-accent'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Book Now CTA in mobile menu */}
              <div className="mt-10">
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className="inline-flex items-center px-8 py-3 bg-accent text-primary font-sans text-base font-semibold rounded-btn shadow-btn hover:bg-accent-light transition-colors duration-200"
                >
                  Book Now
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
