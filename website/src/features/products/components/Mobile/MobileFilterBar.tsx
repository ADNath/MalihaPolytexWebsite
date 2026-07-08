import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

import MobileFilterDrawer from "./MobileFilterDrawer";
import type { ProductCategory } from "../../types/product";

interface Props {
  categories: ProductCategory[];
  currentCategory: ProductCategory;

  selectedCategory: string;
  selectedFilters: Record<string, string | null>;

  onCategoryChange: (categoryId: string) => void;
  onFilterChange: (key: string, value: string | null) => void;
}

export default function MobileFilterBar({
  categories,
  currentCategory,
  selectedCategory,
  selectedFilters,
  onCategoryChange,
  onFilterChange,
}: Props) {
  const [open, setOpen] = useState(false);

  const activeFilterCount =
    (selectedCategory !== "all" ? 1 : 0) +
    Object.values(selectedFilters).filter(
      (value) => value !== null
    ).length;

  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex w-full items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
              <SlidersHorizontal className="h-5 w-5 text-green-700" />
            </div>

            <div className="text-left">
              <h3 className="font-semibold text-gray-900">
                Product Filters
              </h3>

              <p className="text-sm text-gray-500">
                {activeFilterCount} Active Filter
                {activeFilterCount !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <span className="rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
            Open
          </span>
        </button>
      </div>

      <MobileFilterDrawer
        open={open}
        onClose={() => setOpen(false)}
        categories={categories}
        currentCategory={currentCategory}
        selectedCategory={selectedCategory}
        selectedFilters={selectedFilters}
        onCategoryChange={onCategoryChange}
        onFilterChange={onFilterChange}
      />
    </>
  );
}