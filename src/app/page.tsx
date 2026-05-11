// src/app/page.tsx
// ═══════════════════════════════════════════════════════════
// KONSEP: SERVER SIDE RENDERING (SSR)
// ═══════════════════════════════════════════════════════════
// Komponen ini adalah Server Component (tidak ada "use client")
// Next.js mengeksekusi fungsi ini di SERVER saat ada request masuk
// HTML yang dikirim ke browser sudah berisi data produk lengkap
// → SEO friendly: crawler melihat konten langsung tanpa menunggu JS
// → Performa awal (First Contentful Paint) lebih cepat

import type { Metadata } from "next";
import { getProductsData, getProductCategoriesData } from "@/lib/api/products";
import SearchBar from "@/components/features/SearchBar";

// Metadata spesifik halaman ini — override template di layout.tsx
export const metadata: Metadata = {
  title: "Semua Produk",
};

// Halaman utama adalah async function — boleh karena ini Server Component
// Di Client Component, kamu TIDAK bisa menggunakan await langsung di komponen
export default async function HomePage() {
  // Data di-fetch di server sebelum HTML dikirim ke browser
  // Tidak ada loading state yang tampak oleh user (sudah selesai di server)
  const [products, categories] = await Promise.all([
    getProductsData(),
    getProductCategoriesData(),
  ]);

  return (
    <div>
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Product Dashboard
        </h1>
        <p className="mt-2 text-gray-500">
          {products.length} produk tersedia
        </p>
      </div>

      <SearchBar products={products} categories={categories} />

    </div>
  );
}