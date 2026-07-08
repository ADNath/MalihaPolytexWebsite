import { SlidersHorizontal } from "lucide-react";

import ProductCategoryTabs from "./ProductCategoryTabs";
import ProductFilters from "./ProductFilters";

import type { ProductCategory } from "../../types/product";

interface Props {
  categories: ProductCategory[];
  currentCategory: ProductCategory;
  selectedCategory: string;
  selectedFilters: Record<string, string | null>;
  onCategoryChange: (categoryId: string) => void;
  onFilterChange: (key: string, value: string | null) => void;
}

export default function FilterSection({
  categories,
  currentCategory,
  selectedCategory,
  selectedFilters,
  onCategoryChange,
  onFilterChange,
}: Props) {
  return (
    <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-6 lg:px-8">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
            <SlidersHorizontal className="h-6 w-6 text-primary" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Product Finder
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Browse products by category and specifications.
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="space-y-8 p-6 lg:p-8">
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-600">
            Product Category
          </h3>

          <ProductCategoryTabs
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
          />
        </div>

        {selectedCategory !== "all" && (
          <>
            <div className="border-t border-gray-200" />

            <div>
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-gray-600">
                Specifications
              </h3>

              <ProductFilters
                category={currentCategory}
                selectedFilters={selectedFilters}
                onFilterChange={onFilterChange}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
}