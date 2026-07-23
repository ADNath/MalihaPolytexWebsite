import DataTable from "@/components/ui/DataTable";

import type { JobApplication } from "@/types/jobApplication";

import JobApplicationsPagination from "./JobApplicationsPagination";
import JobApplicationsTableBody from "./JobApplicationsTableBody";

interface Props {
  items: JobApplication[];

  loading?: boolean;

  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;

  selectedIds: number[];

  onToggleSelect: (id: number) => void;
  onToggleSelectAll: () => void;

  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;

  onView: (item: JobApplication) => void;
  onDelete: (item: JobApplication) => void;
  onDownload: (item: JobApplication) => void;
}

export default function JobApplicationsTable({
  items,
  loading = false,
  page,
  pageSize,
  totalCount,
  totalPages,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  onPageChange,
  onPageSizeChange,
  onView,
  onDelete,
  onDownload,
}: Props) {
  const allSelected =
    items.length > 0 &&
    items.every((item) =>
      selectedIds.includes(item.jobApplicationId),
    );

  return (
    <>
      <DataTable loading={loading}>
        <thead>
          <tr>
            <th className="w-12">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={onToggleSelectAll}
                className="h-4 w-4 rounded border-gray-300"
              />
            </th>

            <th className="w-16">#</th>

            <th>Applicant</th>

            <th>Job</th>

            <th>Email</th>

            <th>Phone</th>

            <th>Experience</th>

            <th>Applied Date</th>

            <th>Status</th>

            <th className="w-40 text-right">
              Actions
            </th>
          </tr>
        </thead>

        <JobApplicationsTableBody
          items={items}
          page={page}
          pageSize={pageSize}
          selectedIds={selectedIds}
          onToggleSelect={onToggleSelect}
          onView={onView}
          onDelete={onDelete}
          onDownload={onDownload}
        />
      </DataTable>

      <JobApplicationsPagination
        page={page}
        pageSize={pageSize}
        totalCount={totalCount}
        totalPages={totalPages}
        loading={loading}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </>
  );
}