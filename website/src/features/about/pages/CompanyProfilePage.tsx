
import PageHero from "@/components/common/PageHero";
import CompanyProfileSection from "../components/CompanyProfileSection";

export default function CompanyProfilePage() {
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