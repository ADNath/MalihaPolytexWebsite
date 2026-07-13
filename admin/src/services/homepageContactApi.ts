import api from "@/api/axios";

import type { ApiResponse } from "@/types/api";
import type {
  HomepageContactRequest,
  HomepageContactResponse,
} from "@/types/homepageContact";

export async function getHomepageContacts() {
  const response = await api.get<ApiResponse<HomepageContactResponse[]>>(
    "/HomepageContact",
  );

  return response.data;
}

export async function getHomepageContact(id: number) {
  const response = await api.get<ApiResponse<HomepageContactResponse>>(
    `/HomepageContact/${id}`,
  );

  return response.data;
}

export async function createHomepageContact(
  request: HomepageContactRequest,
) {
  const response = await api.post<ApiResponse<number>>(
    "/HomepageContact",
    request,
  );

  return response.data;
}

export async function updateHomepageContact(
  id: number,
  request: HomepageContactRequest,
) {
  const response = await api.put<ApiResponse<string>>(
    `/HomepageContact/${id}`,
    request,
  );

  return response.data;
}

export async function deleteHomepageContact(id: number) {
  const response = await api.delete<ApiResponse<string>>(
    `/HomepageContact/${id}`,
  );

  return response.data;
}