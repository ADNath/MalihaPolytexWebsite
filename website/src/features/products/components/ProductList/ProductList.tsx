import ProductGrid from "./ProductGrid";
import type { Product } from "../../types/product";

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-5 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Products
          </h2>

          <p className="mt-2 text-gray-500">
            Explore our complete range of high-quality recycled polyester products.
          </p>
        </div>

        <div className="flex items-center">
          <div className="rounded-2xl border border-green-200 bg-green-50 px-5 py-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-700">
                {products.length}
              </div>

              <div className="text-xs font-medium uppercase tracking-wide text-green-700">
                Product{products.length !== 1 ? "s" : ""}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductGrid products={products} />
    </section>
  );
}