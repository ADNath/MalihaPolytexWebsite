import { Quote } from "lucide-react";
import type { ManagementMember } from "../data/topManagement";

interface ManagementCardProps {
  member: ManagementMember;
  reverse?: boolean;
}

export default function ManagementCard({
  member,
  reverse = false,
}: ManagementCardProps) {
  return (
    <div
      className={`grid items-start gap-8 lg:grid-cols-12 ${
        reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Profile Card */}

      <div className="lg:col-span-3">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <img
            src={member.image}
            alt={member.name}
            className="h-[320px] w-full object-cover object-top"
          />

          <div className="p-6">
            <div className="mb-5 h-px w-full bg-gray-200" />

            <h3 className="text-xs font-bold leading-tight text-gray-900">
              {member.name}
            </h3>

            <p className="mt-2 font-medium text-xs">
              {member.designation}
            </p>
          </div>
        </div>
      </div>

      {/* Message */}

      <div className="lg:col-span-9">
        <div className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-8 lg:p-10">
          {/* Quote */}

          <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Quote className="h-5 w-5 text-primary" />
          </div>

          {/* Heading */}

          <h2 className="text-3xl font-bold text-gray-900">
            A Message from the {member.designation}
          </h2>

          <div className="mt-5 mb-8 h-px w-24 bg-primary" />

          {/* Message */}

          <div className="flex-1">
            <p className="text-justify text-lg leading-8 text-gray-600">
              {member.message}
            </p>
          </div>

          {/* Signature */}

          <div className="mt-10 border-t border-gray-200 pt-6">
            <p className="text-lg font-semibold text-gray-900">
              {member.name}
            </p>

            <p className="mt-1 text-primary">
              {member.designation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}