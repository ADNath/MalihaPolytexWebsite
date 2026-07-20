import { useEffect } from "react";
import { useForm } from "react-hook-form";

import type {
  CareerDepartment,
  CareerDepartmentRequest,
} from "@/types/careerDepartment";

import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";

interface Props {
  open: boolean;
  department?: CareerDepartment | null;
  loading?: boolean;
  onClose: () => void;
  onSave: (
    request: CareerDepartmentRequest,
  ) => Promise<void>;
}

const defaultValues: CareerDepartmentRequest = {
  name: "",
  displayOrder: 1,
  isActive: true,
};

export default function CareerDepartmentDialog({
  open,
  department,
  loading = false,
  onClose,
  onSave,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CareerDepartmentRequest>({
    defaultValues,
  });

  useEffect(() => {
    if (!open) return;

    if (department) {
      reset({
        name: department.name,
        displayOrder: department.displayOrder,
        isActive: department.isActive,
      });
    } else {
      reset(defaultValues);
    }
  }, [open, department, reset]);

  return (
    <Modal
      open={open}
      title={
        department
          ? "Edit Department"
          : "Add Department"
      }
      onClose={onClose}
      footer={
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            form="career-department-form"
            loading={loading}
          >
            Save
          </Button>
        </div>
      }
    >
      <form
        id="career-department-form"
        onSubmit={handleSubmit(onSave)}
        className="space-y-6"
      >
        <Input
          label="Department Name"
          error={errors.name?.message}
          {...register("name", {
            required: "Department name is required.",
            maxLength: {
              value: 200,
              message:
                "Department name cannot exceed 200 characters.",
            },
          })}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            type="number"
            label="Display Order"
            error={errors.displayOrder?.message}
            {...register("displayOrder", {
              valueAsNumber: true,
              required:
                "Display order is required.",
              min: {
                value: 1,
                message:
                  "Display order must be at least 1.",
              },
            })}
          />

          <div className="flex h-full items-end pb-2">
            <Checkbox
              label="Active"
              {...register("isActive")}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
}