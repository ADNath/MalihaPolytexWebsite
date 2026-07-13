
import api from "@/api/axios";
import type { ApiResponse } from "@/types/api";
import type { HomepageContactResponse } from "@/types/homepageContact";

export async function getHomepageContacts(): Promise<
  ApiResponse<HomepageContactResponse[]>
> {
  const response =
    await api.get<ApiResponse<HomepageContactResponse[]>>(
      "/HomepageContact",
    );

  return response.data;
}