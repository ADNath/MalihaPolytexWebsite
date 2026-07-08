import ProductGrid from "./ProductGrid";
import type { Product } from "../../types/product";

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Products
        </h2>

        <p className="text-sm text-gray-500">
          Showing {products.length} Products
        </p>
      </div>

      <ProductGrid products={products} />
    </section>
  );
}