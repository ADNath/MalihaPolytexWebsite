import { useEffect, useMemo, useState } from "react";

import {
  createGeneralCertificate,
  deleteGeneralCertificate,
  getGeneralCertificates,
  updateGeneralCertificate,
} from "@/api/generalCertificateApi";

import type {
  CreateGeneralCertificateRequest,
  GeneralCertificateResponse,
  UpdateGeneralCertificateRequest,
} from "@/types/generalCertificate";

import ActionButtons from "@/components/ui/ActionButtons";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import EmptyState from "@/components/ui/EmptyState";
import Loading from "@/components/ui/Loading";
import PageHeader from "@/components/ui/PageHeader";
import SearchInput from "@/components/ui/SearchInput";
import StatusBadge from "@/components/ui/StatusBadge";
import GeneralCertificateDialog from "./GeneralCertificateDialog";
import { API_BASE_URL } from "@/config/app";

export default function GeneralCertificatesPage() {
  const [generalCertificates, setGeneralCertificates] = useState<
    GeneralCertificateResponse[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);

  const [selectedGeneralCertificate, setSelectedGeneralCertificate] =
    useState<GeneralCertificateResponse | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [deleteId, setDeleteId] = useState<number>();

  useEffect(() => {
    void loadGeneralCertificates();
  }, []);

  async function loadGeneralCertificates() {
    try {
      setLoading(true);

      const response = await getGeneralCertificates();

      if (response.success) {
        setGeneralCertificates(response.data ?? []);
      }
    } finally {
      setLoading(false);
    }
  }

  const filteredGeneralCertificates = useMemo(() => {
    return generalCertificates.filter(
      (x) =>
        x.title.toLowerCase().includes(search.toLowerCase()) ||
        (x.description ?? "").toLowerCase().includes(search.toLowerCase()),
    );
  }, [generalCertificates, search]);

  async function handleSave(
    request: CreateGeneralCertificateRequest | UpdateGeneralCertificateRequest,
  ) {
    if (selectedGeneralCertificate) {
      await updateGeneralCertificate(
        selectedGeneralCertificate.generalCertificateId,
        request as UpdateGeneralCertificateRequest,
      );
    } else {
      await createGeneralCertificate(
        request as CreateGeneralCertificateRequest,
      );
    }

    setDialogOpen(false);

    await loadGeneralCertificates();
  }

  async function handleDelete() {
    if (!deleteId) return;

    await deleteGeneralCertificate(deleteId);

    setDeleteDialogOpen(false);

    await loadGeneralCertificates();
  }
  return (
    <>
      <PageHeader
        title="General Certificates"
        subtitle="Manage general certificates."
      >
        <Button
          onClick={() => {
            setSelectedGeneralCertificate(null);
            setDialogOpen(true);
          }}
        >
          + Add General Certificate
        </Button>
      </PageHeader>

      <div className="mb-5 flex justify-between">
        <SearchInput value={search} onChange={setSearch} />
      </div>

      <Card className="overflow-hidden">
        {loading ? (
          <Loading />
        ) : filteredGeneralCertificates.length === 0 ? (
          <EmptyState />
        ) : (
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-4 text-left text-sm font-semibold">
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
              {filteredGeneralCertificates.map((item) => (
                <tr
                  key={item.generalCertificateId}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-5 py-4">
                    <img
                      src={`${API_BASE_URL}${item.image}`}
                      alt={item.title}
                      className="h-16 w-24 rounded border object-cover"
                    />
                  </td>

                  <td className="px-5 py-4">
                    <div className="font-semibold">{item.title}</div>

                    <div className="line-clamp-2 text-sm text-gray-500">
                      {item.description}
                    </div>
                  </td>

                  <td className="text-center">{item.displayOrder}</td>

                  <td className="text-center">
                    <StatusBadge active={item.isActive} />
                  </td>

                  <td>
                    <ActionButtons
                      onEdit={() => {
                        setSelectedGeneralCertificate(item);
                        setDialogOpen(true);
                      }}
                      onDelete={() => {
                        setDeleteId(item.generalCertificateId);
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

      <GeneralCertificateDialog
        open={dialogOpen}
        generalCertificate={selectedGeneralCertificate}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        title="Delete General Certificate"
        message="Are you sure you want to delete this general certificate?"
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
