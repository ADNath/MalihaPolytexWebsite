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
    title: "About Us",
    description:
      "We are the pioneer of Polyester Staple Fiber manufacturer in Bangladesh. We are a well-tuned team of Technical engineing with a great Management system.",
    icon: Users,
  },
  {
    id: 2,
    title: "Our Product",
    description:
      "We provide the largest selection of high-quality Polyester staple fiber (PSF) from the Recycle PET material.",
    icon: Cog,
  },
  {
    id: 3,
    title: "Our Achievements",
    description:
      "We are the first Global Recycle Standard (GRS) certified PSF manufacturing company in Bangladesh.",
    icon: Trophy,
  },
];