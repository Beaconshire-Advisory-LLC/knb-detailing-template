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
    // Supabase Storage public buckets. The {{OWNER_CONFIRM_SUPABASE_PROJECT_REF}}
    // placeholder is replaced once the prod project is created (Phase 9 §E).
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
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
