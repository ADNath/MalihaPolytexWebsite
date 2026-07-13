import api from "./axios";
import type { ApiResponse } from "@/types/api";

export interface HeroSlideRequest {
  title: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  desktopImage: string;
  mobileImage?: string;
  displayOrder: number;
  isActive: boolean;
}

export interface HeroSlideResponse {
  heroSlideId: number;
  title: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  desktopImage: string;
  mobileImage?: string;
  displayOrder: number;
  isActive: boolean;
}

export async function getHeroSlides() {
  const response =
    await api.get<ApiResponse<HeroSlideResponse[]>>("/HeroSlides");

  return response.data;
}

export async function getHeroSlide(id: number) {
  const response = await api.get<ApiResponse<HeroSlideResponse>>(
    `/HeroSlides/${id}`,
  );

  return response.data;
}

export async function createHeroSlide(request: HeroSlideRequest) {
  const response = await api.post<ApiResponse<number>>("/HeroSlides", request);

  return response.data;
}

export async function updateHeroSlide(id: number, request: HeroSlideRequest) {
  const response = await api.put<ApiResponse<object>>(
    `/HeroSlides/${id}`,
    request,
  );

  return response.data;
}

export async function deleteHeroSlide(id: number) {
  const response = await api.delete<ApiResponse<object>>(`/HeroSlides/${id}`);

  return response.data;
}
export function toHeroSlideRequest(
  heroSlide: HeroSlideResponse,
): HeroSlideRequest {
  return {
    title: heroSlide.title,
    subtitle: heroSlide.subtitle,
    description: heroSlide.description,
    buttonText: heroSlide.buttonText,
    buttonUrl: heroSlide.buttonUrl,
    desktopImage: heroSlide.desktopImage,
    mobileImage: heroSlide.mobileImage,
    displayOrder: heroSlide.displayOrder,
    isActive: heroSlide.isActive,
  };
}

export async function uploadImage(file: File, folderName: string) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post<ApiResponse<string>>(
    `/files/upload?folderName=${folderName}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
}
