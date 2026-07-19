import api from "@/api/axios";

import type { ApiResponse } from "@/types/api";
import type { ContactInquiryRequest } from "@/types/contactInquiry";

export async function createContactInquiry(
  request: ContactInquiryRequest,
): Promise<ApiResponse<number>> {
  const response = await api.post<ApiResponse<number>>(
    "/ContactInquiry",
    request,
  );

  return response.data;
}