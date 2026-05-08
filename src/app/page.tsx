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
import { getAllProducts, getCategories } from "@/lib/data";
import ProductCard from "@/components/ui/ProductCard";
import SearchBar from "@/components/features/SearchBar";
import CategoryFilter from "@/components/features/CategoryFilter";

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
    getAllProducts(),   // fetch paralel — lebih efisien dari await berurutan
    getCategories(),
  ]);

  return (
    <div>
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-100">
          Product Dashboard
        </h1>
        <p className="mt-2 text-gray-500">
          {products.length} produk tersedia
        </p>
      </div>

      {/* SearchBar adalah Client Component — embedded di dalam Server Component */}
      {/* Ini pattern komposisi: Server Component jadi "host" untuk Client Component */}
      {/* products dikirim sebagai prop karena Client Component tidak bisa fetch langsung */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          {/* SearchBar butuh interaktivitas → Client Component */}
          <SearchBar products={products} />
        </div>
        <div className="w-full sm:w-48">
          {/* CategoryFilter juga Client Component — punya state tersendiri */}
          <CategoryFilter categories={categories} />
        </div>
      </div>

      {/* Product Grid — di-render oleh server, langsung ada di HTML */}
      {/* Tidak butuh Client Component karena hanya tampilan statis */}
      <div
        id="product-grid"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {products.map((product) => (
          // Key prop wajib ada saat render list — React butuh ini untuk reconciliation
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}