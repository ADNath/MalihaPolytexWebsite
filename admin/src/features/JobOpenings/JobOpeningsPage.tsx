import { useEffect, useState } from "react";
import toast from "react-hot-toast";


import type {
  JobOpening,
  JobOpeningRequest,
} from "@/types/jobOpening";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import EmptyState from "@/components/ui/EmptyState";
import { createJobOpening, deleteJobOpening, getJobOpenings, updateJobOpening } from "@/services/jobOpeningService";
import JobOpeningDialog from "./JobOpeningDialog";
import JobOpeningsTable from "./JobOpeningsTable";


export default function JobOpeningsPage() {
  const [items, setItems] = useState<JobOpening[]>([]);
  const [loading, setLoading] = useState(false);

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [selectedItem, setSelectedItem] =
    useState<JobOpening | null>(null);

  const [saving, setSaving] =
    useState(false);

  const [deleteItem, setDeleteItem] =
    useState<JobOpening | null>(null);

  useEffect(() => {
    void loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);

      const response =
        await getJobOpenings();

      setItems(response);
    } catch {
      toast.error(
        "Failed to load job openings.",
      );
    } finally {
      setLoading(false);
    }
  }

  function handleAdd() {
    setSelectedItem(null);
    setDialogOpen(true);
  }

  function handleEdit(
    item: JobOpening,
  ) {
    setSelectedItem(item);
    setDialogOpen(true);
  }

  async function handleSave(
    request: JobOpeningRequest,
  ) {
    try {
      setSaving(true);

      if (selectedItem) {
        await updateJobOpening(
          selectedItem.jobId,
          request,
        );

        toast.success(
          "Job opening updated successfully.",
        );
      } else {
        await createJobOpening(
          request,
        );

        toast.success(
          "Job opening created successfully.",
        );
      }

      setDialogOpen(false);
      setSelectedItem(null);

      await loadData();
    } catch {
      toast.error(
        "Failed to save job opening.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteItem) return;

    try {
      await deleteJobOpening(
        deleteItem.jobId,
      );

      toast.success(
        "Job opening deleted successfully.",
      );

      setDeleteItem(null);

      await loadData();
    } catch {
      toast.error(
        "Failed to delete job opening.",
      );
    }
  }

  return (
    <>
      <Card>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              Job Openings
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage career job openings.
            </p>
          </div>

          <Button onClick={handleAdd}>
            Add Job Opening
          </Button>
        </div>

        {items.length === 0 &&
        !loading ? (
          <EmptyState
            title="No Job Openings"
          />
        ) : (
          <JobOpeningsTable
            items={items}
            loading={loading}
            onEdit={handleEdit}
            onDelete={setDeleteItem}
          />
        )}
      </Card>

      <JobOpeningDialog
        open={dialogOpen}
        jobOpening={selectedItem}
        loading={saving}
        onClose={() => {
          setDialogOpen(false);
          setSelectedItem(null);
        }}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={!!deleteItem}
        title="Delete Job Opening"
        message="Are you sure you want to delete this job opening?"
        loading={loading}
        onClose={() =>
          setDeleteItem(null)
        }
        onConfirm={handleDelete}
      />
    </>
  );
}