import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import Card from "@/components/ui/Card";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import EmptyState from "@/components/ui/EmptyState";

import JobApplicationFilters from "@/features/JobApplications/JobApplicationFilters";
import JobApplicationsTable from "@/features/JobApplications/JobApplicationsTable";
import JobApplicationDetailsDialog from "@/features/JobApplications/JobApplicationDetailsDialog";

import {
  searchJobApplications,
  getJobs,
  downloadResumes,
  updateJobApplicationStatus,
  deleteJobApplication,
} from "@/services/jobApplicationService";

import { careerApplicationStatuses } from "@/types/jobApplication";

import type {
  JobApplication,
  JobApplicationSearchRequest,
  JobApplicationStatusUpdateRequest,
} from "@/types/jobApplication";

import { getImageUrl } from "@/utils/image";

const DEFAULT_PAGE_SIZE = 10;

export default function JobApplicationsPage() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [items, setItems] = useState<JobApplication[]>([]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const [totalCount, setTotalCount] = useState(0);

  const [totalPages, setTotalPages] = useState(0);

  const [search, setSearch] = useState("");

  const [jobId, setJobId] = useState("");

  const [statusId, setStatusId] = useState("");

  const [maxExperience, setMaxExperience] = useState("");

  const [jobOptions, setJobOptions] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const [selectedItem, setSelectedItem] = useState<JobApplication | null>(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [deleteItem, setDeleteItem] = useState<JobApplication | null>(null);

  const experienceOptions = [
    { label: "Any", value: null },
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "5", value: "5" },
    { label: "10", value: "10" },
    { label: "15+", value: "15" },
  ];

  const request = useMemo<JobApplicationSearchRequest>(
    () => ({
      page,
      pageSize,
      search: search.trim() || undefined,

      jobId: jobId ? Number(jobId) : undefined,

      statusId: statusId ? Number(statusId) : undefined,

      maxExperience: maxExperience !== "" ? Number(maxExperience) : undefined,
    }),
    [page, pageSize, search, jobId, statusId, maxExperience],
  );

  const loadJobs = useCallback(async () => {
    try {
      const jobs = await getJobs();


      setJobOptions([
        {
          label: "All Jobs",
          value: "",
        },
        ...jobs.map((job) => ({
          label: job,
          value: job,
        })),
      ]);
    } catch {
      toast.error("Failed to load jobs.");
    }
  }, []);

  const loadApplications = useCallback(async () => {
    try {
      setLoading(true);

      const result = await searchJobApplications(request);

      setItems(result.items);

      setPage(result.page);

      setPageSize(result.pageSize);

      setTotalCount(result.totalCount);

      setTotalPages(result.totalPages);

      setSelectedIds((previous) =>
        previous.filter((id) =>
          result.items.some((item) => item.jobApplicationId === id),
        ),
      );
    } catch {
      toast.error("Failed to load job applications.");
    } finally {
      setLoading(false);
    }
  }, [request]);

  useEffect(() => {
    void loadJobs();
  }, [loadJobs]);

  useEffect(() => {
    void loadApplications();
  }, [loadApplications]);

  function handleRefresh() {
    void loadApplications();
  }

  function handleResetFilters() {
    setSearch("");
    setJobId("");
    setStatusId("");
    setMaxExperience("");
    setPage(1);
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  function handleJobChange(value: string) {
    setJobId(value);
    setPage(1);
  }

  function handleStatusChange(value: string) {
    setStatusId(value);
    setPage(1);
  }

  function handleMaxExperienceChange(value: string) {
    setMaxExperience(value);
    setPage(1);
  }

  function handleView(application: JobApplication) {
    setSelectedItem(application);
    setDialogOpen(true);
  }

  async function handleDownload(application: JobApplication) {
    if (!application.resumeFile) return;

    const url = getImageUrl(application.resumeFile);

    const response = await fetch(url);

    const blob = await response.blob();

    const extension = application.resumeFile.split(".").pop() ?? "pdf";

    const fileName = `${application.fullName.replace(
      /\s+/g,
      "_",
    )}_Resume.${extension}`;

    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = blobUrl;
    link.download = fileName;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(blobUrl);
  }
  function handleCloseDialog() {
    setDialogOpen(false);
    setSelectedItem(null);
  }

  function handleDelete(application: JobApplication) {
    setDeleteItem(application);
  }

  async function confirmDelete() {
    if (!deleteItem) {
      return;
    }

    try {
      setSaving(true);

      await deleteJobApplication(deleteItem.jobApplicationId);

      toast.success("Application deleted successfully.");

      setDeleteItem(null);

      if (items.length === 1 && page > 1) {
        setPage((previous) => previous - 1);
      } else {
        await loadApplications();
      }
    } catch {
      toast.error("Failed to delete application.");
    } finally {
      setSaving(false);
    }
  }

  function handleToggleSelect(id: number) {
    setSelectedIds((previous) =>
      previous.includes(id)
        ? previous.filter((x) => x !== id)
        : [...previous, id],
    );
  }

  function handleToggleSelectAll() {
    const ids = items.map((x) => x.jobApplicationId);

    const allSelected = ids.every((id) => selectedIds.includes(id));

    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(ids);
    }
  }

  const handleStatusUpdate = async (
    request: JobApplicationStatusUpdateRequest,
  ): Promise<void> => {
    if (!selectedItem) {
      return;
    }

    try {
      setSaving(true);

      await updateJobApplicationStatus(selectedItem.jobApplicationId, request);

      toast.success("Application status updated.");

      setDialogOpen(false);

      await loadApplications();
    } catch {
      toast.error("Failed to update status.");
    } finally {
      setSaving(false);
    }
  };

  async function handleDownloadSelected() {
    if (selectedIds.length === 0) {
      toast.error("Please select at least one application.");
      return;
    }

    try {
      setLoading(true);

      const blob = await downloadResumes(selectedIds);

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = url;
      a.download = `JobApplicationResumes_${Date.now()}.zip`;

      document.body.appendChild(a);

      a.click();

      a.remove();

      window.URL.revokeObjectURL(url);

      toast.success("Download started.");
    } catch {
      toast.error("Failed to download resumes.");
    } finally {
      setLoading(false);
    }
  }

  const hasData = items?.length > 0;

  return (
    <>
      <div className="space-y-6">
        <Card>
          <JobApplicationFilters
            search={search}
            jobId={jobId}
            statusId={statusId}
            maxExperience={maxExperience}
            jobOptions={jobOptions}
            experienceOptions={experienceOptions}
            statuses={careerApplicationStatuses}
            loading={loading}
            selectedCount={selectedIds.length}
            onSearchChange={handleSearchChange}
            onJobChange={handleJobChange}
            onStatusChange={handleStatusChange}
            onMaxExperienceChange={handleMaxExperienceChange}
            onRefresh={handleRefresh}
            onReset={handleResetFilters}
            onDownloadSelected={handleDownloadSelected}
          />
        </Card>

        <Card className="overflow-hidden">
          {hasData || loading ? (
            <JobApplicationsTable
              items={items}
              loading={loading}
              page={page}
              pageSize={pageSize}
              totalCount={totalCount}
              totalPages={totalPages}
              selectedIds={selectedIds}
              onToggleSelect={handleToggleSelect}
              onToggleSelectAll={handleToggleSelectAll}
              onPageChange={setPage}
              onPageSizeChange={(size) => {
                setPageSize(size);
                setPage(1);
              }}
              onView={handleView}
              onDelete={handleDelete}
              onDownload={handleDownload}
            />
          ) : (
            <EmptyState title="No Applications Found" />
          )}
        </Card>
      </div>

      <JobApplicationDetailsDialog
        open={dialogOpen}
        application={selectedItem}
        statuses={careerApplicationStatuses}
        loading={saving}
        onClose={handleCloseDialog}
        onSave={handleStatusUpdate}
      />

      <ConfirmDialog
        open={deleteItem !== null}
        title="Delete Application"
        message={`Are you sure you want to delete the application from "${deleteItem?.fullName ?? ""}"? This action cannot be undone.`}
        loading={saving}
        onClose={() => setDeleteItem(null)}
        onConfirm={confirmDelete}
      />
    </>
  );
}
