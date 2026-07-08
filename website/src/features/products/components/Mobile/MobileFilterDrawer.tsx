import { X } from "lucide-react";

import ProductCategoryTabs from "../FilterSection/ProductCategoryTabs";
import ProductFilters from "../FilterSection/ProductFilters";

import type { ProductCategory } from "../../types/product";

interface Props {
  open: boolean;
  onClose: () => void;

  categories: ProductCategory[];
  currentCategory: ProductCategory;

  selectedCategory: string;
  selectedFilters: Record<string, string | null>;

  onCategoryChange: (categoryId: string) => void;
  onFilterChange: (key: string, value: string | null) => void;
}

export default function MobileFilterDrawer({
  open,
  onClose,
  categories,
  currentCategory,
  selectedCategory,
  selectedFilters,
  onCategoryChange,
  onFilterChange,
}: Props) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3">
          <div className="h-1.5 w-14 rounded-full bg-gray-300" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Product Filters
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Browse products by category and specifications.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 transition hover:bg-gray-100"
          >
            <X className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-8 p-5">
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

        {/* Footer */}
        <div className="sticky bottom-0 border-t border-gray-200 bg-white p-5">
          <button
            onClick={onClose}
            className="w-full rounded-2xl bg-green-700 py-3 font-semibold text-white transition hover:bg-green-800"
          >
            Done
          </button>
        </div>
      </div>
    </>
  );
}