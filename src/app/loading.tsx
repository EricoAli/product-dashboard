// src/app/loading.tsx
// ═══════════════════════════════════════════════════════════
// KONSEP: REACT SUSPENSE BOUNDARY (otomatis via Next.js)
// ═══════════════════════════════════════════════════════════
// File ini secara OTOMATIS jadi fallback Suspense untuk route "/"
// Ditampilkan selama Server Component di page.tsx masih await data
// React "menangguhkan" render sampai Promise selesai → user lihat skeleton

// Ini Server Component (tidak butuh "use client")
export default function Loading() {
  return (
    <div>
      <div className="mb-8">
        {/* Skeleton untuk judul */}
        <div className="h-9 w-48 animate-pulse rounded-lg bg-gray-200" />
        <div className="mt-2 h-5 w-24 animate-pulse rounded bg-gray-200" />
      </div>

      {/* Skeleton untuk search bar */}
      <div className="mb-6 h-11 animate-pulse rounded-xl bg-gray-200" />

      {/* Skeleton untuk product grid — mereplikasi layout asli */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Buat 8 skeleton card */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-xl border border-gray-100 bg-white">
            <div className="aspect-video animate-pulse bg-gray-200" />
            <div className="p-4 space-y-3">
              <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
              <div className="h-5 w-full animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
              <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}