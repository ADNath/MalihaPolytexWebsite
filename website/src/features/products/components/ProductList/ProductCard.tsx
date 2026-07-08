import type { Product } from "../../types/product";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg">
      <div className="aspect-[4/3] bg-gray-100" />

      <div className="space-y-2 p-6">
        <h3 className="text-lg font-semibold">
          {product.name}
        </h3>

        <div className="space-y-1 text-sm text-gray-500">
          {product.denier && (
            <p>Denier : {product.denier}</p>
          )}

          {product.cuttingLength && (
            <p>Length : {product.cuttingLength}</p>
          )}

          {product.color && (
            <p>Color : {product.color}</p>
          )}
        </div>
      </div>
    </div>
  );
}