import api from "@/api/axios";

import type {
  JobApplication,
  JobApplicationSearchRequest,
  JobApplicationStatusUpdateRequest,
  PagedResult,
} from "@/types/jobApplication";

import type { ApiResponse } from "@/types/api";

const BASE_URL = "/JobApplications";

export async function searchJobApplications(
  request: JobApplicationSearchRequest,
): Promise<PagedResult<JobApplication>> {
  const response = await api.get<
    ApiResponse<PagedResult<JobApplication>>
  >(BASE_URL, {
    params: request,
  });

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

export async function getJobs(): Promise<string[]> {
  const response =
    await api.get<ApiResponse<string[]>>(
      `${BASE_URL}/jobs`,
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

export async function downloadResumes(
  ids: number[],
): Promise<Blob> {
  const response = await api.post(
    `${BASE_URL}/download-resumes`,
    ids,
    {
      responseType: "blob",
    },
  );

  return response.data;
}