
import type { Product } from "../../types/product";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

export default function ProductGrid({ products }: Props) {
  if (products.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-gray-300 bg-white py-20 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-4xl">
          📦
        </div>

        <h3 className="mt-6 text-2xl font-semibold text-gray-900">
          No Products Found
        </h3>

        <p className="mt-2 text-gray-500">
          Try changing your selected filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}