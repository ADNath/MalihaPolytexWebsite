import { Search } from "lucide-react";
import type { GalleryImage } from "../data/galleryImages";

interface Props {
  image: GalleryImage;
  onClick: (image: GalleryImage) => void;
}

export default function GalleryCard({
  image,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      onClick={() => onClick(image)}
      className="group relative block w-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image */}
      <div className="aspect-[5/4] overflow-hidden">
        <img
          src={image.image}
          alt="Gallery"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/35">
        <div className="flex h-12 w-12 scale-75 items-center justify-center rounded-full bg-white opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
          <Search className="h-5 w-5 text-gray-800" />
        </div>
      </div>
    </button>
  );
}