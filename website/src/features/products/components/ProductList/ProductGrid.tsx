import ProductCard from "./ProductCard";
import type { Product } from "../../types/product";

interface Props {
  products: Product[];
}

export default function ProductGrid({ products }: Props) {
  if (products.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-gray-300 py-20 text-center">
        <h3 className="text-xl font-semibold">
          No products found
        </h3>

        <p className="mt-2 text-gray-500">
          Try changing the filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}