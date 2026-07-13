import { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  type WhatWeDoItemRequest,
  type WhatWeDoItemResponse,
  toWhatWeDoItemRequest,
} from "@/api/whatWeDoApi";

import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Textarea from "@/components/ui/Textarea";

interface Props {
  open: boolean;
  item?: WhatWeDoItemResponse | null;
  loading?: boolean;
  onClose: () => void;
  onSave: (request: WhatWeDoItemRequest) => Promise<void>;
}

const defaultValues: WhatWeDoItemRequest = {
  title: "",
  description: "",
  icon: "Users",
  displayOrder: 1,
  isActive: true,
};

const icons = [
  "Users",
  "Cog",
  "Trophy",
  "Factory",
  "Award",
  "Recycle",
  "Globe2",
  "Leaf",
  "ShieldCheck",
  "Boxes",
  "Building2",
  "Truck",
  "Package",
  "BadgeCheck",
  "Target",
  "Star",
];

export default function WhatWeDoDialog({
  open,
  item,
  loading = false,
  onClose,
  onSave,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WhatWeDoItemRequest>({
    defaultValues,
  });

  useEffect(() => {
    if (!open) return;

    if (item) {
      reset(toWhatWeDoItemRequest(item));
    } else {
      reset(defaultValues);
    }
  }, [open, item, reset]);

  return (
    <Modal
      open={open}
      title={item ? "Edit What We Do" : "Add What We Do"}
      onClose={onClose}
      footer={
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            type="button"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            form="what-we-do-form"
            loading={loading}
          >
            Save
          </Button>
        </div>
      }
    >
      <form
        id="what-we-do-form"
        onSubmit={handleSubmit(onSave)}
        className="space-y-5"
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
          error={errors.description?.message}
          {...register("description", {
            required: "Description is required.",
          })}
        />

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Icon
          </label>

          <select
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none transition focus:border-blue-500"
            {...register("icon", {
              required: "Icon is required.",
            })}
          >
            {icons.map((icon) => (
              <option
                key={icon}
                value={icon}
              >
                {icon}
              </option>
            ))}
          </select>

          {errors.icon && (
            <p className="mt-1 text-sm text-red-600">
              {errors.icon.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            type="number"
            label="Display Order"
            error={errors.displayOrder?.message}
            {...register("displayOrder", {
              valueAsNumber: true,
              required: "Display Order is required.",
            })}
          />

          <div className="flex items-end">
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