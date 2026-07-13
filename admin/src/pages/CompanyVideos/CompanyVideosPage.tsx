import { useEffect, useMemo, useState } from "react";

import {
  createCompanyVideo,
  deleteCompanyVideo,
  getCompanyVideos,
  updateCompanyVideo,
} from "@/services/companyVideoService";

import type {
  CompanyVideo,
  CompanyVideoRequest,
} from "@/types/companyVideo";

import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Loading from "@/components/ui/Loading";
import EmptyState from "@/components/ui/EmptyState";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import SearchInput from "@/components/ui/SearchInput";
import StatusBadge from "@/components/ui/StatusBadge";
import ActionButtons from "@/components/ui/ActionButtons";
import CompanyVideoDialog from "./CompanyVideoDialog";

export default function CompanyVideosPage() {
  const [videos, setVideos] = useState<CompanyVideo[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);

  const [selectedVideo, setSelectedVideo] =
    useState<CompanyVideo | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] =
    useState(false);

  const [deleteId, setDeleteId] = useState<number>();

  useEffect(() => {
    void loadVideos();
  }, []);

  async function loadVideos() {
    try {
      setLoading(true);

      const data = await getCompanyVideos();

      setVideos(data);
    } finally {
      setLoading(false);
    }
  }

  const filteredVideos = useMemo(() => {
    return videos.filter(
      (x) =>
        x.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        x.videoUrl
          .toLowerCase()
          .includes(search.toLowerCase()),
    );
  }, [videos, search]);

  async function handleSave(
    request: CompanyVideoRequest,
  ) {
    if (selectedVideo) {
      await updateCompanyVideo(
        selectedVideo.companyVideoId,
        request,
      );
    } else {
      await createCompanyVideo(request);
    }

    setDialogOpen(false);

    await loadVideos();
  }

  async function handleDelete() {
    if (!deleteId) return;

    await deleteCompanyVideo(deleteId);

    setDeleteDialogOpen(false);

    await loadVideos();
  }

  return (
    <>
      <PageHeader
        title="Company Video"
        subtitle="Manage homepage company video."
      >
        <Button
          onClick={() => {
            setSelectedVideo(null);
            setDialogOpen(true);
          }}
        >
          + Add Video
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
        ) : filteredVideos.length === 0 ? (
          <EmptyState />
        ) : (
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Title
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Video URL
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
              {filteredVideos.map((item) => (
                <tr
                  key={item.companyVideoId}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-5 py-4">
                    <div className="font-semibold">
                      {item.title}
                    </div>

                    {item.description && (
                      <div className="line-clamp-2 text-sm text-gray-500">
                        {item.description}
                      </div>
                    )}
                  </td>

                  <td className="max-w-xs px-5 py-4">
                    <div
                      className="truncate text-sm text-blue-600"
                      title={item.videoUrl}
                    >
                      {item.videoUrl}
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
                        setSelectedVideo(item);
                        setDialogOpen(true);
                      }}
                      onDelete={() => {
                        setDeleteId(
                          item.companyVideoId,
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

      <CompanyVideoDialog
        open={dialogOpen}
        companyVideo={selectedVideo}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        title="Delete Company Video"
        message="Are you sure you want to delete this company video?"
        onClose={() =>
          setDeleteDialogOpen(false)
        }
        onConfirm={handleDelete}
      />
    </>
  );
}