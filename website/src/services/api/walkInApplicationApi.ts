import api from "@/api/axios";

import type { ApiResponse } from "@/types/api";
import type { WalkInApplicationRequest, WalkInApplicationResponse } from "@/types/walkInApplication";

export async function createWalkInApplication(
  request: WalkInApplicationRequest
): Promise<ApiResponse<number>> {
  const response = await api.post<ApiResponse<number>>(
    "/WalkInApplications",
    request
  );

  return response.data;
}

export async function getWalkInApplication(
  id: number
): Promise<ApiResponse<WalkInApplicationResponse>> {
  const response = await api.get<ApiResponse<WalkInApplicationResponse>>(
    `/WalkInApplications/${id}`
  );

  return response.data;
}