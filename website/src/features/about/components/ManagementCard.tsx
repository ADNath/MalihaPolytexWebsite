import type { ManagementMember } from "../data/topManagement";
import { Quote } from "lucide-react";

interface ManagementCardProps {
  member: ManagementMember;
  reverse?: boolean;
}

export default function ManagementCard({
  member,
  reverse = false,
}: ManagementCardProps) {
  return (
    <>
      <div
        className={`grid items-start gap-10 lg:grid-cols-12 ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* Profile */}

        <div className="lg:col-span-3">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <img
              src={member.image}
              alt={member.name}
              className="h-[340px] w-full object-cover object-top"
            />

            <div className="p-6">
              <h3 className="text-xl font-bold leading-tight text-gray-900">
                {member.name}
              </h3>

              <p className="mt-2 text-base font-medium text-primary">
                {member.designation}
              </p>
            </div>
          </div>
        </div>

        {/* Message */}

        <div className="lg:col-span-9">
          <div className="flex h-full flex-col justify-center rounded-2xl border border-gray-200 bg-white p-8 shadow-sm lg:p-10">
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Quote className="h-5 w-5 text-primary" />
            </div>
            <h2 className="mb-6 text-3xl font-bold text-gray-900">
              A Message from the {member.designation}
            </h2>

            <p className="text-justify leading-8 text-gray-600">
              {member.message}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
