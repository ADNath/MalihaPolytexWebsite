import { useMemo, useState } from "react";

import Container from "@/components/ui/Container";
import PageHero from "@/components/common/PageHero";

import ProductCategoryTabs from "../components/FilterSection/ProductCategoryTabs";
import ProductFilters from "../components/FilterSection/ProductFilters";

import { productCategories } from "../data/productFilters";
import { demoProducts } from "../data/demoProducts";
import { filterProducts } from "../utils/filterProducts";
import ProductList from "../components/ProductList/ProductList";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("psf");
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string | null>
  >({});

  const currentCategory =
    productCategories.find(
      (category) => category.id === selectedCategory
    ) ?? productCategories[0];

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);

    // Reset filters
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

  const filteredProducts = useMemo(() => {
    return filterProducts(
      demoProducts,
      selectedCategory,
      selectedFilters
    );
  }, [selectedCategory, selectedFilters]);

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

      <section className="py-16">
        <Container size="xl">
          <div className="space-y-12">
            {/* Category */}
            <ProductCategoryTabs
              categories={productCategories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />

            {/* Dynamic Filters */}
            <ProductFilters
              category={currentCategory}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
            />

            {/* Products */}
            <ProductList products={filteredProducts} />
          </div>
        </Container>
      </section>
    </>
  );
}