import type { Category, Product } from "@/types/product";
import { apiFetch } from "@/lib/api/client";
import { getAllProducts, getCategories, getProductById } from "@/lib/data";

export async function getProductsData(): Promise<Product[]> {
  return getAllProducts();
}

export async function getProductByIdData(id: string): Promise<Product | undefined> {
  return getProductById(id);
}

export async function getProductCategoriesData(): Promise<Category[]> {
  return getCategories();
}

export async function fetchProducts(query?: string, category?: Category): Promise<Product[]> {
  const params = new URLSearchParams();

  if (query) params.set("q", query);
  if (category) params.set("category", category);

  const url = `/api/products?${params.toString()}`;
  return apiFetch<Product[]>(url);
}

export async function fetchProductById(id: string): Promise<Product> {
  return apiFetch<Product>(`/api/products/${encodeURIComponent(id)}`);
}
