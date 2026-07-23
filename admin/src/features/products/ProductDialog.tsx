import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import type { Product, ProductRequest } from "@/types/product";

import { uploadImage } from "@/api/heroSlideApi";

import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import FileUpload from "@/components/ui/FileUpload";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import { getImageUrl } from "@/utils/image";

interface Props {
  open: boolean;
  product?: Product | null;
  loading?: boolean;
  onClose: () => void;
  onSave: (request: ProductRequest) => Promise<void>;
}

const categoryOptions = [
  {
    label: "PSF",
    value: "PSF",
  },
  {
    label: "Granule",
    value: "Granule",
  },
  {
    label: "Non Woven Fabric",
    value: "Non Woven Fabric",
  },
  {
    label: "Non Woven Interlining",
    value: "Non Woven Interlining",
  },
];

const denierOptions = [
  { label: "1.2D", value: "1.2D" },
  { label: "1.4D", value: "1.4D" },
  { label: "3D", value: "3D" },
  { label: "6D", value: "6D" },
];

const cuttingLengthOptions = [
  { label: "26 MM", value: "26MM" },
  { label: "28 MM", value: "28MM" },
  { label: "32 MM", value: "32MM" },
  { label: "38 MM", value: "38MM" },
  { label: "51 MM", value: "51MM" },
  { label: "64 MM", value: "64MM" },
  { label: "89 MM", value: "89MM" },
  { label: "102 MM", value: "102MM" },
];

const psfColorOptions = [
  { label: "White", value: "White" },
  { label: "Yellow", value: "Yellow" },
  { label: "Green", value: "Green" },
  { label: "Blue", value: "Blue" },
  { label: "Deep Blue", value: "Deep Blue" },
  { label: "Red", value: "Red" },
  { label: "Black", value: "Black" },
  { label: "Lime", value: "Lime" },
];

const granuleColorOptions = [
  { label: "Milk White", value: "Milk White" },
  { label: "White", value: "White" },
  { label: "Green", value: "Green" },
  { label: "Deep Green", value: "Deep Green" },
  { label: "Mix", value: "Mix" },
  { label: "Black", value: "Black" },
];

const defaultValues: ProductRequest = {
  category: "PSF",
  name: "",
  description: "",
  image: "",
  denier: "",
  cuttingLength: "",
  color: "",
  displayOrder: 1,
  isActive: true,
};

export default function ProductDialog({
  open,
  product,
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
  } = useForm<ProductRequest>({
    defaultValues,
  });

  useEffect(() => {
    if (!open) return;

    if (product) {
      reset({
        category: product.category,
        name: product.name,
        description: product.description ?? "",
        image: product.image,
        denier: product.denier ?? "",
        cuttingLength: product.cuttingLength ?? "",
        color: product.color ?? "",
        displayOrder: product.displayOrder,
        isActive: product.isActive,
      });
    } else {
      reset(defaultValues);
    }
  }, [open, product, reset]);

  const image = watch("image");
  const category = watch("category");

  useEffect(() => {
    if (category === "PSF") return;

    setValue("denier", "");
    setValue("cuttingLength", "");

    if (
      category === "Non Woven Fabric" ||
      category === "Non Woven Interlining"
    ) {
      setValue("color", "");
    }
  }, [category, setValue]);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const response = await uploadImage(file, "products");

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
      title={product ? "Edit Product" : "Add Product"}
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
            form="product-form"
            loading={loading}
            disabled={uploading}
          >
            Save
          </Button>
        </div>
      }
    >
      <form
        id="product-form"
        onSubmit={handleSubmit(onSave)}
        className="space-y-6"
      >
        <FileUpload
          label="Product Image"
          preview={getImageUrl(image)}
          uploading={uploading}
          recommendedSize="1200 × 800 px"
          onChange={handleImageUpload}
        />

        <Select
          label="Category"
          options={categoryOptions}
          {...register("category", {
            required: "Category is required.",
          })}
          error={errors.category?.message}
        />

        <Input
          label="Product Name"
          error={errors.name?.message}
          {...register("name", {
            required: "Product name is required.",
          })}
        />

        <Textarea label="Description" rows={5} {...register("description")} />

        {category === "PSF" && (
          <>
            <Select
              label="Denier"
              options={denierOptions}
              {...register("denier")}
            />

            <Select
              label="Cutting Length"
              options={cuttingLengthOptions}
              {...register("cuttingLength")}
            />

            <Select
              label="Color"
              options={psfColorOptions}
              {...register("color")}
            />
          </>
        )}

        {category === "Granule" && (
          <Select
            label="Color"
            options={granuleColorOptions}
            {...register("color")}
          />
        )}

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
      </form>
    </Modal>
  );
}
