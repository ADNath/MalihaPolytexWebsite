import { useEffect } from "react";
import { useForm } from "react-hook-form";

import type {
  CompanyVideo,
  CompanyVideoRequest,
} from "@/types/companyVideo";

import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Textarea from "@/components/ui/Textarea";

interface Props {
  open: boolean;
  companyVideo?: CompanyVideo | null;
  loading?: boolean;
  onClose: () => void;
  onSave: (request: CompanyVideoRequest) => Promise<void>;
}

const defaultValues: CompanyVideoRequest = {
  title: "",
  description: "",
  videoUrl: "",
  displayOrder: 1,
  isActive: true,
};

export default function CompanyVideoDialog({
  open,
  companyVideo,
  loading = false,
  onClose,
  onSave,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CompanyVideoRequest>({
    defaultValues,
  });

  useEffect(() => {
    if (!open) return;

    if (companyVideo) {
      reset({
        title: companyVideo.title,
        description: companyVideo.description ?? "",
        videoUrl: companyVideo.videoUrl,
        displayOrder: companyVideo.displayOrder,
        isActive: companyVideo.isActive,
      });
    } else {
      reset(defaultValues);
    }
  }, [open, companyVideo, reset]);

  return (
    <Modal
      open={open}
      title={companyVideo ? "Edit Company Video" : "Add Company Video"}
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
            form="company-video-form"
            loading={loading}
          >
            Save
          </Button>
        </div>
      }
    >
      <form
        id="company-video-form"
        onSubmit={handleSubmit(onSave)}
        className="space-y-6"
      >
        <Input
          label="Title"
          error={errors.title?.message}
          {...register("title", {
            required: "Title is required.",
          })}
        />

        <Textarea
          label="Description"
          rows={6}
          {...register("description")}
        />

        <Input
          label="Video URL"
          placeholder="https://fast.wistia.net/embed/iframe/..."
          error={errors.videoUrl?.message}
          {...register("videoUrl", {
            required: "Video URL is required.",
            pattern: {
              value: /^https?:\/\/.+/i,
              message: "Please enter a valid URL.",
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
              required: "Display order is required.",
              min: {
                value: 1,
                message: "Display order must be at least 1.",
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