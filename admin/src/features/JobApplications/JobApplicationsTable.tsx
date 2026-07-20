

import type { JobApplication } from "@/types/jobApplication";

import ActionButtons from "@/components/ui/ActionButtons";
import Badge from "@/components/ui/Badge";
import DataTable from "@/components/ui/DataTable";

interface Props {
  items: JobApplication[];
  loading?: boolean;
  onView: (item: JobApplication) => void;
  onDelete: (item: JobApplication) => void;
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

export default function JobApplicationsTable({
  items,
  loading = false,
  onView,
  onDelete,
}: Props) {
  return (
    <DataTable loading={loading}>
      <thead>
        <tr>
          <th className="w-16">#</th>
          <th>Applicant</th>
          <th>Job Title</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Applied Date</th>
          <th>Status</th>
          <th className="w-28 text-right">Actions</th>
        </tr>
      </thead>

      <tbody>
        {items.map((item, index) => (
          <tr key={item.jobApplicationId}>
            <td>{index + 1}</td>

            <td className="font-medium">{item.fullName}</td>

            <td>{item.jobTitle}</td>

            <td>{item.email}</td>

            <td>{item.phone}</td>

            <td>{new Date(item.appliedDate).toLocaleDateString()}</td>

            <td>
              <Badge variant={getStatusVariant(item.statusName)}>
                {item.statusName}
              </Badge>
            </td>

            <td>
              <div className="flex justify-end">
                <ActionButtons
                  onView={() => onView(item)}
                  onDelete={() => onDelete(item)}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </DataTable>
  );
}
