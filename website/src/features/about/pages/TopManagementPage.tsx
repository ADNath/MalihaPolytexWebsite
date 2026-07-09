import Container from "@/components/ui/Container";
import PageHero from "@/components/common/PageHero";

import PageIntroduction from "../components/PageIntroduction";
import ManagementCard from "../components/ManagementCard";
import { topManagement } from "../data/topManagement";
import usePageTitle from "@/hooks/usePageTitle";

export default function TopManagementPage() {
  usePageTitle("Top Management | Maliha Poly Tex Fiber Industry Ltd.");
  return (
    <>
      <PageHero
        title="Top Management"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us" },
          { label: "Top Management" },
        ]}
      />

      <PageIntroduction
        eyebrow="Leadership"
        title="Meet Our Leadership Team"
        description="Our leadership team is committed to innovation, operational excellence, and sustainable growth. Their vision and experience continue to drive Maliha Poly Tex Fiber Industry Limited toward becoming a trusted global textile manufacturer."
      />

      <section className="bg-gray-50 py-20">
        <Container size="xl">
          <div className="space-y-16">
            {topManagement.map((member, index) => (
              <ManagementCard
                key={member.id}
                member={member}
                reverse={index % 2 === 1}
              />
            ))}
          </div>
        </Container>
      </section>

      
    </>
  );
}
