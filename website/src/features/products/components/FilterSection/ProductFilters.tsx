import FilterGroup from "./FilterGroup";
import type { ProductCategory } from "../../types/product";

interface Props {
  category: ProductCategory;
  selectedFilters: Record<string, string | null>;
  onFilterChange: (key: string, value: string | null) => void;
}

export default function ProductFilters({
  category,
  selectedFilters,
  onFilterChange,
}: Props) {
  if (category.filters.length === 0) return null;

  return (
    <section className="mt-8 space-y-6">
      {category.filters.map((filter) => (
        <FilterGroup
          key={filter.key}
          label={filter.label}
          options={filter.options}
          value={selectedFilters[filter.key] ?? null}
          onChange={(value) =>
            onFilterChange(filter.key, value)
          }
        />
      ))}
    </section>
  );
}