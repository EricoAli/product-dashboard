// src/app/error.tsx
"use client";
// Error boundary HARUS Client Component — menggunakan reset function dari React

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string }; // digest = ID error dari Next.js untuk debugging
  reset: () => void; // Fungsi dari Next.js untuk retry render
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error ke monitoring service (Sentry, Datadog, dll.)
    console.error("Application error:", error);
  }, [error]); // Hanya log ketika error berubah

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-5xl">⚠️</p>
      <h2 className="mt-4 text-xl font-bold text-gray-900">Terjadi Kesalahan</h2>
      <p className="mt-2 text-sm text-gray-500">{error.message}</p>
      <button
        onClick={reset} // reset() memicu Next.js untuk mencoba re-render halaman
        className="mt-6 rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold
                   text-white hover:bg-gray-700 transition-colors"
      >
        Coba Lagi
      </button>
    </div>
  );
}