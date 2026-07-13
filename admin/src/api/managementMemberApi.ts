

import api from "./axios";

import type { ApiResponse } from "@/types/api";

export interface ManagementMemberRequest {
  name: string;
  designation: string;
  imageUrl: string;
  message: string;
  displayOrder: number;
  isActive: boolean;
}

export interface ManagementMemberResponse {
  id: number;
  name: string;
  designation: string;
  imageUrl: string;
  message: string;
  displayOrder: number;
  isActive: boolean;
}

export async function getManagementMembers() {
  const response =
    await api.get<ApiResponse<ManagementMemberResponse[]>>(
      "/ManagementMembers",
    );

  return response.data;
}

export async function getManagementMember(id: number) {
  const response =
    await api.get<ApiResponse<ManagementMemberResponse>>(
      `/ManagementMembers/${id}`,
    );

  return response.data;
}

export async function createManagementMember(
  request: ManagementMemberRequest,
) {
  const response =
    await api.post<ApiResponse<number>>(
      "/ManagementMembers",
      request,
    );

  return response.data;
}

export async function updateManagementMember(
  id: number,
  request: ManagementMemberRequest,
) {
  const response =
    await api.put<ApiResponse<object>>(
      `/ManagementMembers/${id}`,
      request,
    );

  return response.data;
}

export async function deleteManagementMember(id: number) {
  const response =
    await api.delete<ApiResponse<object>>(
      `/ManagementMembers/${id}`,
    );

  return response.data;
}

export function toManagementMemberRequest(
  member: ManagementMemberResponse,
): ManagementMemberRequest {
  return {
    name: member.name,
    designation: member.designation,
    imageUrl: member.imageUrl,
    message: member.message,
    displayOrder: member.displayOrder,
    isActive: member.isActive,
  };
}

export async function uploadImage(
  file: File,
  folderName: string,
) {
  const formData = new FormData();

  formData.append("file", file);

  const response =
    await api.post<ApiResponse<string>>(
      `/files/upload?folderName=${folderName}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

  return response.data;
}