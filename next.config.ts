import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Local images from /public are served natively — no remotePatterns needed.
    // Unsplash remote pattern removed: all images are now real hotel photos.
    formats: ["image/webp", "image/avif"],
    deviceSizes: [320, 480, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
