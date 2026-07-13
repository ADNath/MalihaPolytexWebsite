import { useEffect, useMemo, useState } from "react";

import {
  createWhatWeDoItem,
  deleteWhatWeDoItem,
  getWhatWeDoItems,
  updateWhatWeDoItem,
  type WhatWeDoItemRequest,
  type WhatWeDoItemResponse,
} from "@/api/whatWeDoApi";

import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Loading from "@/components/ui/Loading";
import EmptyState from "@/components/ui/EmptyState";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import SearchInput from "@/components/ui/SearchInput";
import StatusBadge from "@/components/ui/StatusBadge";
import ActionButtons from "@/components/ui/ActionButtons";

import {
  Award,
  BadgeCheck,
  Boxes,
  Building2,
  Cog,
  Factory,
  Globe2,
  Leaf,
  Package,
  Recycle,
  ShieldCheck,
  Star,
  Target,
  Trophy,
  Truck,
  Users,
  type LucideIcon,
} from "lucide-react";

import WhatWeDoDialog from "./WhatWeDoDialog";

const iconMap: Record<string, LucideIcon> = {
  Users,
  Cog,
  Trophy,
  Factory,
  Award,
  Recycle,
  Globe2,
  Leaf,
  ShieldCheck,
  Boxes,
  Building2,
  Truck,
  Package,
  BadgeCheck,
  Target,
  Star,
};

export default function WhatWeDoPage() {
  const [items, setItems] = useState<WhatWeDoItemResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);

  const [selectedItem, setSelectedItem] =
    useState<WhatWeDoItemResponse | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [deleteId, setDeleteId] = useState<number>();

  useEffect(() => {
    void loadItems();
  }, []);

  async function loadItems() {
    try {
      setLoading(true);

      const response = await getWhatWeDoItems();

      if (response.success) {
        setItems(response.data);
      }
    } finally {
      setLoading(false);
    }
  }

  const filteredItems = useMemo(() => {
    return items.filter((x) =>
      x.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [items, search]);

  async function handleSave(request: WhatWeDoItemRequest) {
    if (selectedItem) {
      await updateWhatWeDoItem(
        selectedItem.whatWeDoItemId,
        request,
      );
    } else {
      await createWhatWeDoItem(request);
    }

    setDialogOpen(false);

    await loadItems();
  }

  async function handleDelete() {
    if (!deleteId) return;

    await deleteWhatWeDoItem(deleteId);

    setDeleteDialogOpen(false);

    await loadItems();
  }

  return (
    <>
      <PageHeader
        title="What We Do"
        subtitle="Manage homepage What We Do cards."
      >
        <Button
          onClick={() => {
            setSelectedItem(null);
            setDialogOpen(true);
          }}
        >
          + Add Item
        </Button>
      </PageHeader>

      <div className="mb-5 flex justify-between">
        <SearchInput
          value={search}
          onChange={setSearch}
        />
      </div>

      <Card className="overflow-hidden">
        {loading ? (
          <Loading />
        ) : filteredItems.length === 0 ? (
          <EmptyState />
        ) : (
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-4 text-center text-sm font-semibold">
                  Icon
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Title
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
              {filteredItems.map((item) => {
                const Icon =
                  iconMap[item.icon] ?? Users;

                return (
                  <tr
                    key={item.whatWeDoItemId}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex justify-center">
                        <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                          <Icon size={24} />
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-semibold">
                        {item.title}
                      </div>

                      <div className="line-clamp-2 text-sm text-gray-500">
                        {item.description}
                      </div>
                    </td>

                    <td className="text-center">
                      {item.displayOrder}
                    </td>

                    <td className="text-center">
                      <StatusBadge active={item.isActive} />
                    </td>

                    <td>
                      <ActionButtons
                        onEdit={() => {
                          setSelectedItem(item);
                          setDialogOpen(true);
                        }}
                        onDelete={() => {
                          setDeleteId(item.whatWeDoItemId);
                          setDeleteDialogOpen(true);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </Card>

      <WhatWeDoDialog
        open={dialogOpen}
        item={selectedItem}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        title="Delete Item"
        message="Are you sure you want to delete this item?"
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}