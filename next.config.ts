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
      {
        // Tambahkan example.com agar image eksternal dari produk dapat ditampilkan
        protocol: "https",
        hostname: "example.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;