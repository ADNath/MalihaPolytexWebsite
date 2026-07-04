import { Globe, Handshake, Leaf, Settings2, type LucideIcon } from "lucide-react";

export interface CompanyProfileFeature {
  title: string;
  icon: LucideIcon;
}

export const companyProfileData = {
  subtitle: "COMPANY PROFILE",
  title: "A Legacy Built on Trust and Sustainability",
  description:
    "Maliha Poly Tex Fiber Industry Limited is a Bangladesh-China joint venture producing eco-friendly 100% recycled Polyester Staple Fiber (PSF). We combine advanced technology with sustainable practices to deliver premium quality fibers for global textile markets.",
  features: [
    { title: "Bangladesh-China Joint Venture", icon: Handshake },
    { title: "First GRS Certified PSF Manufacturer", icon: Settings2 },
    { title: "Eco-Friendly Production", icon: Leaf },
    { title: "International Standard Quality", icon: Globe },
  ] as CompanyProfileFeature[],
};
