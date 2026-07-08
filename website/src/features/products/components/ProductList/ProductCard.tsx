import type { Product } from "../../types/product";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="min-h-[56px] text-xl font-semibold leading-snug text-gray-900">
          {product.name}
        </h3>

        <div className="my-5 border-t border-gray-100" />

        <div className="space-y-3 text-sm">
          {product.denier && (
            <div className="flex items-center justify-between">
              <span className="text-gray-500">
                Denier
              </span>

              <span className="font-semibold text-gray-900">
                {product.denier}
              </span>
            </div>
          )}

          {product.cuttingLength && (
            <div className="flex items-center justify-between">
              <span className="text-gray-500">
                Cutting Length
              </span>

              <span className="font-semibold text-gray-900">
                {product.cuttingLength}
              </span>
            </div>
          )}

          {product.color && (
            <div className="flex items-center justify-between">
              <span className="text-gray-500">
                Color
              </span>

              <span className="font-semibold text-gray-900">
                {product.color}
              </span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}