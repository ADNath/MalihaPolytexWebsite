import { ArrowRight, Briefcase, Calendar, Clock3, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

import type { JobOpening } from "@/types/jobOpening";

interface JobCardProps {
  job: JobOpening;
}

export default function JobCard({ job }: JobCardProps) {
  const description =
    job.description.replace(/<[^>]+>/g, "").trim().slice(0, 180) +
    (job.description.replace(/<[^>]+>/g, "").trim().length > 180 ? "..." : "");

  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-md">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>

          <p className="mt-1 text-lg font-medium text-primary">
            {job.departmentName}
          </p>
        </div>

        <span className="inline-flex w-fit rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
          {job.employmentType}
        </span>
      </div>

      <p className="mt-6 leading-7 text-gray-600">{description}</p>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="flex items-center gap-2 text-gray-700">
          <MapPin className="h-5 w-5 text-primary" />
          <span>{job.jobLocation}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <Briefcase className="h-5 w-5 text-primary" />
          <span>{job.experience}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <Calendar className="h-5 w-5 text-primary" />
          <span>
            Deadline:{" "}
            {job.applicationDeadline
              ? new Date(job.applicationDeadline).toLocaleDateString()
              : "N/A"}
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <Clock3 className="h-5 w-5 text-primary" />
          <span>{job.employmentType}</span>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
        <p className="text-sm text-gray-500">
          Vacancies:{" "}
          <span className="font-semibold">{job.vacancy ?? "N/A"}</span>
        </p>

        <Link
          to={`/career/${job.jobId}`}
          className="inline-flex items-center gap-2 font-semibold text-primary transition-colors hover:gap-3"
        >
          View Details
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </article>
  );
}