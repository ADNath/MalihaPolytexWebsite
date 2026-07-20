import api from "@/api/axios";

import type {
  CareerApplicationStatus,
} from "@/types/jobApplication";

import type { ApiResponse } from "@/types/api";

const BASE_URL = "/CareerApplicationStatuses";

export async function getCareerApplicationStatuses(): Promise<
  CareerApplicationStatus[]
> {
  const response =
    await api.get<
      ApiResponse<CareerApplicationStatus[]>
    >(BASE_URL);

  return response.data.data;
}

export async function getCareerApplicationStatus(
  id: number,
): Promise<CareerApplicationStatus> {
  const response =
    await api.get<
      ApiResponse<CareerApplicationStatus>
    >(`${BASE_URL}/${id}`);

  return response.data.data;
}