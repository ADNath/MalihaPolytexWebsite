import { companyProfileData } from "./companyProfileData";

export default function CompanyProfileFeatures() {
  return (
    <div className="grid grid-cols-2 border border-gray-200">
      {companyProfileData.features.map(({ title, icon: Icon }) => (
        <div key={title} className="flex items-center gap-4 border border-gray-200 p-8">
          <Icon className="h-10 w-10 text-primary" strokeWidth={1.6} />
          <h3 className="font-semibold text-gray-900">{title}</h3>
        </div>
      ))}
    </div>
  );
}
