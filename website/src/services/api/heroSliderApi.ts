import api from "@/api/axios";
import type { ApiResponse } from "@/types/api";
import type { HeroSlideResponse } from "@/types/heroSlide";

export async function getHeroSlides(): Promise<
  ApiResponse<HeroSlideResponse[]>
> {
  const response = await api.get<ApiResponse<HeroSlideResponse[]>>(
    "/HeroSlides",
  );

  return response.data;
}