import type { JobOpening } from "@/types/jobOpening";

import ActionButtons from "@/components/ui/ActionButtons";
import Badge from "@/components/ui/Badge";
import DataTable from "@/components/ui/DataTable";

interface Props {
  items: JobOpening[];
  loading?: boolean;
  onEdit: (item: JobOpening) => void;
  onDelete: (item: JobOpening) => void;
}

export default function JobOpeningsTable({
  items,
  loading = false,
  onEdit,
  onDelete,
}: Props) {
  return (
    <DataTable loading={loading}>
      <thead>
        <tr>
          <th className="w-16">#</th>
          <th>Title</th>
          <th>Department</th>
          <th>Location</th>
          <th>Employment Type</th>
          <th>Vacancy</th>
          <th>Deadline</th>
          <th>Order</th>
          <th>Status</th>
          <th className="w-28 text-right">
            Actions
          </th>
        </tr>
      </thead>

      <tbody>
        {items.map((item, index) => (
          <tr key={item.jobId}>
            <td>{index + 1}</td>

            <td className="font-medium">
              {item.title}
            </td>

            <td>
              {item.departmentName ?? "-"}
            </td>

            <td>
              {item.jobLocation || "-"}
            </td>

            <td>
              {item.employmentType || "-"}
            </td>

            <td>
              {item.vacancy ?? "-"}
            </td>

            <td>
              {item.applicationDeadline
                ? new Date(
                    item.applicationDeadline,
                  ).toLocaleDateString()
                : "-"}
            </td>

            <td>{item.displayOrder}</td>

            <td>
              <Badge
                variant={
                  item.isActive
                    ? "success"
                    : "danger"
                }
              >
                {item.isActive
                  ? "Active"
                  : "Inactive"}
              </Badge>
            </td>

            <td>
              <div className="flex justify-end">
                <ActionButtons
                  onEdit={() =>
                    onEdit(item)
                  }
                  onDelete={() =>
                    onDelete(item)
                  }
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </DataTable>
  );
}