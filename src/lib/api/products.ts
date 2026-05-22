import type { Category, Product } from "@/types/product";
import { apiFetch } from "@/lib/api/client";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000/api';

export async function getProductsData(): Promise<Product[]> {
  return apiFetch<Product[]>(`${API_BASE}/products`);
}

export async function getProductByIdData(id: string): Promise<Product | undefined> {
  try {
    return await apiFetch<Product>(`${API_BASE}/products/${encodeURIComponent(id)}`);
  } catch (error: any) {
    if (typeof error?.message === 'string' && error.message.toLowerCase().includes('not found')) {
      return undefined;
    }
    throw error;
  }
}

export async function getProductCategoriesData(): Promise<Category[]> {
  const products = await getProductsData();
  const categories = Array.from(new Set(products.map(p => p.category)));
  return categories as Category[];
}

export async function fetchProducts(query?: string, category?: Category): Promise<Product[]> {
  const params = new URLSearchParams();

  if (query) params.set("q", query);
  if (category) params.set("category", category);

  const url = `${API_BASE}/products?${params.toString()}`;
  return apiFetch<Product[]>(url);
}

export async function fetchProductById(id: string): Promise<Product> {
  return apiFetch<Product>(`${API_BASE}/products/${encodeURIComponent(id)}`);
}
