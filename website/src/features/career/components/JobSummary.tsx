import { Briefcase, CalendarDays, Clock3, MapPin, Users } from "lucide-react";
import type { Job } from "../types";

interface JobSummaryProps {
  job: Job;
}

export default function JobSummary({ job }: JobSummaryProps) {
  const items = [
    {
      icon: MapPin,
      label: "Location",
      value: job.location,
    },
    {
      icon: Briefcase,
      label: "Employment",
      value: job.employmentType,
    },
    {
      icon: Clock3,
      label: "Experience",
      value: job.experience,
    },
    {
      icon: Users,
      label: "Vacancies",
      value: job.vacancies.toString(),
    },
    {
      icon: CalendarDays,
      label: "Deadline",
      value: job.applicationDeadline,
    },
  ];

  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            {job.department}
          </span>

          <h1 className="mt-4 text-4xl font-bold text-gray-900">{job.title}</h1>

          <p className="mt-4 max-w-3xl leading-7 text-gray-600">
            {job.shortDescription}
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
