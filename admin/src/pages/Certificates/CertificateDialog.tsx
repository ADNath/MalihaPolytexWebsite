import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  type Certificate,
  type CertificateRequest,
} from "@/types/certificate";

import { uploadImage } from "@/api/heroSlideApi";

import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import FileUpload from "@/components/ui/FileUpload";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Textarea from "@/components/ui/Textarea";
import { getImageUrl } from "@/utils/image";

interface Props {
  open: boolean;
  certificate?: Certificate | null;
  loading?: boolean;
  onClose: () => void;
  onSave: (request: CertificateRequest) => Promise<void>;
}

const defaultValues: CertificateRequest = {
  title: "",
  description: "",
  image: "",
  displayOrder: 1,
  isActive: true,
};

export default function CertificateDialog({
  open,
  certificate,
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
  } = useForm<CertificateRequest>({
    defaultValues,
  });

  useEffect(() => {
    if (!open) return;

    if (certificate) {
      reset({
        title: certificate.title,
        description: certificate.description ?? "",
        image: certificate.image,
        displayOrder: certificate.displayOrder,
        isActive: certificate.isActive,
      });
    } else {
      reset(defaultValues);
    }
  }, [open, certificate, reset]);

  const image = watch("image");

  async function handleImageUpload(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const response = await uploadImage(
        file,
        "certificates",
      );

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
        certificate
          ? "Edit Certificate"
          : "Add Certificate"
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
            form="certificate-form"
            loading={loading}
            disabled={uploading}
          >
            Save
          </Button>
        </div>
      }
    >
      <form
        id="certificate-form"
        onSubmit={handleSubmit(onSave)}
        className="space-y-6"
      >
        <FileUpload
          label="Certificate Image"
          preview={getImageUrl(image)}          
          uploading={uploading}
          recommendedSize="1200 × 800 px"
          onChange={handleImageUpload}
        />

        <Input
          label="Title"
          error={errors.title?.message}
          {...register("title", {
            required: "Title is required.",
          })}
        />

        <Textarea
          label="Description"
          rows={5}
          {...register("description")}
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