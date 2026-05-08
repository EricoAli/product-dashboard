// src/components/ui/Badge.tsx
// Komponen atom — sekecil mungkin, satu tanggung jawab
// Reusable di ProductCard dan halaman detail tanpa perlu props berlebihan

import type { Category } from "@/types/product";

// Lookup object lebih efisien & mudah dibaca daripada switch/if-else
// Tambah kategori baru = tambah satu baris di sini, tidak ubah komponen
const STYLES: Record<Category, string> = {
  Electronics:      "bg-blue-50 text-blue-700",
  Clothing:         "bg-purple-50 text-purple-700",
  Books:            "bg-yellow-50 text-yellow-700",
  "Home & Kitchen": "bg-green-50 text-green-700",
  Sports:           "bg-orange-50 text-orange-700",
};

export default function Badge({ category }: { category: Category }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${STYLES[category]}`}>
      {category}
    </span>
  );
}