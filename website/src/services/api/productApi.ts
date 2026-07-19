import api from "@/api/axios";
import type { ApiResponse } from "@/types/api";
import type { ProductResponse } from "@/types/product";

export async function getProducts(): Promise<
  ApiResponse<ProductResponse[]>
> {
  const response = await api.get<ApiResponse<ProductResponse[]>>(
    "/Products",
  );

  return response.data;
}