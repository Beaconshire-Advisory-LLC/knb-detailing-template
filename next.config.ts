import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Pin Turbopack's workspace root to this project. Without this, Next.js 16
  // walks up the tree and finds stray lockfiles in ~/ — harmless but noisy.
  turbopack: {
    root: import.meta.dirname,
  },

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      // Stand-in photography until the owner provides real KNB photos.
      // Every URL using these hosts is listed in MISSING_DATA.md.
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },

  // Redirect www -> apex; final source/destination set after DNS is live.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.knbdetailing.com" }],
        destination: "https://knbdetailing.com/:path*",
        permanent: true,
      },
    ];
  },

  // Security headers — minimal for Phase 1; tightened with CSP in Phase 8.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
