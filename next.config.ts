// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Izinkan semua URL dari picsum.photos (mock image provider)
        // Di production, ganti dengan domain CDN/storage kamu sendiri
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**", // Izinkan semua path di bawah hostname ini
      },
    ],
  },
};

export default nextConfig;