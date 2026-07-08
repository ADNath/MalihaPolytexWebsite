import FilterChip from "./FilterChip";
import type { ProductCategory } from "../../types/product";

interface Props {
  categories: ProductCategory[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function ProductCategoryTabs({
  categories,
  selectedCategory,
  onCategoryChange,
}: Props) {
  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">
        Product Category
      </h3>

      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <FilterChip
            key={category.id}
            label={category.name}
            active={selectedCategory === category.id}
            onClick={() => onCategoryChange(category.id)}
          />
        ))}
      </div>
    </section>
  );
}