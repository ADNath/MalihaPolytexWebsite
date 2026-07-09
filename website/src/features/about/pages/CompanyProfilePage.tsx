import PageHero from "@/components/common/PageHero";
import CompanyProfileSection from "../components/CompanyProfileSection";
import usePageTitle from "@/hooks/usePageTitle";

export default function CompanyProfilePage() {
  usePageTitle("Company Profile | Maliha Poly Tex Fiber Industry Ltd.");
  return (
    <>
      <PageHero
        title="Company Profile"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us" },
          { label: "Company Profile" },
        ]}
      />

      <CompanyProfileSection />
    </>
  );
}
