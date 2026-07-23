import type { WalkInApplication } from "@/types/walkInApplication";

import DataTable from "@/components/ui/DataTable";

import WalkInApplicationsPagination from "./WalkInApplicationsPagination";
import WalkInApplicationsTableBody from "./WalkInApplicationsTableBody";

interface Props {
  items: WalkInApplication[];

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

  onView: (item: WalkInApplication) => void;
  onDelete: (item: WalkInApplication) => void;
  onDownload: (item: WalkInApplication) => void;
}

export default function WalkInApplicationsTable({
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
  onDownload
}: Props) {
  const allSelected =
    items.length > 0 &&
    items.every((x) =>
      selectedIds.includes(
        x.walkInApplicationId,
      ),
    );

  return (
    <>
      <DataTable
        loading={loading}
      >
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

            <th>Designation</th>

            <th>Email</th>

            <th>Phone</th>

            <th>Experience</th>

            <th>Applied Date</th>

            <th>Status</th>

            <th className="w-28 text-right">
              Actions
            </th>
          </tr>
        </thead>

        <WalkInApplicationsTableBody
          items={items}
          page={page}
          pageSize={pageSize}
          selectedIds={selectedIds}
          onToggleSelect={
            onToggleSelect
          }
          onView={onView}
          onDelete={onDelete}
          onDownload={onDownload}
        />
      </DataTable>

      <WalkInApplicationsPagination
        page={page}
        pageSize={pageSize}
        totalCount={totalCount}
        totalPages={totalPages}
        loading={loading}
        onPageChange={onPageChange}
        onPageSizeChange={
          onPageSizeChange
        }
      />
    </>
  );
}