import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  uploadImage,
} from "@/api/heroSlideApi";

import { API_BASE_URL } from "@/config/app";

import type {
  CompanyProfile,
  CompanyProfileRequest,
} from "@/types/companyProfile";

import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import FileUpload from "@/components/ui/FileUpload";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Textarea from "@/components/ui/Textarea";

interface Props {
  open: boolean;
  companyProfile?: CompanyProfile | null;
  loading?: boolean;
  onClose: () => void;
  onSave: (
    request: CompanyProfileRequest,
  ) => Promise<void>;
}

const defaultValues: CompanyProfileRequest = {
  title: "",
  description: "",
  pdfUrl: "",
  isActive: true,
};

export default function CompanyProfileDialog({
  open,
  companyProfile,
  loading = false,
  onClose,
  onSave,
}: Props) {
  const [uploading, setUploading] =
    useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CompanyProfileRequest>({
    defaultValues,
  });

  useEffect(() => {
    if (!open) return;

    if (companyProfile) {
      reset({
        title: companyProfile.title,
        description:
          companyProfile.description ?? "",
        pdfUrl: companyProfile.pdfUrl,
        isActive: companyProfile.isActive,
      });
    } else {
      reset(defaultValues);
    }
  }, [open, companyProfile, reset]);

  const pdfUrl = watch("pdfUrl");

  async function handlePdfUpload(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const response = await uploadImage(
        file,
        "company-profiles",
      );

      if (response.success) {
        setValue("pdfUrl", response.data, {
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
        companyProfile
          ? "Edit Company Profile"
          : "Add Company Profile"
      }
      onClose={onClose}
      footer={
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={
              loading || uploading
            }
          >
            Cancel
          </Button>

          <Button
            type="submit"
            form="company-profile-form"
            loading={loading}
            disabled={uploading}
          >
            Save
          </Button>
        </div>
      }
    >
      <form
        id="company-profile-form"
        onSubmit={handleSubmit(onSave)}
        className="space-y-6"
      >
        <FileUpload
          label="Company Profile PDF"
          preview={
            pdfUrl
              ? `${API_BASE_URL}${pdfUrl}`
              : undefined
          }
          fileName={
            pdfUrl
              ? pdfUrl.split("/").pop()
              : undefined
          }
          previewType="file"
          uploading={uploading}
          accept=".pdf"
          helperText="Supports PDF • Max 20 MB"
          uploadText="Upload PDF"
          uploadingText="Uploading PDF..."
          changeText="Change PDF"
          onChange={handlePdfUpload}
        />

        <Input
          label="Title"
          error={errors.title?.message}
          {...register("title", {
            required:
              "Title is required.",
          })}
        />

        <Textarea
          label="Description"
          rows={5}
          {...register("description")}
        />

        <div className="flex items-end pb-2">
          <Checkbox
            label="Active"
            {...register("isActive")}
          />
        </div>
      </form>
    </Modal>
  );
}