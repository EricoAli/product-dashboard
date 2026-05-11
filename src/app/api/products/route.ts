import { NextResponse } from "next/server";
import { getAllProducts } from "@/lib/data";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q")?.toLowerCase() ?? "";
  const category = url.searchParams.get("category");

  let products = await getAllProducts();

  if (category) {
    products = products.filter((product) => product.category === category);
  }

  if (query) {
    products = products.filter((product) => {
      return (
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    });
  }

  return NextResponse.json(products);
}
