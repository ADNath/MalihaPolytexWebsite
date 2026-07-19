import api from "@/api/axios";

import type { ApiResponse } from "@/types/api";
import type { CreateGeneralCertificateRequest, GeneralCertificateResponse, UpdateGeneralCertificateRequest } from "@/types/generalCertificate";

export async function getGeneralCertificates(): Promise<
  ApiResponse<GeneralCertificateResponse[]>
> {
  const response = await api.get<
    ApiResponse<GeneralCertificateResponse[]>
  >("/GeneralCertificates");

  return response.data;
}

export async function getGeneralCertificate(
  id: number,
): Promise<ApiResponse<GeneralCertificateResponse>> {
  const response = await api.get<
    ApiResponse<GeneralCertificateResponse>
  >(`/GeneralCertificates/${id}`);

  return response.data;
}

export async function createGeneralCertificate(
  request: CreateGeneralCertificateRequest,
): Promise<ApiResponse<number>> {
  const formData = new FormData();

  formData.append("title", request.title);
  formData.append("description", request.description ?? "");
  formData.append(
    "displayOrder",
    request.displayOrder.toString(),
  );
  formData.append(
    "isActive",
    request.isActive.toString(),
  );

  if (request.image) {
    formData.append("image", request.image);
  }

  const response = await api.post<ApiResponse<number>>(
    "/GeneralCertificates",
    formData,
  );

  return response.data;
}

export async function updateGeneralCertificate(
  id: number,
  request: UpdateGeneralCertificateRequest,
): Promise<ApiResponse<boolean>> {
  const formData = new FormData();

  formData.append(
    "generalCertificateId",
    id.toString(),
  );
  formData.append("title", request.title);
  formData.append("description", request.description ?? "");
  formData.append(
    "displayOrder",
    request.displayOrder.toString(),
  );
  formData.append(
    "isActive",
    request.isActive.toString(),
  );
  formData.append(
    "existingImage",
    request.existingImage ?? "",
  );

  if (request.image) {
    formData.append("image", request.image);
  }

  const response = await api.put<ApiResponse<boolean>>(
    `/GeneralCertificates/${id}`,
    formData,
  );

  return response.data;
}

export async function deleteGeneralCertificate(
  id: number,
): Promise<ApiResponse<boolean>> {
  const response = await api.delete<
    ApiResponse<boolean>
  >(`/GeneralCertificates/${id}`);

  return response.data;
}