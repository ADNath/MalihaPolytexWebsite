import { useEffect, useState } from "react";

import CertificateCard from "./CertificateCard";
import CertificateModal from "./CertificateModal";
import type { GeneralCertificates } from "@/types/generalCertificates";
import { getGeneralCertificates } from "@/services/api/generalCertificateApi";
import { getImageUrl } from "@/utils/image";

export default function CertificateGrid() {
  const [certificates, setCertificates] = useState<GeneralCertificates[]>([]);

  const [selectedCertificate, setSelectedCertificate] =
    useState<GeneralCertificates | null>(null);

  const [loading, setLoading] = useState(true);

  async function loadCertificates() {
    try {
      setLoading(true);

      const response = await getGeneralCertificates();

      if (response.success) {
        setCertificates(
          (response.data ?? [])
            .filter((x) => x.isActive)
            .sort((a, b) => a.displayOrder - b.displayOrder),
        );
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadCertificates();
  }, []);
  if (loading) {
    return (
      <div className="py-12 text-center text-gray-500">
        Loading certificates...
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {certificates.map((certificate) => (
          <CertificateCard
            key={certificate.generalCertificateId}
            certificate={{
              ...certificate,
              image: getImageUrl(certificate.image),
            }}
            onClick={setSelectedCertificate}
          />
        ))}
      </div>

      <CertificateModal
        certificate={
          selectedCertificate
            ? {
                ...selectedCertificate,
                image: getImageUrl(selectedCertificate.image),
              }
            : null
        }
        onClose={() => setSelectedCertificate(null)}
      />
    </>
  );
}
