// src/types/product.ts
// Mendefinisikan "shape" data di satu tempat — DRY principle
// Semua komponen import dari sini agar type-safe

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  rating: number;
  stock: number;
  image: string; // URL placeholder
  tags: string[];
}

export type Category =
  | "Electronics"
  | "Clothing"
  | "Books"
  | "Home & Kitchen"
  | "Sports";

// Union type untuk filter — bisa diperluas tanpa ubah komponen
export type SortOption = "name" | "price-asc" | "price-desc" | "rating";