import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import type { CareerDepartment } from "@/types/careerDepartment";
import type { JobOpening, JobOpeningRequest } from "@/types/jobOpening";


import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import DatePicker from "@/components/ui/DatePicker";
import FormGrid from "@/components/ui/FormGrid";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import RichTextarea from "@/components/ui/RichTextarea";
import Select from "@/components/ui/Select";
import { getCareerDepartments } from "@/services/careerDepartmentService";

interface Props {
  open: boolean;
  jobOpening?: JobOpening | null;
  loading?: boolean;
  onClose: () => void;
  onSave: (request: JobOpeningRequest) => Promise<void>;
}

const defaultValues: JobOpeningRequest = {
  title: "",
  departmentId: 0,
  jobLocation: "",
  employmentType: "",
  vacancy: undefined,
  experience: "",
  education: "",
  salary: "",
  applicationDeadline: "",
  description: "",
  responsibilities: "",
  requirements: "",
  benefits: "",
  displayOrder: 1,
  isActive: true,
};

export default function JobOpeningDialog({
  open,
  jobOpening,
  loading = false,
  onClose,
  onSave,
}: Props) {
  const [departments, setDepartments] = useState<CareerDepartment[]>([]);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<JobOpeningRequest>({
    defaultValues,
  });

  useEffect(() => {
    if (!open) return;

    if (jobOpening) {
      reset({
        title: jobOpening.title,
        departmentId: jobOpening.departmentId,
        jobLocation: jobOpening.jobLocation ?? "",
        employmentType: jobOpening.employmentType ?? "",
        vacancy: jobOpening.vacancy,
        experience: jobOpening.experience ?? "",
        education: jobOpening.education ?? "",
        salary: jobOpening.salary ?? "",
        applicationDeadline: jobOpening.applicationDeadline
          ? jobOpening.applicationDeadline.split("T")[0]
          : "",
        description: jobOpening.description,
        responsibilities: jobOpening.responsibilities ?? "",
        requirements: jobOpening.requirements ?? "",
        benefits: jobOpening.benefits ?? "",
        displayOrder: jobOpening.displayOrder,
        isActive: jobOpening.isActive,
      });
    } else {
      reset(defaultValues);
    }
  }, [open, jobOpening, reset]);

  async function loadDepartments() {
    try {
      const response = await getCareerDepartments();

      setDepartments(response);
    } catch {
      setDepartments([]);
    }
  }

  useEffect(() => {
    if (!open) return;

    void loadDepartments();
  }, [open]);

  return (
    <Modal
      open={open}
      title={jobOpening ? "Edit Job Opening" : "Add Job Opening"}
      onClose={onClose}
      maxWidth="max-w-6xl"
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

          <Button type="submit" form="job-opening-form" loading={loading}>
            Save
          </Button>
        </div>
      }
    >
      <form
        id="job-opening-form"
        onSubmit={handleSubmit(onSave)}
        className="space-y-8"
      >
        <div className="space-y-5">
          <h3 className="border-b pb-2 text-base font-semibold">
            Job Information
          </h3>

          <FormGrid>
            <Input
              label="Title"
              error={errors.title?.message}
              {...register("title", {
                required: "Title is required.",
                maxLength: {
                  value: 300,
                  message: "Title cannot exceed 300 characters.",
                },
              })}
            />

            <Controller
              control={control}
              name="departmentId"
              rules={{
                required: "Department is required.",
                validate: (value) => value > 0 || "Department is required.",
              }}
              render={({ field }) => (
                <Select
                  label="Department"
                  value={field.value ? String(field.value) : ""}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  error={errors.departmentId?.message}
                  options={departments.map((department) => ({
                    label: department.name,
                    value: String(department.departmentId),
                  }))}
                />
              )}
            />

            <Input
              label="Employment Type"
              error={errors.employmentType?.message}
              {...register("employmentType", {
                maxLength: {
                  value: 150,
                  message: "Employment type cannot exceed 150 characters.",
                },
              })}
            />

            <Input
              label="Location"
              error={errors.jobLocation?.message}
              {...register("jobLocation", {
                maxLength: {
                  value: 300,
                  message: "Location cannot exceed 300 characters.",
                },
              })}
            />

            <Input
              type="number"
              label="Vacancy"
              error={errors.vacancy?.message}
              {...register("vacancy", {
                valueAsNumber: true,
                min: {
                  value: 1,
                  message: "Vacancy must be at least 1.",
                },
              })}
            />

            <Input
              label="Experience"
              error={errors.experience?.message}
              {...register("experience", {
                maxLength: {
                  value: 300,
                  message: "Experience cannot exceed 300 characters.",
                },
              })}
            />

            <Input
              label="Education"
              error={errors.education?.message}
              {...register("education", {
                maxLength: {
                  value: 300,
                  message: "Education cannot exceed 300 characters.",
                },
              })}
            />

            <Input
              label="Salary"
              error={errors.salary?.message}
              {...register("salary", {
                maxLength: {
                  value: 300,
                  message: "Salary cannot exceed 300 characters.",
                },
              })}
            />
            <Controller
              control={control}
              name="applicationDeadline"
              render={({ field }) => (
                <DatePicker
                  label="Application Deadline"
                  error={errors.applicationDeadline?.message}
                  value={field.value ?? ""}
                  onChange={field.onChange}
                />
              )}
            />

            <Input
              type="number"
              label="Display Order"
              error={errors.displayOrder?.message}
              {...register("displayOrder", {
                valueAsNumber: true,
                required: "Display order is required.",
                min: {
                  value: 1,
                  message: "Display order must be at least 1.",
                },
              })}
            />

            <div className="flex items-end pb-2">
              <Checkbox label="Active" {...register("isActive")} />
            </div>
          </FormGrid>
        </div>

        <RichTextarea
          label="Description"
          error={errors.description?.message}
          {...register("description", {
            required: "Description is required.",
          })}
        />

        <RichTextarea
          label="Responsibilities"
          error={errors.responsibilities?.message}
          {...register("responsibilities")}
        />

        <RichTextarea
          label="Requirements"
          error={errors.requirements?.message}
          {...register("requirements")}
        />

        <RichTextarea
          label="Benefits"
          error={errors.benefits?.message}
          {...register("benefits")}
        />
      </form>
    </Modal>
  );
}
