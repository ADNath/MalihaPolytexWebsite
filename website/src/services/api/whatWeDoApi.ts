import api from "@/api/axios";
import type { ApiResponse } from "@/types/api";
import type { WhatWeDoItemResponse } from "@/types/whatWeDo";

export async function getWhatWeDoItems(): Promise<
  ApiResponse<WhatWeDoItemResponse[]>
> {
  const response =
    await api.get<ApiResponse<WhatWeDoItemResponse[]>>("/WhatWeDoItems");

  return response.data;
}
