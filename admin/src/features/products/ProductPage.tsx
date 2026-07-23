import { useEffect, useMemo, useState } from "react";

import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "@/services/productService";

import type { Product, ProductRequest } from "@/types/product";


import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Loading from "@/components/ui/Loading";
import EmptyState from "@/components/ui/EmptyState";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import SearchInput from "@/components/ui/SearchInput";
import StatusBadge from "@/components/ui/StatusBadge";
import ActionButtons from "@/components/ui/ActionButtons";
import ProductDialog from "./ProductDialog";
import { getImageUrl } from "@/utils/image";


export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [deleteId, setDeleteId] = useState<number>();

  useEffect(() => {
    void loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setLoading(true);

      const data = await getProducts();

      setProducts(data);
    } finally {
      setLoading(false);
    }
  }

  const filteredProducts = useMemo(() => {
    return products.filter(
      (x) =>
        x.name.toLowerCase().includes(search.toLowerCase()) ||
        x.category.toLowerCase().includes(search.toLowerCase()),
    );
  }, [products, search]);

  async function handleSave(request: ProductRequest) {
    if (selectedProduct) {
      await updateProduct(selectedProduct.productId, request);
    } else {
      await createProduct(request);
    }

    setDialogOpen(false);

    await loadProducts();
  }

  async function handleDelete() {
    if (!deleteId) return;

    await deleteProduct(deleteId);

    setDeleteDialogOpen(false);

    await loadProducts();
  }

  return (
    <>
      <PageHeader title="Products" subtitle="Manage products.">
        <Button
          onClick={() => {
            setSelectedProduct(null);
            setDialogOpen(true);
          }}
        >
          + Add Product
        </Button>
      </PageHeader>

      <div className="mb-5 flex justify-between">
        <SearchInput value={search} onChange={setSearch} />
      </div>

      <Card className="overflow-hidden">
        {loading ? (
          <Loading />
        ) : filteredProducts.length === 0 ? (
          <EmptyState />
        ) : (
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-4 text-center text-sm font-semibold">
                  Image
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Product
                </th>

                <th className="px-5 py-4 text-center text-sm font-semibold">
                  Category
                </th>

                <th className="px-5 py-4 text-center text-sm font-semibold">
                  Specification
                </th>

                <th className="px-5 py-4 text-center text-sm font-semibold">
                  Order
                </th>

                <th className="px-5 py-4 text-center text-sm font-semibold">
                  Status
                </th>

                <th className="px-5 py-4 text-center text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((item) => (
                <tr key={item.productId} className="border-t hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <div className="flex justify-center">
                      <img
                        src={getImageUrl(item.image)}
                        
                        alt={item.name}
                        className="h-16 w-24 rounded-lg border object-cover"
                      />
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="font-semibold">{item.name}</div>

                    {item.description && (
                      <div className="mt-1 line-clamp-2 text-sm text-gray-500">
                        {item.description}
                      </div>
                    )}
                  </td>

                  <td className="px-5 py-4 text-center">{item.category}</td>

                  <td className="px-5 py-4 text-sm">
                    {item.category === "PSF" ? (
                      <div className="space-y-1">
                        <div>
                          <span className="font-medium">Denier:</span>{" "}
                          {item.denier || "-"}
                        </div>

                        <div>
                          <span className="font-medium">Cut:</span>{" "}
                          {item.cuttingLength || "-"}
                        </div>

                        <div>
                          <span className="font-medium">Color:</span>{" "}
                          {item.color || "-"}
                        </div>
                      </div>
                    ) : item.category === "Granule" ? (
                      <div>
                        <span className="font-medium">Color:</span>{" "}
                        {item.color || "-"}
                      </div>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>

                  <td className="px-5 py-4 text-center">{item.displayOrder}</td>

                  <td className="px-5 py-4 text-center">
                    <StatusBadge active={item.isActive} />
                  </td>

                  <td className="px-5 py-4">
                    <ActionButtons
                      onEdit={() => {
                        setSelectedProduct(item);
                        setDialogOpen(true);
                      }}
                      onDelete={() => {
                        setDeleteId(item.productId);
                        setDeleteDialogOpen(true);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
      <ProductDialog
        open={dialogOpen}
        product={selectedProduct}
        onClose={() => {
          setDialogOpen(false);
          setSelectedProduct(null);
        }}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        title="Delete Product"
        message="Are you sure you want to delete this product?"
        onClose={() => {
          setDeleteDialogOpen(false);
          setDeleteId(undefined);
        }}
        onConfirm={handleDelete}
      />
    </>
  );
}
