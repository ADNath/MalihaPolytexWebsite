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
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => (
        <FilterChip
          key={category.id}
          label={category.name}
          large
          active={selectedCategory === category.id}
          onClick={() => onCategoryChange(category.id)}
        />
      ))}
    </div>
  );
}