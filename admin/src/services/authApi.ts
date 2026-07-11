import api from "@/api/axios";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userId: number;
  username: string;
  fullName: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors: string[];
}

export async function login(request: LoginRequest) {
  const response = await api.post<ApiResponse<LoginResponse>>(
    "/auth/login",
    request
  );

  return response.data;
}