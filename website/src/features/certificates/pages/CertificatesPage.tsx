import PageHero from "@/components/common/PageHero";
import Container from "@/components/ui/Container";

import CertificateGrid from "../components/CertificateGrid";
import usePageTitle from "@/hooks/usePageTitle";

export default function CertificatesPage() {
  usePageTitle("Certificates | Maliha Poly Tex Fiber Industry Ltd.");
  return (
    <>
      <PageHero
        title="Certificates"
        breadcrumbs={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: "Certificates",
          },
        ]}
      />

      <section className="py-5 lg:py-8">
        <Container size="xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
              Our Certifications
            </h2>

            <p className="mt-4 leading-8 text-gray-600">
              Maliha Poly Tex Fiber Industry Ltd. is committed to maintaining
              internationally recognized standards for quality, sustainability,
              and responsible manufacturing. Explore our Global Recycled
              Standard (GRS) certification and related documentation.
            </p>
          </div>

          <CertificateGrid />
        </Container>
      </section>
    </>
  );
}
