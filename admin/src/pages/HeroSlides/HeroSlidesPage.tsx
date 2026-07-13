import { useEffect, useMemo, useState } from "react";

import {
  createHeroSlide,
  deleteHeroSlide,
  getHeroSlides,
  updateHeroSlide,
  type HeroSlideRequest,
  type HeroSlideResponse,
} from "@/api/heroSlideApi";

import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Loading from "@/components/ui/Loading";
import EmptyState from "@/components/ui/EmptyState";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import SearchInput from "@/components/ui/SearchInput";
import StatusBadge from "@/components/ui/StatusBadge";
import ActionButtons from "@/components/ui/ActionButtons";


import HeroSlideDialog from "./HeroSlideDialog";
import { getImageUrl } from "@/utils/image";

export default function HeroSlidesPage() {
  const [heroSlides, setHeroSlides] = useState<HeroSlideResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSlide, setSelectedSlide] =
    useState<HeroSlideResponse | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number>();

  useEffect(() => {
    void loadHeroSlides();
  }, []);

  async function loadHeroSlides() {
    try {
      setLoading(true);

      const response = await getHeroSlides();

      if (response.success) {
        setHeroSlides(response.data);
      }
    } finally {
      setLoading(false);
    }
  }

  const filteredSlides = useMemo(() => {
    return heroSlides.filter((x) =>
      x.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [heroSlides, search]);

  async function handleSave(request: HeroSlideRequest) {
    if (selectedSlide) {
      await updateHeroSlide(selectedSlide.heroSlideId, request);
    } else {
      await createHeroSlide(request);
    }

    setDialogOpen(false);

    await loadHeroSlides();
  }

  async function handleDelete() {
    if (!deleteId) return;

    await deleteHeroSlide(deleteId);

    setDeleteDialogOpen(false);

    await loadHeroSlides();
  }

  return (
    <>
      <PageHeader
        title="Hero Slider"
        subtitle="Manage homepage hero slides."
      >
        <Button
          onClick={() => {
            setSelectedSlide(null);
            setDialogOpen(true);
          }}
        >
          + Add Hero Slide
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
        ) : filteredSlides.length === 0 ? (
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

              {filteredSlides.map((slide) => (

                <tr
                  key={slide.heroSlideId}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="px-5 py-4">

                    <img
                      src={getImageUrl(slide.desktopImage)}
                      className="h-16 w-28 rounded-lg border object-cover"
                    />

                  </td>

                  <td className="px-5 py-4">

                    <div className="font-semibold">
                      {slide.title}
                    </div>

                    <div className="text-sm text-gray-500">
                      {slide.subtitle}
                    </div>

                  </td>

                  <td className="text-center">
                    {slide.displayOrder}
                  </td>

                  <td className="text-center">
                    <StatusBadge active={slide.isActive} />
                  </td>

                  <td>

                    <ActionButtons
                      onEdit={() => {
                        setSelectedSlide(slide);
                        setDialogOpen(true);
                      }}
                      onDelete={() => {
                        setDeleteId(slide.heroSlideId);
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

      <HeroSlideDialog
        open={dialogOpen}
        heroSlide={selectedSlide}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        title="Delete Hero Slide"
        message="Are you sure you want to delete this hero slide?"
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}