import Container from "@/components/ui/Container";
import CompanyProfileContent from "./CompanyProfileContent";
import CompanyProfileFeatures from "./CompanyProfileFeatures";

export default function CompanyProfile() {
  return (
    <section className="bg-white py-20 lg:py-24">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.2fr]">
          <CompanyProfileContent />
          <CompanyProfileFeatures />
        </div>
      </Container>
    </section>
  );
}
