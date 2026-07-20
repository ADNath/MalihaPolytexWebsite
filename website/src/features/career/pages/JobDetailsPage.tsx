import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import PageHero from "@/components/common/PageHero";
import Container from "@/components/ui/Container";
import usePageTitle from "@/hooks/usePageTitle";
import type { JobOpening } from "@/types/jobOpening";

import CareerApplicationForm from "../components/CareerApplicationForm";
import JobSummary from "../components/JobSummary";
import { getJobOpening } from "@/services/api/jobOpeningApi";

export default function JobDetailsPage() {
  const { jobId } = useParams();

  const [job, setJob] = useState<JobOpening | null>(null);
  const [loading, setLoading] = useState(true);

  usePageTitle("Job Details | Maliha Poly Tex Fiber Industry Ltd.");

  useEffect(() => {
    const loadJob = async () => {
      if (!jobId) {
        setLoading(false);
        return;
      }

      try {
        const response = await getJobOpening(Number(jobId));

        if (response.success) {
          setJob(response.data);
        } else {
          setJob(null);
        }
      } catch (error) {
        console.error("Failed to load job opening:", error);
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [jobId]);

  if (loading) {
    return (
      <section className="py-24 text-center">
        <p className="text-gray-500">Loading...</p>
      </section>
    );
  }

  if (!job) {
    return (
      <section className="py-24 text-center">
        <h2 className="text-3xl font-bold">Job not found.</h2>
      </section>
    );
  }

  return (
    <>
      <PageHero
        title={job.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Career", href: "/career/current-opening" },
          { label: job.title },
        ]}
      />

      <section className="bg-gray-50 py-8 lg:py-12">
        <Container size="xl">
          <JobSummary job={job} />

          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <div className="space-y-12 lg:col-span-7">
              <section>
                <div className="border-l-4 border-primary pl-5">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Job Description
                  </h2>
                </div>

                <div
                  className="prose prose-gray mt-6 max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: job.description,
                  }}
                />
              </section>

              {job.responsibilities && (
                <section>
                  <div className="border-l-4 border-primary pl-5">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Responsibilities
                    </h2>
                  </div>

                  <div
                    className="prose prose-gray mt-6 max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: job.responsibilities,
                    }}
                  />
                </section>
              )}

              {job.requirements && (
                <section>
                  <div className="border-l-4 border-primary pl-5">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Requirements
                    </h2>
                  </div>

                  <div
                    className="prose prose-gray mt-6 max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: job.requirements,
                    }}
                  />
                </section>
              )}

              {job.benefits && (
                <section>
                  <div className="border-l-4 border-primary pl-5">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Benefits
                    </h2>
                  </div>

                  <div
                    className="prose prose-gray mt-6 max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: job.benefits,
                    }}
                  />
                </section>
              )}
            </div>

            <aside className="lg:col-span-5">
              <div className="sticky top-28 rounded-3xl bg-primary/5 p-4">
                <CareerApplicationForm jobId={job.jobId} />
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}