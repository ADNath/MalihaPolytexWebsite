import { Eye } from "lucide-react";

import type { Certificate } from "../data/certificates";

interface Props {
  certificate: Certificate;
  onClick: (certificate: Certificate) => void;
}

export default function CertificateCard({
  certificate,
  onClick,
}: Props) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Preview */}
      <button
        type="button"
        onClick={() => onClick(certificate)}
        className="relative block w-full overflow-hidden"
      >
        <div className="aspect-[3/4] overflow-hidden bg-gray-100">
          <img
            src={certificate.image}
            alt={certificate.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">
          <div className="flex h-14 w-14 scale-75 items-center justify-center rounded-full bg-white opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
            <Eye className="h-6 w-6 text-gray-800" />
          </div>
        </div>
      </button>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900">
          {certificate.title}
        </h3>

        <p className="mt-2 text-gray-600">
          {certificate.description}
        </p>

        <button
          type="button"
          onClick={() => onClick(certificate)}
          className="mt-6 inline-flex items-center rounded-full border border-green-700 px-5 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-700 hover:text-white"
        >
          View Certificate
        </button>
      </div>
    </article>
  );
}