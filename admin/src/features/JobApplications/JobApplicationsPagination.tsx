import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";

interface Props {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  loading?: boolean;

  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const pageSizeOptions = [
  { label: "10", value: "10" },
  { label: "20", value: "20" },
  { label: "50", value: "50" },
  { label: "100", value: "100" },
];

export default function JobApplicationsPagination({
  page,
  pageSize,
  totalCount,
  totalPages,
  loading = false,
  onPageChange,
  onPageSizeChange,
}: Props) {
  const start =
    totalCount === 0
      ? 0
      : (page - 1) * pageSize + 1;

  const end = Math.min(
    page * pageSize,
    totalCount,
  );

  return (
    <div className="mt-6 flex flex-col gap-4 border-t pt-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="text-sm text-gray-600">
        Showing{" "}
        <span className="font-semibold">
          {start}
        </span>{" "}
        to{" "}
        <span className="font-semibold">
          {end}
        </span>{" "}
        of{" "}
        <span className="font-semibold">
          {totalCount}
        </span>{" "}
        applications
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="w-28">
          <Select
            value={String(pageSize)}
            options={pageSizeOptions}
            onChange={(e) =>
              onPageSizeChange(
                Number(e.target.value),
              )
            }
          />
        </div>

        <Button
          type="button"
          variant="outline"
          disabled={loading || page <= 1}
          onClick={() =>
            onPageChange(page - 1)
          }
        >
          Previous
        </Button>

        <div className="min-w-[90px] text-center text-sm font-medium text-gray-700">
          Page {page} of{" "}
          {Math.max(totalPages, 1)}
        </div>

        <Button
          type="button"
          variant="outline"
          disabled={
            loading ||
            page >= totalPages ||
            totalPages === 0
          }
          onClick={() =>
            onPageChange(page + 1)
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
}