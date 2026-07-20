import {
  Briefcase,
  CalendarDays,
  Clock3,
  MapPin,
  Users,
} from "lucide-react";

import type { JobOpening } from "@/types/jobOpening";

interface JobSummaryProps {
  job: JobOpening;
}

export default function JobSummary({ job }: JobSummaryProps) {
  const plainDescription = job.description
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const items = [
    {
      icon: MapPin,
      label: "Location",
      value: job.jobLocation ?? "N/A",
    },
    {
      icon: Briefcase,
      label: "Employment",
      value: job.employmentType ?? "N/A",
    },
    {
      icon: Clock3,
      label: "Experience",
      value: job.experience ?? "N/A",
    },
    {
      icon: Users,
      label: "Vacancies",
      value: job.vacancy?.toString() ?? "N/A",
    },
    {
      icon: CalendarDays,
      label: "Deadline",
      value: job.applicationDeadline
        ? new Date(job.applicationDeadline).toLocaleDateString()
        : "N/A",
    },
  ];

  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            {job.departmentName}
          </span>

          <h1 className="mt-4 text-4xl font-bold text-gray-900">
            {job.title}
          </h1>

          <p className="mt-4 max-w-3xl leading-7 text-gray-600">
            {plainDescription.length > 220
              ? `${plainDescription.substring(0, 220)}...`
              : plainDescription}
          </p>
        </div>

        <span className="inline-flex h-fit rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white">
          {job.employmentType}
        </span>
      </div>

      <div className="my-8 h-px bg-gray-200" />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>

              <div>
                <p className="text-sm text-gray-500">{item.label}</p>
                <p className="font-semibold text-gray-900">{item.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}