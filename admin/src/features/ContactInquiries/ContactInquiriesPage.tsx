import { useEffect, useMemo, useState } from "react";

import {
  deleteContactInquiry,
  getContactInquiries,
  updateContactInquiryStatus,
} from "@/api/contactInquiryApi";

import type {
  ContactInquiryResponse,
  UpdateContactInquiryStatusRequest,
} from "@/types/contactInquiry";

import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Loading from "@/components/ui/Loading";
import EmptyState from "@/components/ui/EmptyState";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import SearchInput from "@/components/ui/SearchInput";
import ActionButtons from "@/components/ui/ActionButtons";
import ContactInquiryDialog from "./ContactInquiryDialog";

export default function ContactInquiriesPage() {
  const [inquiries, setInquiries] = useState<ContactInquiryResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] =
    useState<ContactInquiryResponse | null>(null);

  const [saving, setSaving] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [deleteId, setDeleteId] = useState<number>();

  useEffect(() => {
    void loadInquiries();
  }, []);

  async function loadInquiries() {
    try {
      setLoading(true);

      const response = await getContactInquiries();

      setInquiries(response.data);
    } finally {
      setLoading(false);
    }
  }

  const filteredInquiries = useMemo(() => {
    const keyword = search.toLowerCase();

    return inquiries.filter((x) =>
      [x.name, x.company, x.email, x.subject]
        .filter(Boolean)
        .some((value) => value?.toLowerCase().includes(keyword)),
    );
  }, [inquiries, search]);

  async function handleSave(request: UpdateContactInquiryStatusRequest) {
    if (!selectedInquiry) return;

    try {
      setSaving(true);

      await updateContactInquiryStatus(selectedInquiry.inquiryId, request);

      setDialogOpen(false);

      await loadInquiries();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteId) return;

    await deleteContactInquiry(deleteId);

    setDeleteDialogOpen(false);

    await loadInquiries();
  }

  return (
    <>
      <PageHeader
        title="Contact Inquiries"
        subtitle="Manage customer inquiries from the website."
      />

      <div className="mb-5 flex justify-between">
        <SearchInput value={search} onChange={setSearch} />
      </div>

      <Card className="overflow-hidden">
        {loading ? (
          <Loading />
        ) : filteredInquiries.length === 0 ? (
          <EmptyState />
        ) : (
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Name
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Subject
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Email
                </th>

                <th className="px-5 py-4 text-center text-sm font-semibold">
                  Status
                </th>

                <th className="px-5 py-4 text-center text-sm font-semibold">
                  Date
                </th>

                <th className="px-5 py-4 text-center text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredInquiries.map((item) => (
                <tr key={item.inquiryId} className="border-t hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <div className="font-semibold">{item.name}</div>

                    {item.company && (
                      <div className="text-sm text-gray-500">
                        {item.company}
                      </div>
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <div className="max-w-xs truncate">{item.subject}</div>
                  </td>

                  <td className="px-5 py-4">
                    <a
                      href={`mailto:${item.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {item.email}
                    </a>
                  </td>

                  <td className="text-center">
                    <td className="text-center">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                          item.status === "New"
                            ? "bg-blue-100 text-blue-700"
                            : item.status === "Read"
                              ? "bg-yellow-100 text-yellow-700"
                              : item.status === "Replied"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </td>

                  <td className="px-5 py-4 text-center text-sm">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>

                  <td>
                    <ActionButtons
                      onView={() => {
                        setSelectedInquiry(item);
                        setDialogOpen(true);
                      }}
                      onDelete={() => {
                        setDeleteId(item.inquiryId);
                        setDeleteDialogOpen(true);
                      }}
                      onEdit={function (): void {
                        throw new Error("Function not implemented.");
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      <ContactInquiryDialog
        open={dialogOpen}
        inquiry={selectedInquiry}
        loading={saving}
        onClose={() => {
          setDialogOpen(false);
          setSelectedInquiry(null);
        }}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        title="Delete Inquiry"
        message="Are you sure you want to delete this inquiry?"
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
