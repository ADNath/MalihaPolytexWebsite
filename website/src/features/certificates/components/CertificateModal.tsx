import { useEffect } from "react";
import { X } from "lucide-react";

import type { GeneralCertificates } from "@/types/generalCertificates";

interface Props {
  certificate: GeneralCertificates | null;
  onClose: () => void;
}

export default function CertificateModal({
  certificate,
  onClose,
}: Props) {
  useEffect(() => {
    if (!certificate) return;

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/80"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full bg-white p-2 shadow-lg"
      >
        <X className="h-6 w-6 text-gray-800" />
      </button>

      <div className="flex h-full w-full items-center justify-center p-4">
        <img
          src={certificate.image}
          alt={certificate.title}
          onClick={(e) =>
            e.stopPropagation()
          }
          className="h-auto max-h-full max-w-full object-contain"
        />
      </div>
    </div>
  );
}