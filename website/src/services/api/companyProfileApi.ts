import api from "@/api/axios";
import type { ApiResponse } from "@/types/api";
import type { CompanyProfileResponse } from "@/types/companyProfile";

export async function getCompanyProfile(): Promise<
  ApiResponse<CompanyProfileResponse>
> {
  const response = await api.get<ApiResponse<CompanyProfileResponse>>(
    "/CompanyProfiles",
  );

  return response.data;
}