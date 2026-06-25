import withPWA from "@ducanh2912/next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "scontent.cdninstagram.com" },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "date-fns"],
  },
};

const pwa = withPWA({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/,
        handler: "CacheFirst",
        options: {
          cacheName: "google-fonts",
          expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
        },
      },
      {
        urlPattern: /\.(?:png|jpg|jpeg|webp|avif|svg|gif|ico)$/i,
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "images",
          expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 },
        },
      },
      {
        urlPattern: ({ request, url: { pathname } }) =>
          request.destination === "document" && !pathname.startsWith("/api"),
        handler: "NetworkFirst",
        options: {
          cacheName: "pages",
          expiration: { maxEntries: 32, maxAgeSeconds: 60 * 60 * 24 },
          networkTimeoutSeconds: 5,
        },
      },
    ],
  },
});

export default pwa(nextConfig);
