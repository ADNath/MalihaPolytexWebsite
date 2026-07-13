import { useEffect, useState } from "react";

import {
  Award,
  BadgeCheck,
  Boxes,
  Building2,
  Cog,
  Factory,
  Globe2,
  Leaf,
  Package,
  Recycle,
  ShieldCheck,
  Star,
  Target,
  Trophy,
  Truck,
  Users,
  type LucideIcon,
} from "lucide-react";

import Container from "@/components/ui/Container";

import { getWhatWeDoItems } from "@/services/api/whatWeDoApi";
import type { WhatWeDoItemResponse } from "@/types/whatWeDo";

import WhatWeDoCard from "./WhatWeDoCard";

const iconMap: Record<string, LucideIcon> = {
  Users,
  Cog,
  Trophy,
  Factory,
  Award,
  Recycle,
  Globe2,
  Leaf,
  ShieldCheck,
  Boxes,
  Building2,
  Truck,
  Package,
  BadgeCheck,
  Target,
  Star,
};

export default function WhatWeDo() {
  const [items, setItems] = useState<WhatWeDoItemResponse[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadItems() {
    try {
      setLoading(true);

      const response = await getWhatWeDoItems();

      if (response.success) {
        setItems(
          response.data
            .filter((x) => x.isActive)
            .sort((a, b) => a.displayOrder - b.displayOrder),
        );
      }
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    void loadItems();
  }, []);

  if (loading) {
    return null;
  }

  if (items.length === 0) {
    return null;
  }

  const data = items.map((item) => ({
    id: item.whatWeDoItemId,
    title: item.title,
    description: item.description,
    icon: iconMap[item.icon] ?? Users,
  }));

  return (
    <section className="relative z-10 -mt-12 pb-10 lg:pb-10">
      <Container>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {data.map((item) => (
            <WhatWeDoCard key={item.id} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
