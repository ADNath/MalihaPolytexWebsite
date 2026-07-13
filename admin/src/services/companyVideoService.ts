import api from "@/api/axios";
import type {
  CompanyVideo,
  CompanyVideoRequest,
} from "@/types/companyVideo";
import type { ApiResponse } from "@/types/api";

const BASE_URL = "/CompanyVideos";

export async function getCompanyVideos(): Promise<CompanyVideo[]> {
  const response = await api.get<ApiResponse<CompanyVideo[]>>(BASE_URL);

  return response.data.data;
}

export async function getCompanyVideo(
  id: number
): Promise<CompanyVideo> {
  const response = await api.get<ApiResponse<CompanyVideo>>(
    `${BASE_URL}/${id}`
  );

  return response.data.data;
}

export async function createCompanyVideo(
  request: CompanyVideoRequest
): Promise<number> {
  const response = await api.post<ApiResponse<number>>(
    BASE_URL,
    request
  );

  return response.data.data;
}

export async function updateCompanyVideo(
  id: number,
  request: CompanyVideoRequest
): Promise<void> {
  await api.put(`${BASE_URL}/${id}`, request);
}

export async function deleteCompanyVideo(
  id: number
): Promise<void> {
  await api.delete(`${BASE_URL}/${id}`);
}