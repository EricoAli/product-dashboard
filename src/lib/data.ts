// src/lib/data.ts
// Layer data — mensimulasikan fetch ke database/API eksternal
// Di production, ganti fungsi-fungsi ini dengan fetch() ke API nyata

import { Product, Category } from "@/types/product";

// ─── Mock Data ──────────────────────────────────────────────────────────────
// Data statis ini merepresentasikan response dari API/DB
const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Wireless Noise-Cancelling Headphones",
    description:
      "Premium over-ear headphones dengan active noise cancellation, 30 jam battery life, dan kualitas audio Hi-Fi. Nyaman untuk penggunaan harian.",
    price: 2499000,
    category: "Electronics",
    rating: 4.7,
    stock: 15,
    image: "https://picsum.photos/seed/headphone/400/300",
    tags: ["wireless", "audio", "premium"],
  },
  {
    id: "2",
    name: "Mechanical Keyboard TKL",
    description:
      "Tenkeyless mechanical keyboard dengan switch red linear, RGB backlight, dan build aluminium. Ideal untuk programmer dan gamer.",
    price: 899000,
    category: "Electronics",
    rating: 4.5,
    stock: 30,
    image: "https://picsum.photos/seed/keyboard/400/300",
    tags: ["keyboard", "mechanical", "rgb"],
  },
  {
    id: "3",
    name: "Running Shoes Pro",
    description:
      "Sepatu lari ringan dengan teknologi foam responsif. Cocok untuk trail dan road running. Upper mesh breathable.",
    price: 1350000,
    category: "Sports",
    rating: 4.3,
    stock: 50,
    image: "https://picsum.photos/seed/shoes/400/300",
    tags: ["running", "outdoor", "lightweight"],
  },
  {
    id: "4",
    name: "Clean Code — Robert C. Martin",
    description:
      "Buku wajib bagi setiap software developer. Berisi panduan menulis kode yang mudah dibaca, dipelihara, dan di-test.",
    price: 320000,
    category: "Books",
    rating: 4.9,
    stock: 100,
    image: "https://picsum.photos/seed/cleancode/400/300",
    tags: ["programming", "software", "best-seller"],
  },
  {
    id: "5",
    name: "Ergonomic Office Chair",
    description:
      "Kursi kerja ergonomis dengan lumbar support adjustable, armrest 4D, dan sandaran kepala. Dirancang untuk 8 jam kerja.",
    price: 3200000,
    category: "Home & Kitchen",
    rating: 4.6,
    stock: 8,
    image: "https://picsum.photos/seed/chair/400/300",
    tags: ["office", "ergonomic", "wfh"],
  },
  {
    id: "6",
    name: "Merino Wool Hoodie",
    description:
      "Hoodie premium dari 100% merino wool. Natural temperature regulation, tidak bau, dan lembut di kulit.",
    price: 780000,
    category: "Clothing",
    rating: 4.4,
    stock: 25,
    image: "https://picsum.photos/seed/hoodie/400/300",
    tags: ["wool", "casual", "premium"],
  },
  {
    id: "7",
    name: "Smart Water Bottle",
    description:
      "Botol minum stainless steel dengan sensor suhu digital dan pengingat minum via app. Kapasitas 750ml.",
    price: 450000,
    category: "Sports",
    rating: 4.1,
    stock: 40,
    image: "https://picsum.photos/seed/bottle/400/300",
    tags: ["hydration", "smart", "fitness"],
  },
  {
    id: "8",
    name: "Pour-Over Coffee Set",
    description:
      "Set lengkap pour-over coffee: dripper borosilicate glass, gooseneck kettle, timbangan kopi, dan 50 filter paper.",
    price: 620000,
    category: "Home & Kitchen",
    rating: 4.8,
    stock: 20,
    image: "https://picsum.photos/seed/coffee/400/300",
    tags: ["coffee", "kitchen", "barista"],
  },
];

// ─── Data Fetching Functions ──────────────────────────────────────────────────
// Fungsi async mensimulasikan network latency — penting untuk Suspense & loading states

/**
 * Ambil semua produk — dipanggil di Server Component halaman utama
 * Di production: return await fetch('https://api.example.com/products').then(r => r.json())
 */
export async function getAllProducts(): Promise<Product[]> {
  // Simulasi network delay (hapus di production)
  await new Promise((resolve) => setTimeout(resolve, 500));
  return PRODUCTS;
}

/**
 * Ambil satu produk by ID — dipanggil di Server Component halaman detail
 * Mengembalikan undefined jika tidak ditemukan → trigger not-found.tsx
 */
export async function getProductById(id: string): Promise<Product | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return PRODUCTS.find((p) => p.id === id);
}

/**
 * Ambil daftar kategori unik — untuk filter sidebar
 */
export async function getCategories(): Promise<Category[]> {
  const all = PRODUCTS.map((p) => p.category);
  // Set menghilangkan duplikat, lalu dikembalikan sebagai array
  return [...new Set(all)] as Category[];
}

// ─── Utility ─────────────────────────────────────────────────────────────────

/** Format harga ke Rupiah */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}