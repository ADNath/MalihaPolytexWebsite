import { X } from "lucide-react";

interface Props {
  selectedCategory: string;
  selectedFilters: Record<string, string | null>;
  onCategoryReset: () => void;
  onRemoveFilter: (key: string) => void;
}

export default function ActiveFilters({
  selectedCategory,
  selectedFilters,
  onCategoryReset,
  onRemoveFilter,
}: Props) {
  const filters = Object.entries(selectedFilters).filter(
    ([, value]) => value !== null
  );

  const hasCategory = selectedCategory !== "all";
  const hasFilters = hasCategory || filters.length > 0;

  if (!hasFilters) return null;

  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Active Filters
          </h3>

          <div className="mt-4 flex flex-wrap gap-3">
            {hasCategory && (
              <button
                onClick={onCategoryReset}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-black transition hover:opacity-90"
              >
                {selectedCategory.toUpperCase()}
                <X size={16} />
              </button>
            )}

            {filters.map(([key, value]) => (
              <button
                key={key}
                onClick={() => onRemoveFilter(key)}
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-primary hover:text-primary"
              >
                {value}
                <X size={16} />
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            onCategoryReset();

            filters.forEach(([key]) => onRemoveFilter(key));
          }}
          className="text-sm font-semibold text-primary transition hover:underline"
        >
          Clear All
        </button>
      </div>
    </section>
  );
}