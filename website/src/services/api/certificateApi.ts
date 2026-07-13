
import api from "@/api/axios";
import type { ApiResponse } from "@/types/api";
import type { CertificateResponse } from "@/types/certificate";

export async function getCertificates(): Promise<
  ApiResponse<CertificateResponse[]>
> {
  const response = await api.get<ApiResponse<CertificateResponse[]>>(
    "/Certificates",
  );

  return response.data;
}