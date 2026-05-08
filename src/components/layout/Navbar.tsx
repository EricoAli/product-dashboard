// src/components/layout/Navbar.tsx
// Server Component — tidak ada interaktivitas, tidak perlu "use client"
// Di-render sekali di layout.tsx → tidak re-render saat navigasi antar halaman

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo/Brand — Link ke home */}
        <Link href="/" className="flex items-center gap-2 font-bold text-gray-900">
          <span className="text-xl">📦</span>
          <span>ProductShop</span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden items-center gap-6 text-sm text-gray-600 sm:flex">
          <Link href="/" className="hover:text-gray-900 transition-colors">
            Produk
          </Link>
          {/* Tambah link navigasi lain di sini */}
        </nav>

        {/* Cart icon (placeholder) */}
        <div className="flex items-center gap-3">
          <button className="relative rounded-xl p-2 text-gray-500 hover:bg-gray-100">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6h13M9 19a1 1 0 100 2 1 1 0 000-2zm8 0a1 1 0 100 2 1 1 0 000-2z"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}