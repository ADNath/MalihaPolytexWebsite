import api from "@/api/axios";

import type {
  Product,
  ProductRequest,
} from "@/types/product";

import type { ApiResponse } from "@/types/api";

const BASE_URL = "/Products";

export async function getProducts(): Promise<Product[]> {
  const response =
    await api.get<ApiResponse<Product[]>>(BASE_URL);

  return response.data.data;
}

export async function getProductsByCategory(
  category: string,
): Promise<Product[]> {
  const response =
    await api.get<ApiResponse<Product[]>>(
      `${BASE_URL}/category/${category}`,
    );

  return response.data.data;
}

export async function getProduct(
  id: number,
): Promise<Product> {
  const response =
    await api.get<ApiResponse<Product>>(
      `${BASE_URL}/${id}`,
    );

  return response.data.data;
}

export async function createProduct(
  request: ProductRequest,
): Promise<number> {
  const response =
    await api.post<ApiResponse<number>>(
      BASE_URL,
      request,
    );

  return response.data.data;
}

export async function updateProduct(
  id: number,
  request: ProductRequest,
): Promise<void> {
  await api.put(
    `${BASE_URL}/${id}`,
    request,
  );
}

export async function deleteProduct(
  id: number,
): Promise<void> {
  await api.delete(
    `${BASE_URL}/${id}`,
  );
}