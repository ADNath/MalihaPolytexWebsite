import api from "@/api/axios";

import type {
  Certificate,
  CertificateRequest,
} from "@/types/certificate";

import type { ApiResponse } from "@/types/api";

const BASE_URL = "/Certificates";

export async function getCertificates(): Promise<Certificate[]> {
  const response =
    await api.get<ApiResponse<Certificate[]>>(BASE_URL);

  return response.data.data;
}

export async function getCertificate(
  id: number,
): Promise<Certificate> {
  const response =
    await api.get<ApiResponse<Certificate>>(
      `${BASE_URL}/${id}`,
    );

  return response.data.data;
}

export async function createCertificate(
  request: CertificateRequest,
): Promise<number> {
  const response =
    await api.post<ApiResponse<number>>(
      BASE_URL,
      request,
    );

  return response.data.data;
}

export async function updateCertificate(
  id: number,
  request: CertificateRequest,
): Promise<void> {
  await api.put(`${BASE_URL}/${id}`, request);
}

export async function deleteCertificate(
  id: number,
): Promise<void> {
  await api.delete(`${BASE_URL}/${id}`);
}