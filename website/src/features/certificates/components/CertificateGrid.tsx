import { useState } from "react";

import CertificateCard from "./CertificateCard";
import CertificateModal from "./CertificateModal";

import {
  certificates,
  type Certificate,
} from "../data/certificates";

export default function CertificateGrid() {
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {certificates.map((certificate) => (
          <CertificateCard
            key={certificate.id}
            certificate={certificate}
            onClick={setSelectedCertificate}
          />
        ))}
      </div>

      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </>
  );
}