import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  type ManagementMemberRequest,
  type ManagementMemberResponse,
  toManagementMemberRequest,
  uploadImage,
} from "@/api/managementMemberApi";

import { API_BASE_URL } from "@/config/app";

import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import FileUpload from "@/components/ui/FileUpload";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Textarea from "@/components/ui/Textarea";

interface Props {
  open: boolean;
  managementMember?: ManagementMemberResponse | null;
  loading?: boolean;
  onClose: () => void;
  onSave: (request: ManagementMemberRequest) => Promise<void>;
}

const defaultValues: ManagementMemberRequest = {
  name: "",
  designation: "",
  imageUrl: "",
  message: "",
  displayOrder: 1,
  isActive: true,
};

export default function ManagementMemberDialog({
  open,
  managementMember,
  loading = false,
  onClose,
  onSave,
}: Props) {
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ManagementMemberRequest>({
    defaultValues,
  });

  useEffect(() => {
    if (!open) return;

    if (managementMember) {
      reset(toManagementMemberRequest(managementMember));
    } else {
      reset(defaultValues);
    }
  }, [open, managementMember, reset]);

  const imageUrl = watch("imageUrl");

  async function handleImageUpload(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const response = await uploadImage(
        file,
        "managementmembers",
      );

      if (response.success) {
        setValue("imageUrl", response.data, {
          shouldValidate: true,
        });
      }
    } finally {
      setUploading(false);
    }
  }

  return (
    <Modal
      open={open}
      title={
        managementMember
          ? "Edit Management Member"
          : "Add Management Member"
      }
      onClose={onClose}
      footer={
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={loading || uploading}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            form="management-member-form"
            loading={loading}
            disabled={uploading}
          >
            Save
          </Button>
        </div>
      }
    >
      <form
        id="management-member-form"
        onSubmit={handleSubmit(onSave)}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <FileUpload
              label="Image"
              preview={
                imageUrl
                  ? `${API_BASE_URL}${imageUrl}`
                  : undefined
              }
              uploading={uploading}
              recommendedSize="600 × 800 px"
              onChange={handleImageUpload}
            />
          </div>

          <div className="space-y-4">
            <Input
              label="Name"
              error={errors.name?.message}
              {...register("name", {
                required: "Name is required.",
              })}
            />

            <Input
              label="Designation"
              error={errors.designation?.message}
              {...register("designation", {
                required: "Designation is required.",
              })}
            />

            <Textarea
              label="Message"
              rows={8}
              error={errors.message?.message}
              {...register("message", {
                required: "Message is required.",
              })}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                type="number"
                label="Display Order"
                error={errors.displayOrder?.message}
                {...register("displayOrder", {
                  valueAsNumber: true,
                  required: "Display order is required.",
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
          </div>
        </div>
      </form>
    </Modal>
  );
}