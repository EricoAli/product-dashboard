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
import { getProductById, formatPrice } from "@/lib/data";
import Badge from "@/components/ui/Badge";
import StockIndicator from "@/components/ui/StockIndicator";
import AddToCartButton from "@/components/features/AddToCartButton";

// Props type untuk halaman dengan dynamic segment
interface ProductPageProps {
  params: Promise<{ id: string }>; // params.id = nilai dari [id] di URL
}

// generateMetadata: fungsi async khusus Next.js untuk metadata dinamis
// Dipanggil di server sebelum halaman di-render
export async function generateMetadata(
  { params }: ProductPageProps
): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) return { title: "Produk Tidak Ditemukan" };

  return {
    title: product.name, // Akan jadi: "Wireless Headphones | Product Dashboard"
    description: product.description,
  };
}

// generateStaticParams: opsional tapi PENTING untuk performa
// Memberitahu Next.js ID mana yang perlu di-pre-render saat build (Static Generation)
// Halaman yang tidak ada di list ini akan di-render on-demand (SSR)
export async function generateStaticParams() {
  // Di production, fetch semua ID dari API/DB
  return [
    { id: "1" }, { id: "2" }, { id: "3" }, { id: "4" },
    { id: "5" }, { id: "6" }, { id: "7" }, { id: "8" },
  ];
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;

  // Fetch data spesifik untuk ID ini — dijalankan di server
  const product = await getProductById(id);

  // Jika produk tidak ditemukan, tampilkan halaman 404
  // notFound() dari next/navigation → trigger not-found.tsx
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