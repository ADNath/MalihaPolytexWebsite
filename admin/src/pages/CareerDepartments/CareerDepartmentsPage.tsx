import { useEffect, useMemo, useState } from "react";

import {
  createCareerDepartment,
  deleteCareerDepartment,
  getCareerDepartments,
  updateCareerDepartment,
} from "@/services/careerDepartmentService";

import type {
  CareerDepartment,
  CareerDepartmentRequest,
} from "@/types/careerDepartment";

import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Loading from "@/components/ui/Loading";
import EmptyState from "@/components/ui/EmptyState";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import SearchInput from "@/components/ui/SearchInput";
import StatusBadge from "@/components/ui/StatusBadge";
import ActionButtons from "@/components/ui/ActionButtons";

import CareerDepartmentDialog from "./CareerDepartmentDialog";

export default function CareerDepartmentsPage() {
  const [departments, setDepartments] = useState<
    CareerDepartment[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);

  const [selectedDepartment, setSelectedDepartment] =
    useState<CareerDepartment | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] =
    useState(false);

  const [deleteId, setDeleteId] = useState<number>();

  useEffect(() => {
    void loadDepartments();
  }, []);

  async function loadDepartments() {
    try {
      setLoading(true);

      const data = await getCareerDepartments();

      setDepartments(data);
    } finally {
      setLoading(false);
    }
  }

  const filteredDepartments = useMemo(() => {
    return departments.filter((x) =>
      x.name
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [departments, search]);

  async function handleSave(
    request: CareerDepartmentRequest,
  ) {
    if (selectedDepartment) {
      await updateCareerDepartment(
        selectedDepartment.departmentId,
        request,
      );
    } else {
      await createCareerDepartment(request);
    }

    setDialogOpen(false);

    await loadDepartments();
  }

  async function handleDelete() {
    if (!deleteId) return;

    await deleteCareerDepartment(deleteId);

    setDeleteDialogOpen(false);

    await loadDepartments();
  }

  return (
    <>
      <PageHeader
        title="Career Departments"
        subtitle="Manage career departments."
      >
        <Button
          onClick={() => {
            setSelectedDepartment(null);
            setDialogOpen(true);
          }}
        >
          + Add Department
        </Button>
      </PageHeader>

      <div className="mb-5 flex justify-between">
        <SearchInput
          value={search}
          onChange={setSearch}
        />
      </div>

      <Card className="overflow-hidden">
        {loading ? (
          <Loading />
        ) : filteredDepartments.length === 0 ? (
          <EmptyState />
        ) : (
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Department
                </th>

                <th className="px-5 py-4 text-center text-sm font-semibold">
                  Order
                </th>

                <th className="px-5 py-4 text-center text-sm font-semibold">
                  Status
                </th>

                <th className="px-5 py-4 text-center text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredDepartments.map((item) => (
                <tr
                  key={item.departmentId}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-5 py-4">
                    <div className="font-semibold">
                      {item.name}
                    </div>
                  </td>

                  <td className="text-center">
                    {item.displayOrder}
                  </td>

                  <td className="text-center">
                    <StatusBadge
                      active={item.isActive}
                    />
                  </td>

                  <td>
                    <ActionButtons
                      onEdit={() => {
                        setSelectedDepartment(
                          item,
                        );
                        setDialogOpen(true);
                      }}
                      onDelete={() => {
                        setDeleteId(
                          item.departmentId,
                        );
                        setDeleteDialogOpen(true);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      <CareerDepartmentDialog
        open={dialogOpen}
        department={selectedDepartment}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        title="Delete Department"
        message="Are you sure you want to delete this department?"
        onClose={() =>
          setDeleteDialogOpen(false)
        }
        onConfirm={handleDelete}
      />
    </>
  );
}