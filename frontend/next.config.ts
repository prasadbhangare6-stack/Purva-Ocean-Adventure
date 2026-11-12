import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  images: {
    // Sanity-hosted images and videos are optimised through next/image.
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
