import { CheckCircle } from "lucide-react";

import Button from "@/components/ui/Button";
import { companyVideoData } from "./companyVideoData";

export default function CompanyVideoContent() {
  return (
    <div className="flex h-full flex-col justify-center">
        
      <span className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
        {companyVideoData.subtitle}
      </span>

      <h2 className="text-3xl font-bold leading-tight text-gray-900 lg:text-5xl">
        {companyVideoData.title}
      </h2>

      <p className="mt-6 max-w-xl leading-8 text-gray-600">
        {companyVideoData.description}
      </p>

      <ul className="mt-8 space-y-5">
        {companyVideoData.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <CheckCircle
              className="mt-1 h-5 w-5 shrink-0 text-primary"
              strokeWidth={2}
            />

            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <Button>Learn More</Button>
      </div>
    </div>
  );
}
