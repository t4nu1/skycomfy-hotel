import type { Config } from 'tailwindcss';

/**
 * SKYCOMFY HOTEL KITALE — Tailwind CSS Configuration
 *
 * NOTE: This project uses Tailwind CSS v4. In v4, design tokens are defined
 * via `@theme` in `app/globals.css` rather than in this file. This config
 * file is retained for content path configuration and future plugin use.
 *
 * All design tokens (colors, typography, spacing, shadows, etc.) are declared
 * in `app/globals.css` under the `@theme` block.
 *
 * Design token reference (mirrors the @theme declarations in globals.css):
 *
 * Colors:
 *   primary:       #1a2744   — Deep navy, main brand colour
 *   accent:        #c9a84c   — Warm gold, CTAs / highlights / active states
 *   background:    #faf8f4   — Warm cream, page background
 *   surface:       #ffffff   — Card / panel backgrounds
 *   foreground:    #1a1a1a   — Primary text
 *   muted:         #6b7280   — Secondary text, captions
 *   border:        #e5e0d8   — Subtle borders
 *   primary-light: #243460   — Hover state for primary
 *   accent-light:  #d4b46a   — Hover state for accent
 *
 * Font families:
 *   serif: var(--font-playfair), Georgia, serif
 *   sans:  var(--font-inter), system-ui, sans-serif
 *
 * Font sizes (display scale):
 *   display-xl: 4.5rem / lh 1.1  / ls -0.02em
 *   display-lg: 3.5rem / lh 1.15 / ls -0.02em
 *   display-md: 2.5rem / lh 1.2  / ls -0.01em
 *
 * Spacing:
 *   section:    5rem  (80px)
 *   section-sm: 3rem  (48px)
 *
 * Border radius:
 *   card: 0.75rem (12px)
 *   btn:  0.375rem (6px)
 *   pill: 9999px
 *
 * Box shadows:
 *   card:       0 4px 24px rgba(26,39,68,0.08)
 *   card-hover: 0 12px 40px rgba(26,39,68,0.16)
 *   navbar:     0 2px 16px rgba(26,39,68,0.12)
 *   btn:        0 2px 8px rgba(201,168,76,0.3)
 *
 * Background images:
 *   hero-overlay: linear-gradient(to bottom, rgba(26,39,68,0.55) 0%, rgba(26,39,68,0.35) 100%)
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  plugins: [],
};

export default config;
