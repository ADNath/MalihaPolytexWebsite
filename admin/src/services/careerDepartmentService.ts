import api from "@/api/axios";

import type {
  CareerDepartment,
  CareerDepartmentRequest,
} from "@/types/careerDepartment";

import type { ApiResponse } from "@/types/api";

const BASE_URL = "/CareerDepartments";

export async function getCareerDepartments(): Promise<
  CareerDepartment[]
> {
  const response =
    await api.get<
      ApiResponse<CareerDepartment[]>
    >(BASE_URL);

  return response.data.data;
}

export async function getCareerDepartment(
  id: number,
): Promise<CareerDepartment> {
  const response =
    await api.get<
      ApiResponse<CareerDepartment>
    >(`${BASE_URL}/${id}`);

  return response.data.data;
}

export async function createCareerDepartment(
  request: CareerDepartmentRequest,
): Promise<number> {
  const response =
    await api.post<ApiResponse<number>>(
      BASE_URL,
      request,
    );

  return response.data.data;
}

export async function updateCareerDepartment(
  id: number,
  request: CareerDepartmentRequest,
): Promise<void> {
  await api.put(
    `${BASE_URL}/${id}`,
    request,
  );
}

export async function deleteCareerDepartment(
  id: number,
): Promise<void> {
  await api.delete(`${BASE_URL}/${id}`);
}