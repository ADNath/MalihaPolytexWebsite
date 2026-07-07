import PageHero from "@/components/common/PageHero";
import Container from "@/components/ui/Container";
import PageIntroduction from "@/features/about/components/PageIntroduction";

import WalkInApplicationForm from "../components/WalkInApplicationForm";

export default function WalkInApplicationPage() {
  return (
    <>
      <PageHero
        title="Walk In Application"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Career" },
          { label: "Walk In Application" },
        ]}
      />

      <PageIntroduction
        eyebrow="Career"
        title="Build Your Career With Us"
        description="We are always looking for passionate, talented and dedicated professionals. If there isn't a suitable position available today, submit your resume and we'll keep your profile for future career opportunities."
      />

      <section className="bg-gray-50 py-12 lg:py-16">
        <Container size="xl">
          <WalkInApplicationForm />
        </Container>
      </section>

    </>
  );
}