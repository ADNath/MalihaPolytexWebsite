import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import type {
  WalkInApplication,
  WalkInApplicationStatusUpdateRequest,
} from "@/types/walkInApplication";

import { careerApplicationStatuses } from "@/types/walkInApplication";

import Card from "@/components/ui/Card";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import EmptyState from "@/components/ui/EmptyState";


import {
  getWalkInApplications,
  updateWalkInApplicationStatus,
  deleteWalkInApplication,
} from "@/services/walkInApplicationService";
import WalkInApplicationsTable from "./WalkInApplicationsTable";
import WalkInApplicationDetailsDialog from "./WalkInApplicationDetailsDialog";

export default function WalkInApplicationsPage() {
  const [items, setItems] = useState<WalkInApplication[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [selectedItem, setSelectedItem] =
    useState<WalkInApplication | null>(null);

  const [deleteItem, setDeleteItem] =
    useState<WalkInApplication | null>(null);

  useEffect(() => {
    void loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);

      const response =
        await getWalkInApplications();

      setItems(response);
    } catch {
      toast.error(
        "Failed to load walk-in applications.",
      );
    } finally {
      setLoading(false);
    }
  }

  function handleView(
    item: WalkInApplication,
  ) {
    setSelectedItem(item);
    setDialogOpen(true);
  }

  async function handleSave(
    request: WalkInApplicationStatusUpdateRequest,
  ) {
    if (!selectedItem) return;

    try {
      setSaving(true);

      await updateWalkInApplicationStatus(
        selectedItem.walkInApplicationId,
        request,
      );

      toast.success(
        "Application updated successfully.",
      );

      setDialogOpen(false);
      setSelectedItem(null);

      await loadData();
    } catch {
      toast.error(
        "Failed to update application.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteItem) return;

    try {
      await deleteWalkInApplication(
        deleteItem.walkInApplicationId,
      );

      toast.success(
        "Application deleted successfully.",
      );

      if (
        selectedItem?.walkInApplicationId ===
        deleteItem.walkInApplicationId
      ) {
        setDialogOpen(false);
        setSelectedItem(null);
      }

      setDeleteItem(null);

      await loadData();
    } catch {
      toast.error(
        "Failed to delete application.",
      );
    }
  }

  return (
    <>
      <Card>
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            Walk-in Applications
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Review and manage walk-in
            applications.
          </p>
        </div>

        {items.length === 0 &&
        !loading ? (
          <EmptyState
            title="No Walk-in Applications"
          />
        ) : (
          <WalkInApplicationsTable
            items={items}
            loading={loading}
            onView={handleView}
            onDelete={setDeleteItem}
          />
        )}
      </Card>

      <WalkInApplicationDetailsDialog
        open={dialogOpen}
        application={selectedItem}
        statuses={careerApplicationStatuses}
        loading={saving}
        onClose={() => {
          setDialogOpen(false);
          setSelectedItem(null);
        }}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={!!deleteItem}
        title="Delete Walk-in Application"
        message="Are you sure you want to delete this walk-in application?"
        loading={loading}
        onClose={() =>
          setDeleteItem(null)
        }
        onConfirm={handleDelete}
      />
    </>
  );
}