// src/app/not-found.tsx
// Ditampilkan saat notFound() dipanggil atau URL tidak cocok dengan route apapun
// Berlaku untuk seluruh aplikasi (bisa juga dibuat per-route)

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-6xl">📦</p>
      <h2 className="mt-4 text-2xl font-bold text-gray-900">Halaman Tidak Ditemukan</h2>
      <p className="mt-2 text-gray-500">
        Produk yang kamu cari tidak ada atau sudah dihapus.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white
                   hover:bg-gray-700 transition-colors"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}