// src/components/features/CategoryFilter.tsx
"use client";
// Client Component — menggunakan useRouter untuk navigasi programatik
// dan useState untuk track kategori yang dipilih

import clsx from "clsx";
import type { Category } from "@/types/product";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: Category | null;
  onSelectCategory: (category: Category | null) => void;
}

// Warna badge per kategori — lookup object lebih efisien dari if-else chain
const CATEGORY_COLORS: Record<Category, string> = {
  Electronics:    "bg-blue-100 text-blue-700 border-blue-200",
  Clothing:       "bg-purple-100 text-purple-700 border-purple-200",
  Books:          "bg-yellow-100 text-yellow-700 border-yellow-200",
  "Home & Kitchen": "bg-green-100 text-green-700 border-green-200",
  Sports:         "bg-orange-100 text-orange-700 border-orange-200",
};

export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  const handleSelect = (category: Category | null) => {
    onSelectCategory(category);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {/* Tombol "Semua" */}
      <button
        type="button"
        onClick={() => handleSelect(null)}
        className={clsx(
          "rounded-full border px-3 py-1.5 text-sm font-medium transition-all duration-200",
          selectedCategory === null
            ? "border-gray-900 bg-gray-900 text-white"
            : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
        )}
      >
        Semua
      </button>

      {/* Map kategori — re-render saat activeCategory berubah */}
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => handleSelect(category)}
          className={clsx(
            "rounded-full border px-3 py-1.5 text-sm font-medium transition-all duration-200",
            selectedCategory === category
              ? `${CATEGORY_COLORS[category]} border-current`
              : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}