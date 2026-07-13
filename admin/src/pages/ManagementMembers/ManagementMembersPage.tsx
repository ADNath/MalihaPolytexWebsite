import { useEffect, useMemo, useState } from "react";

import {
  createManagementMember,
  deleteManagementMember,
  getManagementMembers,
  updateManagementMember,
  type ManagementMemberRequest,
  type ManagementMemberResponse,
} from "@/api/managementMemberApi";

import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Loading from "@/components/ui/Loading";
import EmptyState from "@/components/ui/EmptyState";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import SearchInput from "@/components/ui/SearchInput";
import StatusBadge from "@/components/ui/StatusBadge";
import ActionButtons from "@/components/ui/ActionButtons";

import ManagementMemberDialog from "./ManagementMemberDialog";
import { getImageUrl } from "@/utils/image";

export default function ManagementMembersPage() {
  const [managementMembers, setManagementMembers] = useState<
    ManagementMemberResponse[]
  >([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] =
    useState<ManagementMemberResponse | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number>();

  useEffect(() => {
    void loadManagementMembers();
  }, []);

  async function loadManagementMembers() {
    try {
      setLoading(true);

      const response = await getManagementMembers();

      if (response.success) {
        setManagementMembers(response.data);
      }
    } finally {
      setLoading(false);
    }
  }

  const filteredMembers = useMemo(() => {
    const keyword = search.toLowerCase();

    return managementMembers.filter(
      (member) =>
        member.name.toLowerCase().includes(keyword) ||
        member.designation.toLowerCase().includes(keyword)
    );
  }, [managementMembers, search]);

  async function handleSave(request: ManagementMemberRequest) {
    console.log(selectedMember);
    
    if (selectedMember) {
      await updateManagementMember(
        selectedMember.id,
        request
      );
    } else {
      await createManagementMember(request);
    }

    setDialogOpen(false);

    await loadManagementMembers();
  }

  async function handleDelete() {
    if (!deleteId) return;

    await deleteManagementMember(deleteId);

    setDeleteDialogOpen(false);

    await loadManagementMembers();
  }

  return (
    <>
      <PageHeader
        title="Top Management"
        subtitle="Manage top management members."
      >
        <Button
          onClick={() => {
            setSelectedMember(null);
            setDialogOpen(true);
          }}
        >
          + Add Member
        </Button>
      </PageHeader>

      <div className="mb-5 flex justify-between">
        <SearchInput value={search} onChange={setSearch} />
      </div>

      <Card className="overflow-hidden">
        {loading ? (
          <Loading />
        ) : filteredMembers.length === 0 ? (
          <EmptyState />
        ) : (
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Image
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Name
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Designation
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
              {filteredMembers.map((member) => (
                <tr
                  key={member.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-5 py-4">
                    <img
                      src={getImageUrl(member.imageUrl)}
                      alt={member.name}
                      className="h-16 w-16 rounded-lg border object-cover"
                    />
                  </td>

                  <td className="px-5 py-4">
                    <div className="font-semibold">{member.name}</div>
                  </td>

                  <td className="px-5 py-4">
                    {member.designation}
                  </td>

                  <td className="text-center">
                    {member.displayOrder}
                  </td>

                  <td className="text-center">
                    <StatusBadge active={member.isActive} />
                  </td>

                  <td>
                    <ActionButtons
                      onEdit={() => {
                        setSelectedMember(member);
                        setDialogOpen(true);
                      }}
                      onDelete={() => {
                        setDeleteId(member.id);
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

      <ManagementMemberDialog
        open={dialogOpen}
        managementMember={selectedMember}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        title="Delete Management Member"
        message="Are you sure you want to delete this management member?"
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}