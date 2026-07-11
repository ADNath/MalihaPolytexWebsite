import { getHeroSlides, type HeroSlide } from "@/api/heroSlideApi";
import { useEffect, useState } from "react";

export default function HeroSlidesPage() {
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function loadHeroSlides() {
      try {
        const response = await getHeroSlides();

        if (isMounted && response.success) {
          setHeroSlides(response.data);
        }
      } catch (error) {
        console.error("Failed to load hero slides.", error);
      }
    }

    void loadHeroSlides();

    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Order</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {heroSlides.map((slide) => (
            <tr key={slide.heroSlideId} className="border-t">
              <td className="px-4 py-3">{slide.title}</td>
              <td className="px-4 py-3">{slide.displayOrder}</td>
              <td className="px-4 py-3">
                {slide.isActive ? "Active" : "Inactive"}
              </td>
              <td className="px-4 py-3">Edit | Delete</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
