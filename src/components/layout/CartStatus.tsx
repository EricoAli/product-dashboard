"use client";

import { useMemo } from "react";
import { useCart } from "@/state/cart-context";

export default function CartStatus() {
  const { items } = useCart();

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  return (
    <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm">
      <span className="mr-2 text-lg">🛒</span>
      <span>{totalItems} item{totalItems === 1 ? "" : "s"}</span>
    </div>
  );
}
