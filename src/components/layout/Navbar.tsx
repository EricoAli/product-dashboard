// src/components/layout/Navbar.tsx
// Server Component — tidak ada interaktivitas, tidak perlu "use client"
// Di-render sekali di layout.tsx → tidak re-render saat navigasi antar halaman

import Link from "next/link";
import CartStatus from "@/components/layout/CartStatus";

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

        <div className="flex items-center gap-3">
          <CartStatus />
        </div>
      </div>
    </header>
  );
}