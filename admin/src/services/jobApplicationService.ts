import api from "@/api/axios";

import type {
  JobApplication,
  JobApplicationStatusUpdateRequest,
} from "@/types/jobApplication";

import type { ApiResponse } from "@/types/api";

const BASE_URL = "/JobApplications";

export async function getJobApplications(): Promise<JobApplication[]> {
  const response =
    await api.get<ApiResponse<JobApplication[]>>(BASE_URL);

  return response.data.data;
}

export async function getJobApplication(
  id: number,
): Promise<JobApplication> {
  const response =
    await api.get<ApiResponse<JobApplication>>(
      `${BASE_URL}/${id}`,
    );

  return response.data.data;
}

export async function updateJobApplicationStatus(
  id: number,
  request: JobApplicationStatusUpdateRequest,
): Promise<void> {
  await api.put(
    `${BASE_URL}/${id}/status`,
    request,
  );
}

export async function deleteJobApplication(
  id: number,
): Promise<void> {
  await api.delete(`${BASE_URL}/${id}`);
}