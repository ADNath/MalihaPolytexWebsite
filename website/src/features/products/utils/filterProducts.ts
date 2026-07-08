import type { Product } from "../types/product";

export function filterProducts(
  products: Product[],
  category: string,
  filters: Record<string, string | null>,
) {
  return products.filter((product) => {
    if (category !== "all" && product.category !== category) {
      return false;
    }

    for (const [key, value] of Object.entries(filters)) {
      if (!value) continue;

      if (product[key] !== value) {
        return false;
      }
    }

    return true;
  });
}
