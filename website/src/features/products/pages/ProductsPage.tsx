import { useMemo, useState } from "react";

import Container from "@/components/ui/Container";
import PageHero from "@/components/common/PageHero";

import FilterSection from "../components/FilterSection/FilterSection";
import ActiveFilters from "../components/FilterSection/ActiveFilters";

import MobileFilterBar from "../components/Mobile/MobileFilterBar";

import ProductList from "../components/ProductList/ProductList";

import { productCategories } from "../data/productFilters";
import { demoProducts } from "../data/demoProducts";
import { filterProducts } from "../utils/filterProducts";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string | null>
  >({});

  const currentCategory =
    productCategories.find(
      (category) => category.id === selectedCategory
    ) ?? productCategories[0];

  const filteredProducts = useMemo(() => {
    return filterProducts(
      demoProducts,
      selectedCategory,
      selectedFilters
    );
  }, [selectedCategory, selectedFilters]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedFilters({});
  };

  const handleFilterChange = (
    key: string,
    value: string | null
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
    Object.values(selectedFilters).some((v) => v !== null);

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

            <ProductList products={filteredProducts} />
          </div>
        </Container>
      </section>
    </>
  );
}