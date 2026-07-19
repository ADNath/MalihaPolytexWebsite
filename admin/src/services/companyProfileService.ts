import api from "@/api/axios";

import type { ApiResponse } from "@/types/api";
import type {
  CompanyProfile,
  CompanyProfileRequest,
} from "@/types/companyProfile";

export async function getCompanyProfiles(): Promise<CompanyProfile[]> {
  const response = await api.get<ApiResponse<CompanyProfile[]>>(
    "/CompanyProfiles",
  );

  return response.data.data;
}

export async function getCompanyProfile(
  id: number,
): Promise<CompanyProfile> {
  const response = await api.get<ApiResponse<CompanyProfile>>(
    `/CompanyProfiles/${id}`,
  );

  return response.data.data;
}

export async function createCompanyProfile(
  request: CompanyProfileRequest,
): Promise<number> {
  const response = await api.post<ApiResponse<number>>(
    "/CompanyProfiles",
    request,
  );

  return response.data.data;
}

export async function updateCompanyProfile(
  id: number,
  request: CompanyProfileRequest,
): Promise<void> {
  await api.put(`/CompanyProfiles/${id}`, request);
}

export async function deleteCompanyProfile(
  id: number,
): Promise<void> {
  await api.delete(`/CompanyProfiles/${id}`);
}