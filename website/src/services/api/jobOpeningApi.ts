import api from "@/api/axios";

import type { ApiResponse } from "@/types/api";
import type { JobOpening } from "@/types/jobOpening";

export async function getJobOpenings(): Promise<ApiResponse<JobOpening[]>> {
  const response = await api.get<ApiResponse<JobOpening[]>>("/JobOpenings");

  return response.data;
}

export async function getJobOpening(
  jobId: number
): Promise<ApiResponse<JobOpening>> {
  const response = await api.get<ApiResponse<JobOpening>>(
    `/JobOpenings/${jobId}`
  );

  return response.data;
}