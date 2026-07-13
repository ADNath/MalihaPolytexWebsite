import api from "./axios";
import type { ApiResponse } from "@/types/api";

export interface WhatWeDoItemRequest {
  title: string;
  description: string;
  icon: string;
  displayOrder: number;
  isActive: boolean;
}

export interface WhatWeDoItemResponse {
  whatWeDoItemId: number;
  title: string;
  description: string;
  icon: string;
  displayOrder: number;
  isActive: boolean;
}

export async function getWhatWeDoItems() {
  const response =
    await api.get<ApiResponse<WhatWeDoItemResponse[]>>("/WhatWeDoItems");

  return response.data;
}

export async function getWhatWeDoItem(id: number) {
  const response =
    await api.get<ApiResponse<WhatWeDoItemResponse>>(
      `/WhatWeDoItems/${id}`,
    );

  return response.data;
}

export async function createWhatWeDoItem(
  request: WhatWeDoItemRequest,
) {
  const response =
    await api.post<ApiResponse<number>>(
      "/WhatWeDoItems",
      request,
    );

  return response.data;
}

export async function updateWhatWeDoItem(
  id: number,
  request: WhatWeDoItemRequest,
) {
  const response =
    await api.put<ApiResponse<object>>(
      `/WhatWeDoItems/${id}`,
      request,
    );

  return response.data;
}

export async function deleteWhatWeDoItem(id: number) {
  const response =
    await api.delete<ApiResponse<object>>(
      `/WhatWeDoItems/${id}`,
    );

  return response.data;
}

export function toWhatWeDoItemRequest(
  item: WhatWeDoItemResponse,
): WhatWeDoItemRequest {
  return {
    title: item.title,
    description: item.description,
    icon: item.icon,
    displayOrder: item.displayOrder,
    isActive: item.isActive,
  };
}