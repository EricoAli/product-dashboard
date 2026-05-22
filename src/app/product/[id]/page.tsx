// src/app/product/[id]/page.tsx
// ═══════════════════════════════════════════════════════════
// KONSEP: DYNAMIC ROUTING + SSR
// ═══════════════════════════════════════════════════════════
// [id] di nama folder = dynamic segment
// Satu file ini menangani SEMUA route: /product/1, /product/2, dst.
// Next.js inject nilai segment ke prop "params"

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductByIdData } from "@/lib/api/products";
import { formatPrice } from "@/lib/data";
import Badge from "@/components/ui/Badge";
import StockIndicator from "@/components/ui/StockIndicator";
import AddToCartButton from "@/components/features/AddToCartButton";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

// generateMetadata: fungsi async khusus Next.js untuk metadata dinamis
// Dipanggil di server sebelum halaman di-render
export async function generateMetadata(
  { params }: ProductPageProps
): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductByIdData(id);

  if (!product) return { title: "Produk Tidak Ditemukan" };

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;

  let product;
  try {
    product = await getProductByIdData(id);
  } catch (error) {
    notFound();
  }

  if (!product) {
    notFound();
  }

  return (
    <div>
      {/* Breadcrumb navigasi */}
      <nav className="mb-6 text-sm text-gray-500">
        {/* Link dari next/link: navigasi client-side (SPA-like), tidak full reload */}
        <Link href="/" className="hover:text-gray-900">
          Semua Produk
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Kolom Gambar */}
        <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
          {/* next/image: otomatis optimasi ukuran, format WebP, lazy load */}
          <Image
            src={product.image}
            alt={product.name}
            fill                    // fill = ikuti ukuran parent container
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw" // hint untuk browser pilih ukuran
            priority                // LCP element — tidak lazy load, langsung fetch
          />
        </div>

        {/* Kolom Detail */}
        <div className="flex flex-col">
          <Badge category={product.category} />

          <h1 className="mt-3 text-2xl font-bold text-gray-100 sm:text-3xl">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-yellow-400">★</span>
            <span className="font-semibold">{product.rating}</span>
            <span className="text-gray-400">/5.0</span>
          </div>

          <p className="mt-4 text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Harga */}
          <div className="mt-6 text-3xl font-bold text-gray-100">
            {formatPrice(product.price)}
          </div>

          {/* Stock indicator — Server Component */}
          <div className="mt-2">
            <StockIndicator stock={product.stock} />
          </div>

          {/* AddToCartButton — Client Component (butuh onClick, state) */}
          {/* Data produk dikirim sebagai props dari Server ke Client Component */}
          <div className="mt-8">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}