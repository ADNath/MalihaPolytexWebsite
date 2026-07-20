import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import type {
  JobApplication,
  JobApplicationStatusUpdateRequest,
} from "@/types/jobApplication";

import Card from "@/components/ui/Card";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import EmptyState from "@/components/ui/EmptyState";


import {
  deleteJobApplication,
  getJobApplications,
  updateJobApplicationStatus,
} from "@/services/jobApplicationService";

import JobApplicationDetailsDialog from "./JobApplicationDetailsDialog";
import JobApplicationsTable from "./JobApplicationsTable";
import {
  careerApplicationStatuses,
} from "@/types/jobApplication";

export default function JobApplicationsPage() {
  const [items, setItems] = useState<JobApplication[]>([]);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [selectedItem, setSelectedItem] =
    useState<JobApplication | null>(null);

  const [deleteItem, setDeleteItem] =
    useState<JobApplication | null>(null);
    const [statuses] = useState(careerApplicationStatuses);

  useEffect(() => {
    void initialize();
  }, []);

  async function initialize() {
    await Promise.all([
      loadApplications(),
    ]);
  }

  async function loadApplications() {
    try {
      setLoading(true);

      const response =
        await getJobApplications();

      setItems(response);
    } catch {
      toast.error(
        "Failed to load job applications.",
      );
    } finally {
      setLoading(false);
    }
  }

  

  function handleView(
    item: JobApplication,
  ) {
    setSelectedItem(item);
    setDialogOpen(true);
  }

  async function handleSave(
    request: JobApplicationStatusUpdateRequest,
  ) {
    if (!selectedItem) return;

    try {
      setSaving(true);

      await updateJobApplicationStatus(
        selectedItem.jobApplicationId,
        request,
      );

      toast.success(
        "Application updated successfully.",
      );

      setDialogOpen(false);
      setSelectedItem(null);

      await loadApplications();
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
      await deleteJobApplication(
        deleteItem.jobApplicationId,
      );

      toast.success(
        "Application deleted successfully.",
      );

      if (
        selectedItem?.jobApplicationId ===
        deleteItem.jobApplicationId
      ) {
        setDialogOpen(false);
        setSelectedItem(null);
      }

      setDeleteItem(null);

      await loadApplications();
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
            Job Applications
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Review and manage submitted job
            applications.
          </p>
        </div>

        {items.length === 0 &&
        !loading ? (
          <EmptyState
            title="No Job Applications"
          />
        ) : (
          <JobApplicationsTable
            items={items}
            loading={loading}
            onView={handleView}
            onDelete={setDeleteItem}
          />
        )}
      </Card>

      <JobApplicationDetailsDialog
        open={dialogOpen}
        application={selectedItem}
        statuses={statuses}
        loading={saving}
        onClose={() => {
          setDialogOpen(false);
          setSelectedItem(null);
        }}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={!!deleteItem}
        title="Delete Job Application"
        message="Are you sure you want to delete this application?"
        loading={loading}
        onClose={() =>
          setDeleteItem(null)
        }
        onConfirm={handleDelete}
      />
    </>
  );
}