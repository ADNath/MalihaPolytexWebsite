import { useEffect, useMemo, useState } from "react";

import {
  createCompanyProfile,
  deleteCompanyProfile,
  getCompanyProfiles,
  updateCompanyProfile,
} from "@/services/companyProfileService";

import type {
  CompanyProfile,
  CompanyProfileRequest,
} from "@/types/companyProfile";

import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Loading from "@/components/ui/Loading";
import EmptyState from "@/components/ui/EmptyState";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import SearchInput from "@/components/ui/SearchInput";
import StatusBadge from "@/components/ui/StatusBadge";
import ActionButtons from "@/components/ui/ActionButtons";
import CompanyProfileDialog from "./CompanyProfileDialog";


export default function CompanyProfilesPage() {
  const [companyProfiles, setCompanyProfiles] = useState<
    CompanyProfile[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);

  const [selectedCompanyProfile, setSelectedCompanyProfile] =
    useState<CompanyProfile | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] =
    useState(false);

  const [deleteId, setDeleteId] = useState<number>();

  useEffect(() => {
    void loadCompanyProfiles();
  }, []);

  async function loadCompanyProfiles() {
    try {
      setLoading(true);

      const data = await getCompanyProfiles();

      setCompanyProfiles(data);
    } finally {
      setLoading(false);
    }
  }
  console.log(companyProfiles);
  
  const filteredCompanyProfiles = useMemo(() => {
    return companyProfiles.filter(
      (x) =>
        x.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        x.updatedAt
          .toLowerCase()
          .includes(search.toLowerCase()),
    );
  }, [companyProfiles, search]);

  async function handleSave(
    request: CompanyProfileRequest,
  ) {
    if (selectedCompanyProfile) {
      await updateCompanyProfile(
        selectedCompanyProfile.companyProfileId,
        request,
      );
    } else {
      await createCompanyProfile(request);
    }

    setDialogOpen(false);

    await loadCompanyProfiles();
  }

  async function handleDelete() {
    if (!deleteId) return;

    await deleteCompanyProfile(deleteId);

    setDeleteDialogOpen(false);

    await loadCompanyProfiles();
  }

  return (
    <>
      <PageHeader
        title="Company Profile"
        subtitle="Manage company profile information."
      >
        <Button
          onClick={() => {
            setSelectedCompanyProfile(null);
            setDialogOpen(true);
          }}
        >
          + Add Company Profile
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
        ) : filteredCompanyProfiles.length === 0 ? (
          <EmptyState />
        ) : (
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Title
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  PDF
                </th>

                <th className="px-5 py-4 text-center text-sm font-semibold">
                  Updated
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
              {filteredCompanyProfiles.map((item) => (
                <tr
                  key={item.companyProfileId}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-5 py-4">
                    <div className="font-semibold">
                      {item.title}
                    </div>

                    <div className="line-clamp-2 text-sm text-gray-500">
                      {item.description}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <a
                      href={item.pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View PDF
                    </a>
                  </td>

                  <td className="text-center">
                    {item.updatedAt}
                  </td>

                  <td className="text-center">
                    <StatusBadge
                      active={item.isActive}
                    />
                  </td>

                  <td>
                    <ActionButtons
                      onEdit={() => {
                        setSelectedCompanyProfile(
                          item,
                        );
                        setDialogOpen(true);
                      }}
                      onDelete={() => {
                        setDeleteId(
                          item.companyProfileId,
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

      <CompanyProfileDialog
        open={dialogOpen}
        companyProfile={selectedCompanyProfile}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        title="Delete Company Profile"
        message="Are you sure you want to delete this company profile?"
        onClose={() =>
          setDeleteDialogOpen(false)
        }
        onConfirm={handleDelete}
      />
    </>
  );
}