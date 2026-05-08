// src/components/features/CategoryFilter.tsx
"use client";
// Client Component — menggunakan useRouter untuk navigasi programatik
// dan useState untuk track kategori yang dipilih

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { Category } from "@/types/product";

interface CategoryFilterProps {
  categories: Category[];
}

// Warna badge per kategori — lookup object lebih efisien dari if-else chain
const CATEGORY_COLORS: Record<Category, string> = {
  Electronics:    "bg-blue-100 text-blue-700 border-blue-200",
  Clothing:       "bg-purple-100 text-purple-700 border-purple-200",
  Books:          "bg-yellow-100 text-yellow-700 border-yellow-200",
  "Home & Kitchen": "bg-green-100 text-green-700 border-green-200",
  Sports:         "bg-orange-100 text-orange-700 border-orange-200",
};

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  // State untuk filter aktif — null berarti "Semua Produk"
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  // useRouter: akses router untuk navigasi atau refresh data
  const router = useRouter();

  const handleSelect = (category: Category | null) => {
    // Update state lokal → komponen re-render → UI filter berubah
    // Ini murni CSR: tidak ada request ke server
    setActiveCategory(category);

    // Di aplikasi nyata, kamu bisa update URL params untuk deep-linking:
    // router.push(`/?category=${category}`) agar URL bisa di-share
  };

  return (
    <div className="flex flex-wrap gap-2">
      {/* Tombol "Semua" */}
      <button
        onClick={() => handleSelect(null)}
        className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-all ${
          activeCategory === null
            ? "border-gray-800 bg-gray-800 text-white" // Active state
            : "border-gray-200 bg-white text-gray-600 hover:border-gray-300" // Default state
        }`}
      >
        Semua
      </button>

      {/* Map kategori — re-render saat activeCategory berubah */}
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleSelect(category)}
          className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-all ${
            activeCategory === category
              ? CATEGORY_COLORS[category] + " border-current" // Active → warna kategori
              : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}