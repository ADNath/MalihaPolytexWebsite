import { useMemo, useState } from "react";

import Button from "@/components/ui/Button";

import GalleryCard from "./GalleryCard";
import GalleryModal from "./GalleryModal";

import { galleryImages, type GalleryImage } from "../data/galleryImages";

const INITIAL_COUNT = 12;

export default function GalleryGrid() {
  const [showAll, setShowAll] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const visibleImages = useMemo(() => {
    if (showAll) return galleryImages;

    return galleryImages.slice(0, INITIAL_COUNT);
  }, [showAll]);

  return (
    <>
      <div className="grid grid-cols-2 gap-6 lg:gap-7 md:grid-cols-3 xl:grid-cols-4">
        {visibleImages.map((image) => (
          <GalleryCard
            key={image.id}
            image={image}
            onClick={setSelectedImage}
          />
        ))}
      </div>

      {!showAll && galleryImages.length > INITIAL_COUNT && (
        <div className="mt-12 flex justify-center">
          <Button onClick={() => setShowAll(true)}>Load More Images</Button>
        </div>
      )}

      <GalleryModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </>
  );
}
