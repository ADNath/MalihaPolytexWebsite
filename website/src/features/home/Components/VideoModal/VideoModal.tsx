import { useEffect } from "react";
import { X } from "lucide-react";

interface VideoModalProps {
  open: boolean;
  onClose: () => void;
  videoUrl: string;
}

export default function VideoModal({
  open,
  onClose,
  videoUrl,
}: VideoModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;
  const iframeUrl = `${videoUrl}${videoUrl.includes("?") ? "&" : "?"}autoplay=1`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute -top-12 right-0 rounded-full bg-white p-2 shadow-lg transition hover:rotate-90"
        >
          <X className="h-6 w-6 text-gray-900" />
        </button>

        <div className="aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl">
          <iframe
            src={iframeUrl}
            title="Company Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}