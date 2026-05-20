import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for could not be found. Return to SKYCOMFY HOTEL KITALE.',
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center">
      {/* 404 number */}
      <p className="font-serif text-[8rem] md:text-[12rem] font-bold leading-none text-primary/10 select-none">
        404
      </p>

      {/* Heading */}
      <h1 className="font-serif text-display-md text-primary mt-2 mb-4 leading-tight">
        Page Not Found
      </h1>

      {/* Subtext */}
      <p className="font-sans text-base text-muted max-w-md mb-10">
        We couldn&apos;t find the page you were looking for. It may have been moved or
        no longer exists. Let us guide you back to comfort.
      </p>

      {/* CTA */}
      <Link
        href="/"
        className="inline-block bg-accent hover:bg-accent-light text-primary font-sans font-semibold text-sm px-8 py-3 rounded-btn shadow-btn transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        Back to Home
      </Link>

      {/* Brand footer note */}
      <p className="font-sans text-sm text-muted/60 mt-12">
        SKYCOMFY HOTEL KITALE — Comfort Meets Elegance
      </p>
    </main>
  );
}
