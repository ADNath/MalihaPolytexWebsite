import { useEffect, useMemo, useState } from "react";

import Container from "@/components/ui/Container";
import PageHero from "@/components/common/PageHero";

import FilterSection from "../components/FilterSection/FilterSection";
import ActiveFilters from "../components/FilterSection/ActiveFilters";
import MobileFilterBar from "../components/Mobile/MobileFilterBar";
import ProductList from "../components/ProductList/ProductList";

import { productCategories } from "../data/productFilters";
import { filterProducts } from "../utils/filterProducts";

import usePageTitle from "@/hooks/usePageTitle";
import { getImageUrl } from "@/utils/image";

import { getProducts } from "@/services/api/productApi";
import type { Product } from "../types/product";

export default function ProductsPage() {
  usePageTitle("Products | Maliha Poly Tex Fiber Industry Ltd.");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("all");

  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string | null>
  >({});

  const currentCategory =
    productCategories.find(
      (category) => category.id === selectedCategory,
    ) ?? productCategories[0];

  const filteredProducts = useMemo(() => {
    return filterProducts(
      products,
      selectedCategory,
      selectedFilters,
    );
  }, [products, selectedCategory, selectedFilters]);

  async function loadProducts() {
    try {
      setLoading(true);

      const response = await getProducts();

      if (response.success) {
        const data: Product[] = (response.data ?? [])
          .filter((x) => x.isActive)
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((x) => ({
            id: x.productId,
            category: x.category
              .toLowerCase()
              .replace(/\s+/g, "-"),
            name: x.name,
            image: getImageUrl(x.image),
            denier: x.denier ?? undefined,
            cuttingLength: x.cuttingLength ?? undefined,
            color: x.color ?? undefined,
          }));

        setProducts(data);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadProducts();
  }, []);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedFilters({});
  };

  const handleFilterChange = (
    key: string,
    value: string | null,
  ) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleRemoveFilter = (key: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: null,
    }));
  };

  const handleResetCategory = () => {
    setSelectedCategory("all");
    setSelectedFilters({});
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    Object.values(selectedFilters).some(
      (value) => value !== null,
    );

  return (
    <>
      <PageHero
        title="Products"
        breadcrumbs={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: "Products",
          },
        ]}
      />

          <section className="py-5 lg:py-5">
        <Container size="xl">
          <div className="space-y-8">
            {/* Mobile */}
            <div className="lg:hidden">
              <MobileFilterBar
                categories={productCategories}
                currentCategory={currentCategory}
                selectedCategory={selectedCategory}
                selectedFilters={selectedFilters}
                onCategoryChange={handleCategoryChange}
                onFilterChange={handleFilterChange}
              />
            </div>

            {/* Desktop */}
            <div className="hidden lg:block">
              <FilterSection
                categories={productCategories}
                currentCategory={currentCategory}
                selectedCategory={selectedCategory}
                selectedFilters={selectedFilters}
                onCategoryChange={handleCategoryChange}
                onFilterChange={handleFilterChange}
              />
            </div>

            {hasActiveFilters && (
              <ActiveFilters
                selectedCategory={selectedCategory}
                selectedFilters={selectedFilters}
                onCategoryReset={handleResetCategory}
                onRemoveFilter={handleRemoveFilter}
              />
            )}

            {loading ? (
              <div className="rounded-3xl border border-gray-200 bg-white py-20 text-center text-gray-500">
                Loading products...
              </div>
            ) : (
              <ProductList products={filteredProducts} />
            )}
          </div>
        </Container>
      </section>
    </>
  );
}