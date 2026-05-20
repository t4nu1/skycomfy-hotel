'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks } from '@/constants/navigation';

const NAV_HEIGHT_MOBILE = 64;

/* ─── Mobile slide-in variants ─── */
const mobileMenuVariants = {
  hidden: { x: '-100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
  exit: {
    x: '-100%',
    opacity: 0,
    transition: { duration: 0.25, ease: 'easeIn' as const },
  },
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Detect scroll threshold — trigger transition at 60px
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial check
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  // Determine theme classes
  const navbarTheme = scrolled
    ? 'bg-primary/96 shadow-navbar backdrop-blur-md border-b border-white/[0.06]'
    : 'bg-surface/80 backdrop-blur-sm';

  const logoColor = scrolled ? 'text-white' : 'text-primary';
  const activeAccent = 'text-accent border-accent';
  const inactiveTheme = scrolled
    ? 'text-white/75 hover:text-white'
    : 'text-foreground/70 hover:text-foreground';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navbarTheme}`}
        role="banner"
      >
        <nav
          className="mx-auto max-w-7xl px-5 md:px-8"
          style={{ height: NAV_HEIGHT_MOBILE }}
          aria-label="Primary navigation"
        >
          <div className="flex h-full items-center justify-between">
            
            {/* ── Logo ── */}
            <Link
              href="/"
              onClick={closeMenu}
              className={`font-serif text-base md:text-lg font-bold tracking-[0.06em] transition-colors duration-300 ${logoColor}`}
              aria-label="SKYCOMFY HOTEL KITALE — Home"
            >
              SKYCOMFY<span className="text-accent">.</span>
            </Link>

            {/* ── Desktop Nav ── */}
            <div className="hidden lg:flex items-center gap-10" role="list">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    role="listitem"
                    aria-current={isActive ? 'page' : undefined}
                    className={`group relative font-sans text-[13px] font-medium tracking-wide transition-colors duration-250 pb-1 ${
                      isActive ? activeAccent : inactiveTheme
                    }`}
                  >
                    {link.label}
                    {/* Gold underline indicator */}
                    <span
                      className={`absolute bottom-0 left-0 h-px bg-accent transition-all duration-300 ${
                        isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-70'
                      }`}
                      aria-hidden="true"
                    />
                  </Link>
                );
              })}
            </div>

            {/* ── Desktop CTA ── */}
            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2 bg-accent text-primary font-sans text-xs font-bold uppercase tracking-widest rounded-btn shadow-btn transition-all duration-300 hover:bg-accent-dark hover:-translate-y-[1px]"
            >
              Book Now
            </Link>

            {/* ── Mobile Hamburger ── */}
            <button
              type="button"
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full transition-colors aria-label"
              aria-label="Open navigation menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMenuOpen((o) => !o)}
            >
              <span className={scrolled ? 'text-white' : 'text-foreground'}>
                {isMenuOpen ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.75} />}
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile Full-screen Drawer ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-0 z-40 bg-primary flex flex-col"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header bar in drawer */}
            <div className="flex h-16 items-center justify-between px-5">
              <Link
                href="/"
                onClick={closeMenu}
                className="font-serif text-base font-bold tracking-[0.06em] text-white"
                aria-label="Close and go home"
              >
                SKYCOMFY<span className="text-accent">.</span>
              </Link>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full text-white"
                aria-label="Close navigation menu"
                onClick={closeMenu}
              >
                <X size={22} strokeWidth={1.75} />
              </button>
            </div>

            {/* Nav items */}
            <nav className="flex-1 flex flex-col justify-center px-8" aria-label="Mobile navigation links">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                    >
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        className={`block py-3 font-serif text-[1.875rem] font-semibold tracking-tight transition-colors duration-200 ${
                          isActive ? 'text-accent' : 'text-white/85 hover:text-accent'
                        }`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Mobile CTA */}
            <div className="px-8 pb-10">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.35 }}
              >
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className="flex w-full items-center justify-center gap-2 px-6 py-4 bg-accent text-primary font-sans text-sm font-bold uppercase tracking-widest rounded-btn shadow-btn"
                >
                  Book Your Stay
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
