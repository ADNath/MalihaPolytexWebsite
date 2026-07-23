import api from "@/api/axios";

import type {
  WalkInApplication,
  WalkInApplicationRequest,
  WalkInApplicationStatusUpdateRequest,
  WalkInApplicationSearchRequest,
  PagedResult,
} from "@/types/walkInApplication";

import type { ApiResponse } from "@/types/api";

const BASE_URL = "/WalkInApplications";

export async function searchWalkInApplications(
  request: WalkInApplicationSearchRequest,
): Promise<PagedResult<WalkInApplication>> {
  const response = await api.get<ApiResponse<PagedResult<WalkInApplication>>>(
    BASE_URL,
    {
      params: request,
    },
  );

  return response.data.data;
}

export async function getDesignations(): Promise<string[]> {
  const response = await api.get<ApiResponse<string[]>>(
    `${BASE_URL}/designations`,
  );

  return response.data.data;
}

export async function getWalkInApplication(
  id: number,
): Promise<WalkInApplication> {
  const response = await api.get<ApiResponse<WalkInApplication>>(
    `${BASE_URL}/${id}`,
  );

  return response.data.data;
}

export async function createWalkInApplication(
  request: WalkInApplicationRequest,
): Promise<void> {
  await api.post(BASE_URL, request);
}

export async function updateWalkInApplicationStatus(
  id: number,
  request: WalkInApplicationStatusUpdateRequest,
): Promise<void> {
  await api.put(`${BASE_URL}/${id}/status`, request);
}

export async function deleteWalkInApplication(id: number): Promise<void> {
  await api.delete(`${BASE_URL}/${id}`);
}

export async function downloadResumes(
  walkInApplicationIds: number[],
): Promise<Blob> {
  const response = await api.post(
    `${BASE_URL}/download-resumes`,
    { walkInApplicationIds },
    {
      responseType: "blob",
    },
  );

  return response.data;
}
