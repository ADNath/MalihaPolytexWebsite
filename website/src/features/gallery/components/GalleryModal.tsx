import { useEffect } from "react";
import { X } from "lucide-react";

import type { GalleryImage } from "../data/galleryImages";

interface Props {
  image: GalleryImage | null;
  onClose: () => void;
}

export default function GalleryModal({
  image,
  onClose,
}: Props) {
  useEffect(() => {
    if (!image) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [image, onClose]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-6 top-6 rounded-full bg-white p-2 shadow-lg transition hover:bg-gray-100"
      >
        <X className="h-6 w-6 text-gray-800" />
      </button>

      <img
        src={image.image}
        alt="Gallery"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] max-w-[90vw] rounded-3xl object-contain shadow-2xl"
      />
    </div>
  );
}