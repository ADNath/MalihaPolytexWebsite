import {
  Award,
  Factory,
  Globe2,
  Recycle,
  type LucideIcon,
} from "lucide-react";

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const companyOverviewData = {
  subtitle: "COMPANY PROFILE",

  title: "A Legacy Built on Trust & Sustainability",

  description:
    "Maliha Poly Tex Fiber Industry Limited is a Bangladesh-China joint venture dedicated to manufacturing premium 100% recycled Polyester Staple Fiber (PSF). Through advanced technology and sustainable practices, we deliver environmentally responsible textile solutions for both local and international markets.",

  buttonText: "Download Company Profile",

  features: [
    {
      title: "Bangladesh-China Joint Venture",
      description: "A strategic partnership combining international expertise and local excellence.",
      icon: Globe2,
    },
    {
      title: "100% Recycled PSF",
      description: "Producing premium recycled polyester staple fiber from PET bottles.",
      icon: Recycle,
    },
    {
      title: "Modern Manufacturing",
      description: "Advanced production facilities ensuring consistent quality and efficiency.",
      icon: Factory,
    },
    {
      title: "GRS Certified",
      description: "Committed to sustainable production under Global Recycled Standard.",
      icon: Award,
    },
  ],

  certificate: {
    subtitle: "OUR CERTIFICATE",

    title: "Global Recycled Standard (GRS)",

    description:
      "Our GRS certification demonstrates our commitment to responsible sourcing, recycled materials and environmentally sustainable manufacturing.",

    buttonText: "View Certificate",
  },
};