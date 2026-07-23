import type { JobApplication } from "@/types/jobApplication";

import ActionButtons from "@/components/ui/ActionButtons";
import Badge from "@/components/ui/Badge";

interface Props {
  items: JobApplication[];

  page: number;
  pageSize: number;

  selectedIds: number[];

  onToggleSelect: (id: number) => void;
  onView: (item: JobApplication) => void;
  onDelete: (item: JobApplication) => void;
  onDownload: (item: JobApplication) => void;
}

function getStatusVariant(
  status: string,
): "success" | "warning" | "danger" | "info" {
  switch (status.toLowerCase()) {
    case "pending":
      return "warning";

    case "under review":
      return "info";

    case "shortlisted":
      return "info";

    case "interview scheduled":
      return "warning";

    case "hired":
      return "success";

    case "rejected":
      return "danger";

    case "withdrawn":
      return "danger";

    default:
      return "info";
  }
}

export default function JobApplicationsTableBody({
  items,
  page,
  pageSize,
  selectedIds,
  onToggleSelect,
  onView,
  onDelete,
  onDownload,
}: Props) {
  return (
    <tbody>
      {items.map((item, index) => {
        const checked = selectedIds.includes(
          item.jobApplicationId,
        );

        return (
          <tr key={item.jobApplicationId}>
            <td>
              <input
                type="checkbox"
                checked={checked}
                onChange={() =>
                  onToggleSelect(
                    item.jobApplicationId,
                  )
                }
                className="h-4 w-4 rounded border-gray-300"
              />
            </td>

            <td>
              {(page - 1) * pageSize + index + 1}
            </td>

            <td className="font-medium">
              {item.fullName}
            </td>

            <td>{item.jobTitle}</td>

            <td>{item.email}</td>

            <td>{item.phone}</td>

            <td>
              {item.yearsOfExperience != null
                ? `${item.yearsOfExperience} Year${
                    item.yearsOfExperience > 1
                      ? "s"
                      : ""
                  }`
                : "-"}
            </td>

            <td>
              {new Date(
                item.appliedDate,
              ).toLocaleDateString()}
            </td>

            <td>
              <Badge
                variant={getStatusVariant(
                  item.statusName,
                )}
              >
                {item.statusName}
              </Badge>
            </td>

            <td>
              <div className="flex justify-end">
                <ActionButtons
                  onView={() => onView(item)}
                  onDelete={() => onDelete(item)}
                  onDownload={() =>
                    onDownload(item)
                  }
                />
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}