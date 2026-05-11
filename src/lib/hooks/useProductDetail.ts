import { useEffect, useState } from "react";
import type { Product } from "@/types/product";
import { apiFetch } from "@/lib/api/client";

interface UseProductDetailResult {
  product: Product | null;
  loading: boolean;
  error: string | null;
}

export function useProductDetail(id?: string): UseProductDetailResult {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setProduct(null);
      setError("Product ID is required.");
      return;
    }

    let active = true;
    setLoading(true);
    setError(null);

    apiFetch<Product>(`/api/products/${encodeURIComponent(id)}`)
      .then((data) => {
        if (active) {
          setProduct(data);
        }
      })
      .catch((err) => {
        if (active) {
          setProduct(null);
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
  }, [id]);

  return { product, loading, error };
}
