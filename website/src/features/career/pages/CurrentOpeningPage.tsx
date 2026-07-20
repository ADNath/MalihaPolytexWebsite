import { useEffect, useState } from "react";

import PageHero from "@/components/common/PageHero";
import Container from "@/components/ui/Container";
import PageIntroduction from "@/features/about/components/PageIntroduction";
import usePageTitle from "@/hooks/usePageTitle";

import type { JobOpening } from "@/types/jobOpening";

import JobCard from "../components/JobCard";
import NoOpenings from "../components/NoOpenings";
import { getJobOpenings } from "@/services/api/jobOpeningApi";

export default function CurrentOpeningPage() {
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [loading, setLoading] = useState(true);

  usePageTitle("Current Opening | Maliha Poly Tex Fiber Industry Ltd.");

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const response = await getJobOpenings();

        if (response.success) {
          const activeJobs = response.data
            .filter((job) => job.isActive)
            .sort((a, b) => a.displayOrder - b.displayOrder);

          setJobs(activeJobs);
        } else {
          setJobs([]);
        }
      } catch (error) {
        console.error("Failed to load job openings:", error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

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
          {loading ? (
            <div className="py-12 text-center text-gray-500">
              Loading job openings...
            </div>
          ) : jobs.length > 0 ? (
            <div className="space-y-6">
              {jobs.map((job) => (
                <JobCard key={job.jobId} job={job} />
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