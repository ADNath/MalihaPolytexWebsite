
import api from "@/api/axios";
import type { ApiResponse } from "@/types/api";
import type { CompanyVideoResponse } from "@/types/companyVideo";

export async function getCompanyVideos(): Promise<
  ApiResponse<CompanyVideoResponse[]>
> {
  const response = await api.get<ApiResponse<CompanyVideoResponse[]>>(
    "/CompanyVideos",
  );

  return response.data;
}