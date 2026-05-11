// src/app/layout.tsx
// ROOT LAYOUT — Server Component by default
// Dirender SEKALI dan tetap ada saat navigasi antar halaman (tidak unmount)
// Ini adalah "shell" permanen aplikasi: font, metadata global, dan komponen persistent

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { CartProvider } from "@/state/cart-context";

// next/font otomatis self-host font → zero layout shift, tidak ada request ke Google
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

// Metadata diekspor sebagai objek — Next.js inject ke <head> saat build
// Lebih baik dari hardcode di layout karena bisa di-override tiap halaman
export const metadata: Metadata = {
  title: {
    template: "%s | Product Dashboard", // "%s" diisi oleh metadata tiap halaman
    default: "Product Dashboard",
  },
  description: "Temukan produk terbaik pilihan kami",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode; // "children" = konten halaman aktif yang di-render
}) {
  return (
    <html lang="id" className={geist.variable}>
      <body
        className="min-h-screen font-sans antialiased"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <CartProvider>
          {/* Navbar ada di layout → tidak re-render saat pindah halaman */}
          <Navbar />
          {/* children berubah setiap navigasi, tapi Navbar & body tetap */}
          <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}