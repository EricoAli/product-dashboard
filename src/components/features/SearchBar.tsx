// src/components/features/SearchBar.tsx
"use client";
// ═══════════════════════════════════════════════════════════
// KONSEP: CLIENT SIDE RENDERING (CSR) + STATE MANAGEMENT
// ═══════════════════════════════════════════════════════════
// "use client" directive memberitahu Next.js bahwa komponen ini
// akan di-hydrate dan dieksekusi di BROWSER, bukan di server
// Diperlukan ketika: menggunakan useState, useEffect, event handler,
// Browser API (window, localStorage), atau library yang butuh DOM

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { Product, SortOption } from "@/types/product";
import ProductCard from "@/components/ui/ProductCard";

interface SearchBarProps {
  products: Product[]; // Data dari Server Component — tidak di-fetch ulang
}

export default function SearchBar({ products }: SearchBarProps) {
  const router = useRouter();

  // ─── State Management ────────────────────────────────────────────
  // useState mendeklarasikan state lokal komponen ini
  // Setiap perubahan state → Virtual DOM diff → hanya elemen yang berubah yang di-update
  // TANPA refresh halaman penuh — ini inti dari CSR

  const [query, setQuery] = useState(""); // State untuk input pencarian
  const [sort, setSort] = useState<SortOption>("name"); // State untuk sort option

  // ─── Derived State dengan useMemo ─────────────────────────────────
  // useMemo: memoize hasil komputasi mahal
  // Hanya re-compute jika `query`, `sort`, atau `products` berubah
  // Tanpa useMemo, filter & sort dijalankan SETIAP kali komponen re-render
  const filteredProducts = useMemo(() => {
    // 1. Filter berdasarkan query pencarian
    const searched = products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
    );

    // 2. Sort hasil filter
    return [...searched].sort((a, b) => {
      switch (sort) {
        case "price-asc":  return a.price - b.price;
        case "price-desc": return b.price - a.price;
        case "rating":     return b.rating - a.rating;
        default:           return a.name.localeCompare(b.name);
      }
    });
  }, [query, sort, products]); // Dependency array — compute ulang jika ini berubah

  // ─── Event Handler dengan useCallback ────────────────────────────
  // useCallback: memoize fungsi agar tidak dibuat ulang setiap render
  // Penting saat fungsi dikirim sebagai prop ke child component
  const handleQueryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // State update ini memicu Virtual DOM reconciliation
      // React membandingkan Virtual DOM lama vs baru, hanya update yang berubah
      setQuery(e.target.value);
    },
    [] // Tidak ada dependency → fungsi ini stabil sepanjang lifecycle komponen
  );

  return (
    <div>
      {/* ─── Controls ─────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row">
        {/* Search Input */}
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={query}            // Controlled input — value selalu sinkron dengan state
            onChange={handleQueryChange}  // Event handler untuk update state
            placeholder="Cari produk atau tag..."
            className="w-full rounded-xl border placeholder-gray-400 border-gray-200 bg-white py-2.5 pl-10 pr-4
                       text-sm outline-none transition focus:border-blue-500 focus:ring-2
                       focus:ring-blue-100"
          />
          {/* Tombol clear — hanya muncul jika ada query (conditional rendering) */}
          {query && (
            <button
              onClick={() => setQuery("")} // Langsung set state ke string kosong
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* Sort Selector */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)} // Cast ke SortOption type
          className="rounded-xl border placeholder-gray-900 border-gray-200 bg-white px-3 py-2.5 text-sm
                     outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="name">Nama A–Z</option>
          <option value="price-asc">Harga Terendah</option>
          <option value="price-desc">Harga Tertinggi</option>
          <option value="rating">Rating Terbaik</option>
        </select>
      </div>

      {/* ─── Result Count ─────────────────────────────────────── */}
      {/* Re-render otomatis saat filteredProducts berubah */}
      <p className="mt-3 text-sm text-gray-500">
        Menampilkan{" "}
        <span className="font-semibold text-gray-900">{filteredProducts.length}</span>{" "}
        dari {products.length} produk
        {query && (
          <span className="text-blue-600"> untuk &ldquo;{query}&rdquo;</span>
        )}
      </p>

      {/* ─── Product Grid ──────────────────────────────────────── */}
      {/* Grid ini di-render di CLIENT — React mengupdate DOM secara selektif */}
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          // Empty state — ditampilkan saat tidak ada hasil pencarian
          <div className="col-span-full py-16 text-center">
            <p className="text-4xl">🔍</p>
            <p className="mt-3 text-gray-500">
              Tidak ada produk yang cocok dengan &ldquo;{query}&rdquo;
            </p>
            <button
              onClick={() => setQuery("")}
              className="mt-4 text-sm text-blue-600 underline"
            >
              Reset pencarian
            </button>
          </div>
        )}
      </div>
    </div>
  );
}