import { useEffect, useState } from "react";
import type { Category, Product } from "@/types/product";
import { apiFetch } from "@/lib/api/client";

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export function useProducts(query?: string, category?: Category): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (category) params.set("category", category);

    apiFetch<Product[]>(`/api/products?${params.toString()}`)
      .then((data) => {
        if (active) {
          setProducts(data);
        }
      })
      .catch((err) => {
        if (active) {
          setError(err instanceof Error ? err.message : String(err));
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [query, category]);

  return {
    products,
    loading,
    error,
  };
}
