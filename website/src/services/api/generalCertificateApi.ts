import api from "@/api/axios";

import type { ApiResponse } from "@/types/api";
import type { GeneralCertificates } from "@/types/generalCertificates";

export async function getGeneralCertificates(): Promise<
  ApiResponse<GeneralCertificates[]>
> {
  const response = await api.get<
    ApiResponse<GeneralCertificates[]>
  >("/GeneralCertificates");

  return response.data;
}