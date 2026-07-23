import { useEffect, useMemo, useState } from "react";

import {
  createCertificate,
  deleteCertificate,
  getCertificates,
  updateCertificate,
} from "@/services/certificateService";

import type {
  Certificate,
  CertificateRequest,
} from "@/types/certificate";


import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Loading from "@/components/ui/Loading";
import EmptyState from "@/components/ui/EmptyState";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import SearchInput from "@/components/ui/SearchInput";
import StatusBadge from "@/components/ui/StatusBadge";
import ActionButtons from "@/components/ui/ActionButtons";
import CertificateDialog from "./CertificateDialog";
import { getImageUrl } from "@/utils/image";


export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<
    Certificate[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);

  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] =
    useState(false);

  const [deleteId, setDeleteId] = useState<number>();

  useEffect(() => {
    void loadCertificates();
  }, []);

  async function loadCertificates() {
    try {
      setLoading(true);

      const data = await getCertificates();

      setCertificates(data);
    } finally {
      setLoading(false);
    }
  }

  const filteredCertificates = useMemo(() => {
    return certificates.filter((x) =>
      x.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [certificates, search]);

  async function handleSave(
    request: CertificateRequest,
  ) {
    if (selectedCertificate) {
      await updateCertificate(
        selectedCertificate.certificateId,
        request,
      );
    } else {
      await createCertificate(request);
    }

    setDialogOpen(false);

    await loadCertificates();
  }

  async function handleDelete() {
    if (!deleteId) return;

    await deleteCertificate(deleteId);

    setDeleteDialogOpen(false);

    await loadCertificates();
  }

  return (
    <>
      <PageHeader
        title="Certificates"
        subtitle="Manage homepage certificates."
      >
        <Button
          onClick={() => {
            setSelectedCertificate(null);
            setDialogOpen(true);
          }}
        >
          + Add Certificate
        </Button>
      </PageHeader>

      <div className="mb-5 flex justify-between">
        <SearchInput
          value={search}
          onChange={setSearch}
        />
      </div>

      <Card className="overflow-hidden">
        {loading ? (
          <Loading />
        ) : filteredCertificates.length === 0 ? (
          <EmptyState />
        ) : (
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-4 text-center text-sm font-semibold">
                  Image
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Title
                </th>

                <th className="px-5 py-4 text-center text-sm font-semibold">
                  Order
                </th>

                <th className="px-5 py-4 text-center text-sm font-semibold">
                  Status
                </th>

                <th className="px-5 py-4 text-center text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredCertificates.map((item) => (
                <tr
                  key={item.certificateId}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-5 py-4">
                    <div className="flex justify-center">
                      <img
                        src={getImageUrl(item.image)}
                        alt={item.title}
                        className="h-16 w-24 rounded-lg border object-cover"
                      />
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="font-semibold">
                      {item.title}
                    </div>

                    <div className="line-clamp-2 text-sm text-gray-500">
                      {item.description}
                    </div>
                  </td>

                  <td className="text-center">
                    {item.displayOrder}
                  </td>

                  <td className="text-center">
                    <StatusBadge
                      active={item.isActive}
                    />
                  </td>

                  <td>
                    <ActionButtons
                      onEdit={() => {
                        setSelectedCertificate(item);
                        setDialogOpen(true);
                      }}
                      onDelete={() => {
                        setDeleteId(
                          item.certificateId,
                        );
                        setDeleteDialogOpen(true);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      <CertificateDialog
        open={dialogOpen}
        certificate={selectedCertificate}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        title="Delete Certificate"
        message="Are you sure you want to delete this certificate?"
        onClose={() =>
          setDeleteDialogOpen(false)
        }
        onConfirm={handleDelete}
      />
    </>
  );
}