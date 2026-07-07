import PageHero from "@/components/common/PageHero";
import Container from "@/components/ui/Container";

import CareerApplicationForm from "../components/CareerApplicationForm";
import JobSummary from "../components/JobSummary";
import { jobs } from "../data/jobs";

export default function JobDetailsPage() {
  // Temporary
  // Later this will come from useParams()

  const job = jobs[0];

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
          {/* Job Summary */}

          <JobSummary job={job} />

          {/* Main Content */}

          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            {/* Left */}

            <div className="space-y-12 lg:col-span-7">
              {/* Description */}

              <section>
                <div className="border-l-4 border-primary pl-5">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Job Description
                  </h2>
                </div>

                <p className="mt-6 leading-8 text-gray-600">
                  {job.description}
                </p>
              </section>

              {/* Responsibilities */}

              <section>
                <div className="border-l-4 border-primary pl-5">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Responsibilities
                  </h2>
                </div>

                <ul className="mt-6 space-y-4">
                  {job.responsibilities.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-2 h-2 w-2 rounded-full bg-primary" />

                      <span className="leading-7 text-gray-600">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Requirements */}

              <section>
                <div className="border-l-4 border-primary pl-5">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Requirements
                  </h2>
                </div>

                <ul className="mt-6 space-y-4">
                  {job.requirements.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-2 h-2 w-2 rounded-full bg-primary" />

                      <span className="leading-7 text-gray-600">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Benefits */}

              <section>
                <div className="border-l-4 border-primary pl-5">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Benefits
                  </h2>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {job.benefits.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                    >
                      ✓ {item}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            {/* Right */}

            <aside className="lg:col-span-5">
              <div className="sticky top-28 rounded-3xl bg-primary/5 p-4">
                <CareerApplicationForm />
              </div>
            </aside>
          </div>
        </Container>
      </section>

    </>
  );
}