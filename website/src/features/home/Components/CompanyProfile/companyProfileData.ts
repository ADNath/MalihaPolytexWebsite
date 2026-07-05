import { Globe, Handshake, Leaf, Settings2, type LucideIcon } from "lucide-react";

export interface CompanyProfileFeature {
  title: string;
  icon: LucideIcon;
}

export const companyProfileData = {
  subtitle: "COMPANY PROFILE",
  title: "A Legacy Built on Trust and Sustainability",
  description:
    "Maliha Poly Tex Fiber Industry Limited is producing eco-friendly 100% polyster fiber in (PSF) in Bangladesh.",
  features: [
    { title: "Eco-firendly", icon: Handshake },
    { title: "First GRS Certified PSF Manufacturer", icon: Settings2 },
    { title: "Eco-Friendly Production", icon: Leaf },
    { title: "International Standard Quality", icon: Globe },
  ] as CompanyProfileFeature[],
};
