import { Cog, Trophy, Users, type LucideIcon } from "lucide-react";

export interface WhatWeDoItem {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const whatWeDoData: WhatWeDoItem[] = [
  {
    id: 1,
    title: "Who We Are",
    description:
      "Maliha Poly Tex Fiber Industry Limited is a Bangladesh–China joint venture producing eco-friendly 100% recycled Polyester Staple Fiber (PSF).",
    icon: Users,
  },
  {
    id: 2,
    title: "What We Do",
    description:
      "We manufacture fine quality 100% recycled PSF using advanced technology. Our fibers are used in yarns, fabrics and garments worldwide.",
    icon: Cog,
  },
  {
    id: 3,
    title: "Achievement",
    description:
      "We are the first Global Recycled Standard (GRS) certified PSF manufacturer in Bangladesh, setting new industry benchmarks.",
    icon: Trophy,
  },
];