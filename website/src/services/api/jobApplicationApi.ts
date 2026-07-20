import api from "@/api/axios";

import type { ApiResponse } from "@/types/api";
import type {
  JobApplicationRequest,
  JobApplicationResponse,
} from "@/types/jobApplication";

export async function createJobApplication(
  request: JobApplicationRequest
): Promise<ApiResponse<number>> {
  const response = await api.post<ApiResponse<number>>(
    "/JobApplications",
    request
  );

  return response.data;
}

export async function getJobApplication(
  id: number
): Promise<ApiResponse<JobApplicationResponse>> {
  const response = await api.get<ApiResponse<JobApplicationResponse>>(
    `/JobApplications/${id}`
  );

  return response.data;
}