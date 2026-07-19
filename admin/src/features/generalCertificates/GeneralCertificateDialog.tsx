import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { API_BASE_URL } from "@/config/app";

import type {
  CreateGeneralCertificateRequest,
  GeneralCertificateResponse,
} from "@/types/generalCertificate";

import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import FileUpload from "@/components/ui/FileUpload";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Textarea from "@/components/ui/Textarea";
import { uploadImage } from "@/api/heroSlideApi";

interface Props {
  open: boolean;
  generalCertificate?: GeneralCertificateResponse | null;
  loading?: boolean;
  onClose: () => void;
  onSave: (request: CreateGeneralCertificateRequest) => Promise<void>;
}

const defaultValues: CreateGeneralCertificateRequest = {
  title: "",
  description: "",
  image: "",
  displayOrder: 0,
  isActive: true,
};

export default function GeneralCertificateDialog({
  open,
  generalCertificate,
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
  } = useForm<CreateGeneralCertificateRequest>({
    defaultValues,
  });

  useEffect(() => {
    if (!open) return;

    if (generalCertificate) {
      reset({
        title: generalCertificate.title,
        description: generalCertificate.description ?? "",
        image: generalCertificate.image,
        displayOrder: generalCertificate.displayOrder,
        isActive: generalCertificate.isActive,
      });
    } else {
      reset(defaultValues);
    }
  }, [open, generalCertificate, reset]);

  const image = watch("image");

  const imagePreview = image
    ? `${API_BASE_URL}${image}`
    : generalCertificate?.image
      ? `${API_BASE_URL}${generalCertificate.image}`
      : undefined;

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const response = await uploadImage(file, "general-certificates");

      if (response.success) {
        setValue("image", response.data, {
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
        generalCertificate
          ? "Edit General Certificate"
          : "Add General Certificate"
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
            form="general-certificate-form"
            loading={loading}
            disabled={uploading}
          >
            Save
          </Button>
        </div>
      }
    >
      <form
        id="general-certificate-form"
        onSubmit={handleSubmit(onSave)}
        className="space-y-6"
      >
        <FileUpload
          label="Certificate Image"
          preview={imagePreview}
          previewType="image"
          uploading={uploading}
          accept="image/*"
          helperText="Supports JPG, PNG, WEBP • Max 5 MB"
          uploadText="Upload Image"
          uploadingText="Uploading Image..."
          changeText="Change Image"
          onChange={handleImageUpload}
        />

        <Input
          label="Title"
          error={errors.title?.message}
          {...register("title", {
            required: "Title is required.",
          })}
        />

        <Textarea label="Description" rows={5} {...register("description")} />

        <Input
          label="Display Order"
          type="number"
          error={errors.displayOrder?.message}
          {...register("displayOrder", {
            valueAsNumber: true,
            required: "Display order is required.",
          })}
        />

        <div className="flex items-end pb-2">
          <Checkbox label="Active" {...register("isActive")} />
        </div>
      </form>
    </Modal>
  );
}
