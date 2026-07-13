import { useEffect, useMemo, useState } from "react";


import type {
  HomepageContactRequest,
  HomepageContactResponse,
} from "@/types/homepageContact";

import ActionButtons from "@/components/ui/ActionButtons";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import EmptyState from "@/components/ui/EmptyState";
import Loading from "@/components/ui/Loading";
import PageHeader from "@/components/ui/PageHeader";
import SearchInput from "@/components/ui/SearchInput";
import StatusBadge from "@/components/ui/StatusBadge";

import HomepageContactDialog from "./HomepageContactDialog";
import { createHomepageContact, deleteHomepageContact, getHomepageContacts, updateHomepageContact } from "@/services/homepageContactApi";

export default function HomepageContactsPage() {
  const [homepageContacts, setHomepageContacts] = useState<
    HomepageContactResponse[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);

  const [selectedContact, setSelectedContact] =
    useState<HomepageContactResponse | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [deleteId, setDeleteId] = useState<number>();

  useEffect(() => {
    void loadHomepageContacts();
  }, []);

  async function loadHomepageContacts() {
    try {
      setLoading(true);

      const response = await getHomepageContacts();

      if (response.success) {
        setHomepageContacts(response.data);
      }
    } finally {
      setLoading(false);
    }
  }

  const filteredContacts = useMemo(() => {
    return homepageContacts.filter((x) =>
      x.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [homepageContacts, search]);

  async function handleSave(request: HomepageContactRequest) {
    if (selectedContact) {
      await updateHomepageContact(selectedContact.homepageContactId, request);
    } else {
      await createHomepageContact(request);
    }

    setDialogOpen(false);

    await loadHomepageContacts();
  }

  async function handleDelete() {
    if (!deleteId) return;

    await deleteHomepageContact(deleteId);

    setDeleteDialogOpen(false);

    await loadHomepageContacts();
  }

  return (
    <>
      <PageHeader
        title="Homepage Contact"
        subtitle="Manage homepage contact information."
      >
        <Button
          onClick={() => {
            setSelectedContact(null);
            setDialogOpen(true);
          }}
        >
          + Add Contact
        </Button>
      </PageHeader>

      <div className="mb-5 flex justify-between">
        <SearchInput value={search} onChange={setSearch} />
      </div>

      <Card className="overflow-hidden">
        {loading ? (
          <Loading />
        ) : filteredContacts.length === 0 ? (
          <EmptyState />
        ) : (
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Title
                </th>

                <th className="px-5 py-4 text-center text-sm font-semibold">
                  Phones
                </th>

                <th className="px-5 py-4 text-center text-sm font-semibold">
                  Emails
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
              {filteredContacts.map((contact) => (
                <tr
                  key={contact.homepageContactId}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-5 py-4">
                    <div className="font-semibold">{contact.title}</div>
                  </td>

                  <td className="text-center">{contact.phones.length}</td>

                  <td className="text-center">{contact.emails.length}</td>

                  <td className="text-center">{contact.displayOrder}</td>

                  <td className="text-center">
                    <StatusBadge active={contact.isActive} />
                  </td>

                  <td>
                    <ActionButtons
                      onEdit={() => {
                        setSelectedContact(contact);
                        setDialogOpen(true);
                      }}
                      onDelete={() => {
                        setDeleteId(contact.homepageContactId);
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

      <HomepageContactDialog
        open={dialogOpen}
        homepageContact={selectedContact}
        onClose={() => {
          setDialogOpen(false);
          setSelectedContact(null);
        }}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        title="Delete Homepage Contact"
        message="Are you sure you want to delete this contact?"
        onClose={() => {
          setDeleteDialogOpen(false);
          setDeleteId(undefined);
        }}
        onConfirm={handleDelete}
      />
    </>
  );
}
