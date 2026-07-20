import api from "@/api/axios";

import type {
  JobOpening,
  JobOpeningRequest,
} from "@/types/jobOpening";

import type { ApiResponse } from "@/types/api";

const BASE_URL = "/JobOpenings";

export async function getJobOpenings(): Promise<
  JobOpening[]
> {
  const response =
    await api.get<ApiResponse<JobOpening[]>>(
      BASE_URL,
    );

  return response.data.data;
}

export async function getJobOpening(
  id: number,
): Promise<JobOpening> {
  const response =
    await api.get<ApiResponse<JobOpening>>(
      `${BASE_URL}/${id}`,
    );

  return response.data.data;
}

export async function createJobOpening(
  request: JobOpeningRequest,
): Promise<number> {
  const response =
    await api.post<ApiResponse<number>>(
      BASE_URL,
      request,
    );

  return response.data.data;
}

export async function updateJobOpening(
  id: number,
  request: JobOpeningRequest,
): Promise<void> {
  await api.put(
    `${BASE_URL}/${id}`,
    request,
  );
}

export async function deleteJobOpening(
  id: number,
): Promise<void> {
  await api.delete(
    `${BASE_URL}/${id}`,
  );
}