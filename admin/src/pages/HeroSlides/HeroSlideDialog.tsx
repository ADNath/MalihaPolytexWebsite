import { useEffect, useState } from "react";

import type { HeroSlide } from "@/api/heroSlideApi";

interface Props {
  open: boolean;
  slide?: HeroSlide | null;
  onClose: () => void;
  onSave: (slide: HeroSlide) => Promise<void>;
}

const emptySlide: HeroSlide = {
  heroSlideId: 0,
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
  slide,
  onClose,
  onSave,
}: Props) {
  const [form, setForm] = useState<HeroSlide>(emptySlide);

  useEffect(() => {
    setForm(slide ?? emptySlide);
  }, [slide]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSave(form);
  }

  function update<K extends keyof HeroSlide>(
    key: K,
    value: HeroSlide[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl rounded-lg bg-white p-6"
      >
        <h2 className="mb-6 text-xl font-bold">
          {form.heroSlideId === 0 ? "Add Hero Slide" : "Edit Hero Slide"}
        </h2>

        <div className="space-y-4">
          <input
            className="w-full rounded border p-3"
            placeholder="Title"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
          />

          <input
            className="w-full rounded border p-3"
            placeholder="Subtitle"
            value={form.subtitle ?? ""}
            onChange={(e) => update("subtitle", e.target.value)}
          />

          <textarea
            className="w-full rounded border p-3"
            rows={4}
            placeholder="Description"
            value={form.description ?? ""}
            onChange={(e) => update("description", e.target.value)}
          />

          <input
            className="w-full rounded border p-3"
            placeholder="Button Text"
            value={form.buttonText ?? ""}
            onChange={(e) => update("buttonText", e.target.value)}
          />

          <input
            className="w-full rounded border p-3"
            placeholder="Button Url"
            value={form.buttonUrl ?? ""}
            onChange={(e) => update("buttonUrl", e.target.value)}
          />

          <input
            className="w-full rounded border p-3"
            placeholder="Desktop Image"
            value={form.desktopImage}
            onChange={(e) => update("desktopImage", e.target.value)}
          />

          <input
            className="w-full rounded border p-3"
            placeholder="Mobile Image"
            value={form.mobileImage ?? ""}
            onChange={(e) => update("mobileImage", e.target.value)}
          />

          <input
            className="w-full rounded border p-3"
            type="number"
            placeholder="Display Order"
            value={form.displayOrder}
            onChange={(e) =>
              update("displayOrder", Number(e.target.value))
            }
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => update("isActive", e.target.checked)}
            />
            Active
          </label>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded border px-4 py-2"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}