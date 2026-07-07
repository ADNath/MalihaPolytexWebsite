import PageHero from "@/components/common/PageHero";
import PageIntroduction from "@/features/about/components/PageIntroduction";

import JobCard from "../components/JobCard";
import NoOpenings from "../components/NoOpenings";
import { jobs } from "../data/jobs";

import Container from "@/components/ui/Container";

export default function CurrentOpeningPage() {
  const activeJobs = jobs.filter((job) => job.isActive);

  return (
    <>
      <PageHero
        title="Current Opening"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us" },
          { label: "Career" },
          { label: "Current Opening" },
        ]}
      />

      <PageIntroduction
        eyebrow="Career"
        title="Join Our Team"
        description="Explore exciting career opportunities at Maliha Poly Tex Fiber Industry Limited. We are looking for talented and passionate professionals who are ready to grow with us and contribute to our continued success."
      />

      <section className="bg-gray-50 py-16 lg:py-20">
        <Container size="xl">
          {activeJobs.length > 0 ? (
            <div className="space-y-6">
              {activeJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <NoOpenings />
          )}
        </Container>
      </section>

    </>
  );
}