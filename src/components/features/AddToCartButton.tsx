// src/components/features/AddToCartButton.tsx
"use client";
// ═══════════════════════════════════════════════════════════
// KONSEP: CLIENT COMPONENT DENGAN MULTIPLE STATES
// ═══════════════════════════════════════════════════════════
// Tombol ini membutuhkan:
// 1. onClick handler → harus Client Component
// 2. State untuk quantity (angka)
// 3. State untuk feedback "added to cart"

import { useState, useCallback, useMemo } from "react";
import type { Product } from "@/types/product";
import { useCartDispatch } from "@/state/cart-context";

interface AddToCartButtonProps {
  product: Product; // Data dikirim dari Server Component (page.tsx)
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const dispatch = useCartDispatch();
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState<"idle" | "added" | "error">("idle");

  const isOutOfStock = useMemo(() => product.stock === 0, [product.stock]);

  const handleAddToCart = useCallback(() => {
    if (isOutOfStock) {
      setStatus("error");
      return;
    }

    dispatch({
      type: "ADD_ITEM",
      payload: { product, quantity },
    });
    setStatus("added");

    window.setTimeout(() => setStatus("idle"), 2000);
  }, [dispatch, product, quantity, isOutOfStock]);

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700">Jumlah:</span>
        <div className="flex items-center rounded-xl border border-gray-200">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))} // Tidak boleh < 1
            disabled={quantity <= 1}
            className="px-3 py-2 text-gray-500 hover:text-gray-900 disabled:opacity-30"
          >
            −
          </button>
          {/* Ini "controlled display" — nilainya dari state, bukan DOM */}
          <span className="min-w-[2rem] text-center text-sm font-semibold">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))} // Max = stok
            disabled={quantity >= product.stock || isOutOfStock}
            className="px-3 py-2 text-gray-500 hover:text-gray-900 disabled:opacity-30"
          >
            +
          </button>
        </div>
        <span className="text-xs text-gray-400">Stok: {product.stock}</span>
      </div>

      {/* Add to Cart Button — UI berubah berdasarkan status state */}
      <button
        onClick={handleAddToCart}
        disabled={isOutOfStock || status === "added"}
        className={`w-full rounded-xl px-6 py-3 font-semibold transition-all duration-300 ${
          isOutOfStock
            ? "cursor-not-allowed bg-gray-100 text-gray-400"
            : status === "added"
            ? "bg-green-500 text-white"  // State "added" → warna hijau
            : "bg-gray-900 text-white hover:bg-gray-700 active:scale-95"
        }`}
      >
        {/* Conditional rendering berdasarkan state — tidak perlu if-else terpisah */}
        {isOutOfStock ? "Stok Habis" : status === "added" ? "✓ Ditambahkan!" : "Tambah ke Keranjang"}
      </button>
    </div>
  );
}