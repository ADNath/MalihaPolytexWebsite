import Button from "@/components/ui/Button";

import type { CertificateResponse } from "@/types/certificate";
import { getImageUrl } from "@/utils/image";

interface Props {
  certificate: CertificateResponse;
}

export default function CertificateCard({ certificate }: Props) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="grid items-center gap-8 lg:grid-cols-[220px_1fr_auto]">
        {/* Logo */}

        <div className="flex justify-center">
          <img
            src={getImageUrl(certificate.image)}
            alt={certificate.title}
            className="max-h-40 object-contain"
            loading="lazy"
          />
        </div>

        {/* Content */}

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            OUR CERTIFICATE
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900 lg:text-4xl">
            {certificate.title}
          </h2>

          {certificate.description && (
            <p className="mt-5 leading-8 text-gray-600">
              {certificate.description}
            </p>
          )}
        </div>

        {/* Button */}

        <div className="flex justify-center lg:justify-end">
          <Button to='/certificates'>View Certificate</Button>
        </div>
      </div>
    </div>
  );
}
