import api from "@/api/axios";
import type { ApiResponse } from "@/types/api";
import type { ContactInquiryResponse, UpdateContactInquiryStatusRequest } from "@/types/contactInquiry";

const BASE_URL = "/ContactInquiry";

export const getContactInquiries = async (): Promise<
  ApiResponse<ContactInquiryResponse[]>
> => {
  const response = await api.get<ApiResponse<ContactInquiryResponse[]>>(
    BASE_URL,
  );

  return response.data;
};

export const getContactInquiryById = async (
  inquiryId: number,
): Promise<ApiResponse<ContactInquiryResponse>> => {
  const response = await api.get<ApiResponse<ContactInquiryResponse>>(
    `${BASE_URL}/${inquiryId}`,
  );

  return response.data;
};

export const updateContactInquiryStatus = async (
  inquiryId: number,
  request: UpdateContactInquiryStatusRequest,
): Promise<ApiResponse<string>> => {
  const response = await api.put<ApiResponse<string>>(
    `${BASE_URL}/${inquiryId}/status`,
    request,
  );

  return response.data;
};

export const deleteContactInquiry = async (
  inquiryId: number,
): Promise<ApiResponse<string>> => {
  const response = await api.delete<ApiResponse<string>>(
    `${BASE_URL}/${inquiryId}`,
  );

  return response.data;
};