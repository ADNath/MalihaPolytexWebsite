import api from "@/api/axios";
import type { ApiResponse } from "@/types/api";

export async function uploadFile(
  file: File,
  folder: string,
): Promise<ApiResponse<string>> {
  const formData = new FormData();

  formData.append("file", file);

  const { data } = await api.post<ApiResponse<string>>(
    `/files/upload?folderName=${encodeURIComponent(folder)}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return data;
}
