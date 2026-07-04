import { useState } from "react";
import { Play } from "lucide-react";

import { companyVideoData } from "./companyVideoData";
import VideoModal from "@/features/home/Components/VideoModal";

export default function CompanyVideoPlayer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl shadow-lg">
        <img
          src={companyVideoData.videoThumbnail}
          alt="Maliha Poly Tex Company Video"
          className="aspect-video w-full object-cover"
        />

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Play company video"
          className="
            absolute
            left-1/2
            top-1/2
            flex
            h-20
            w-20
            -translate-x-1/2
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            bg-white
            text-primary
            shadow-2xl
            transition-all
            duration-300
            hover:scale-105
          "
        >
          <Play className="ml-1 h-9 w-9 fill-current" />
        </button>
      </div>

      <VideoModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        videoId={companyVideoData.videoId}
      />
    </>
  );
}
