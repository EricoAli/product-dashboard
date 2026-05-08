// src/components/ui/StockIndicator.tsx
interface StockIndicatorProps {
  stock: number;
}

export default function StockIndicator({ stock }: StockIndicatorProps) {
  const label =
    stock === 0 ? "Stok Habis" :
    stock <= 5  ? `Hampir habis (${stock} tersisa)` :
    stock <= 20 ? `Stok terbatas (${stock} tersisa)` :
                  `Tersedia (${stock})`;

  const color =
    stock === 0 ? "text-red-600" :
    stock <= 5  ? "text-orange-600" :
    stock <= 20 ? "text-yellow-600" :
                  "text-green-600";

  return <span className={`text-sm font-medium ${color}`}>{label}</span>;
}