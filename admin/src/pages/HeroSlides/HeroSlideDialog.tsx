import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  type HeroSlideRequest,
  type HeroSlideResponse,
  toHeroSlideRequest,
  uploadImage,
} from "@/api/heroSlideApi";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import FileUpload from "@/components/ui/FileUpload";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Textarea from "@/components/ui/Textarea";
import { getImageUrl } from "@/utils/image";

interface Props {
  open: boolean;
  heroSlide?: HeroSlideResponse | null;
  loading?: boolean;
  onClose: () => void;
  onSave: (request: HeroSlideRequest) => Promise<void>;
}

const defaultValues: HeroSlideRequest = {
  title: "",
  subtitle: "",
  description: "",
  buttonText: "",
  buttonUrl: "",
  desktopImage: "",
  mobileImage: "",
  displayOrder: 1,
  isActive: true,
};

export default function HeroSlideDialog({
  open,
  heroSlide,
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
  } = useForm<HeroSlideRequest>({
    defaultValues,
  });

  useEffect(() => {
    if (!open) return;

    if (heroSlide) {
      reset(toHeroSlideRequest(heroSlide));
    } else {
      reset(defaultValues);
    }
  }, [open, heroSlide, reset]);

  const desktopImage = watch("desktopImage");

  async function handleDesktopUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const response = await uploadImage(file, "heroslides");

      if (response.success) {
        setValue("desktopImage", response.data, {
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
      title={heroSlide ? "Edit Hero Slide" : "Add Hero Slide"}
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
            form="hero-slide-form"
            loading={loading}
            disabled={uploading}
          >
            Save
          </Button>
        </div>
      }
    >
      <form
        id="hero-slide-form"
        onSubmit={handleSubmit(onSave)}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <FileUpload
              label="Desktop Image"
              preview={getImageUrl(desktopImage)}
              uploading={uploading}
              recommendedSize="1920 × 800 px"
              onChange={handleDesktopUpload}
            />
          </div>

          <div className="space-y-4">
            <Input
              label="Title"
              error={errors.title?.message}
              {...register("title", {
                required: "Title is required.",
              })}
            />

            <Input label="Subtitle" {...register("subtitle")} />

            <Textarea
              label="Description"
              rows={5}
              {...register("description")}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="Button Text" {...register("buttonText")} />

              <Input
                label="Button URL"
                {...register("buttonUrl", {
                  pattern: {
                    value: /^(https?:\/\/|\/|#|$).*/i,
                    message: "Please enter a valid URL.",
                  },
                })}
                error={errors.buttonUrl?.message}
              />
            </div>

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
                <Checkbox label="Active" {...register("isActive")} />
              </div>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
}
