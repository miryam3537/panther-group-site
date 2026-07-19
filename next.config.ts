import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Limit size variants — fewer variants = fewer fetches from Supabase
    deviceSizes: [640, 1080, 1920],
    imageSizes: [64, 256],
    // Cache optimized images for 1 year on Next.js server
    minimumCacheTTL: 60 * 60 * 24 * 365,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gwyeuaywrngqnkpfdecc.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
