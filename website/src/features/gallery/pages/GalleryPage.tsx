import PageHero from "@/components/common/PageHero";
import Container from "@/components/ui/Container";

import GalleryGrid from "../components/GalleryGrid";
import usePageTitle from "@/hooks/usePageTitle";

export default function GalleryPage() {
  usePageTitle("Gallery | Maliha Poly Tex Fiber Industry Ltd.");
  return (
    <>
      <PageHero
        title="Gallery"
        breadcrumbs={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: "Gallery",
          },
        ]}
      />

      <section className="py-4 lg:py-8">
        <Container size="xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
              Our Gallery
            </h2>

            <p className="mt-4 leading-8 text-gray-600">
              Explore moments from our manufacturing facilities, production
              processes, corporate activities, and milestones that reflect our
              commitment to quality, innovation, and sustainability.
            </p>
          </div>

          <GalleryGrid />
        </Container>
      </section>
    </>
  );
}