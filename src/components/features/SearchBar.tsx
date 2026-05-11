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
import type { Category, Product, SortOption } from "@/types/product";
import ProductCard from "@/components/ui/ProductCard";
import CategoryFilter from "./CategoryFilter";
import { useDebouncedValue } from "@/lib/hooks/useDebouncedValue";

interface SearchBarProps {
  products: Product[];
  categories: Category[];
}

export default function SearchBar({ products, categories }: SearchBarProps) {

  // ─── State Management ────────────────────────────────────────────
  // useState mendeklarasikan state lokal komponen ini
  // Setiap perubahan state → Virtual DOM diff → hanya elemen yang berubah yang di-update
  // TANPA refresh halaman penuh — ini inti dari CSR

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | null>(null);
  const [sort, setSort] = useState<SortOption>("name");

  const debouncedQuery = useDebouncedValue(query, 300);

  const handleQueryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    []
  );

  const handleCategoryChange = useCallback((selected: Category | null) => {
    setCategory(selected);
  }, []);

  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSort(e.target.value as SortOption);
    },
    []
  );

  const filteredProducts = useMemo(() => {
    const normalizedQuery = debouncedQuery.trim().toLowerCase();

    return [...products]
      .filter((product) => {
        const matchesQuery =
          normalizedQuery === "" ||
          product.name.toLowerCase().includes(normalizedQuery) ||
          product.description.toLowerCase().includes(normalizedQuery) ||
          product.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));

        const matchesCategory = category === null || product.category === category;
        return matchesQuery && matchesCategory;
      })
      .sort((a, b) => {
        switch (sort) {
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "rating":
            return b.rating - a.rating;
          default:
            return a.name.localeCompare(b.name);
        }
      });
  }, [products, category, debouncedQuery, sort]);

  return (
    <div>
      <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex-1">
            <label htmlFor="search-input" className="mb-2 block text-sm font-medium text-gray-700">
              Cari produk
            </label>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                id="search-input"
                type="text"
                value={query}
                onChange={handleQueryChange}
                placeholder="Cari produk, kategori, atau tag..."
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="flex w-full max-w-xs flex-col gap-3">
            <label htmlFor="sort-select" className="text-sm font-medium text-gray-700">
              Urutkan
            </label>
            <select
              id="sort-select"
              value={sort}
              onChange={handleSortChange}
              className="rounded-2xl border border-gray-200 bg-white py-3 px-4 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="name">Nama A–Z</option>
              <option value="price-asc">Harga Terendah</option>
              <option value="price-desc">Harga Tertinggi</option>
              <option value="rating">Rating Terbaik</option>
            </select>
          </div>
        </div>

        <div className="mt-5">
          <CategoryFilter
            categories={categories}
            selectedCategory={category}
            onSelectCategory={handleCategoryChange}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-500">
          Menampilkan <span className="font-semibold text-gray-900">{filteredProducts.length}</span> dari {products.length} produk
          {debouncedQuery && <span className="text-blue-600"> untuk “{debouncedQuery}”</span>}
          {category && <span className="text-gray-500"> dalam kategori “{category}”</span>}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <div className="col-span-full rounded-3xl border border-dashed border-gray-200 bg-white p-12 text-center shadow-sm">
            <p className="text-4xl">🔍</p>
            <p className="mt-3 text-gray-500">
              Tidak ada produk yang cocok. Coba kata kunci lain atau reset filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory(null);
              }}
              className="mt-4 rounded-2xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Reset filter
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-500">
          Menampilkan <span className="font-semibold text-gray-900">{filteredProducts.length}</span> dari {products.length} produk
          {debouncedQuery && <span className="text-blue-600"> untuk "{debouncedQuery}"</span>}
          {category && <span className="text-gray-500"> dalam kategori "{category}"</span>}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full py-16 text-center">
            <p className="text-4xl">🔍</p>
            <p className="mt-3 text-gray-500">
              Tidak ada produk yang cocok dengan "{query}"
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