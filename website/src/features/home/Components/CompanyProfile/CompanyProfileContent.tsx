import Button from "@/components/ui/Button";
import { companyProfileData } from "./companyProfileData";

export default function CompanyProfileContent() {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
        {companyProfileData.subtitle}
      </p>

      <h2 className="mt-3 text-4xl font-bold text-gray-900 lg:text-5xl">
        {companyProfileData.title}
      </h2>

      <p className="mt-6 max-w-xl leading-8 text-gray-600">
        {companyProfileData.description}
      </p>

      <div className="mt-8">
        <Button>Download Company Profile</Button>
      </div>
    </div>
  );
}
