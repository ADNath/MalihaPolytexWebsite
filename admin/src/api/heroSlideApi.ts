import api from "./axios";

export interface HeroSlide {
  heroSlideId: number;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  desktopImage: string;
  mobileImage: string;
  displayOrder: number;
  isActive: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors: string[];
}

export async function getHeroSlides() {
  const response =
    await api.get<ApiResponse<HeroSlide[]>>("/HeroSlides");

  return response.data;
}

export async function getHeroSlide(id: number) {
  const response =
    await api.get<ApiResponse<HeroSlide>>(`/HeroSlides/${id}`);

  return response.data;
}

export async function createHeroSlide(heroSlide: HeroSlide) {
  const response =
    await api.post<ApiResponse<number>>(
      "/HeroSlides",
      heroSlide
    );

  return response.data;
}

export async function updateHeroSlide(heroSlide: HeroSlide) {
  const response =
    await api.put<ApiResponse<object>>(
      `/HeroSlides/${heroSlide.heroSlideId}`,
      heroSlide
    );

  return response.data;
}

export async function deleteHeroSlide(id: number) {
  const response =
    await api.delete<ApiResponse<object>>(
      `/HeroSlides/${id}`
    );

  return response.data;
}