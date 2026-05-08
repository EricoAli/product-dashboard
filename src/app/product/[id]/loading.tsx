// src/app/product/[id]/loading.tsx
// Suspense boundary otomatis untuk route /product/[id]
// Ditampilkan saat Server Component page.tsx sedang await getProductById()

export default function ProductDetailLoading() {
  return (
    <div>
      {/* Breadcrumb skeleton */}
      <div className="mb-6 h-4 w-48 animate-pulse rounded bg-gray-200" />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Gambar skeleton */}
        <div className="aspect-square animate-pulse rounded-xl bg-gray-200" />

        {/* Detail skeleton */}
        <div className="space-y-4">
          <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200" />
          <div className="h-8 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-8 w-3/4 animate-pulse rounded bg-gray-200" />
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-4 animate-pulse rounded bg-gray-200" />
            ))}
          </div>
          <div className="h-10 w-32 animate-pulse rounded bg-gray-200" />
          <div className="mt-8 h-12 w-full animate-pulse rounded-xl bg-gray-200" />
        </div>
      </div>
    </div>
  );
}