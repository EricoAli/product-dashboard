// src/components/ui/ProductCard.tsx
// ═══════════════════════════════════════════════════════════
// KONSEP: REUSABLE SERVER COMPONENT
// ═══════════════════════════════════════════════════════════
// Tidak ada "use client" → ini Server Component
// Server Component TIDAK bisa: useState, useEffect, onClick handler, browser API
// Server Component BISA: async/await, akses langsung ke DB/file system, env vars

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/data";
import Badge from "./Badge";

interface ProductCardProps {
  product: Product;
}

// Komponen reusable — satu komponen, dipakai di halaman utama & search result
// Props sebagai "contract" — siapapun yang pakai Card harus kirim `product`
export default function ProductCard({ product }: ProductCardProps) {
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock === 0;

  return (
    // Link membungkus seluruh Card → UX lebih baik, seluruh area bisa diklik
    // prefetch={false} untuk menghindari prefetch berlebihan di list panjang
    <Link
      href={`/product/${product.id}`}  // Dynamic route: /product/1, /product/2, dst.
      className="group block overflow-hidden rounded-xl border border-gray-100
                 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
    >
      {/* Gambar Produk */}
      <div className="relative aspect-video overflow-hidden bg-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          fill                    // fill = gambar mengisi parent div
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Overlay badge stok — hanya muncul jika relevan */}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-gray-800">
              Stok Habis
            </span>
          </div>
        )}
        {isLowStock && !isOutOfStock && (
          <div className="absolute right-2 top-2">
            <span className="rounded-full bg-orange-500 px-2 py-0.5 text-xs text-white font-medium">
              Sisa {product.stock}
            </span>
          </div>
        )}
      </div>

      {/* Konten Card */}
      <div className="p-4">
        {/* Badge kategori — komponen reusable tersendiri */}
        <Badge category={product.category} />

        {/* Nama Produk */}
        <h3 className="mt-2 line-clamp-2 font-semibold text-gray-900 group-hover:text-blue-600">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="mt-1 flex items-center gap-1 text-sm text-gray-500">
          <span className="text-yellow-400">★</span>
          <span>{product.rating}</span>
        </div>

        {/* Harga */}
        <div className="mt-3 font-bold text-gray-900">
          {formatPrice(product.price)}
        </div>
      </div>
    </Link>
  );
}