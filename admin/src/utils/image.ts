import { API_BASE_URL } from "@/config/app";

export function getImageUrl(path?: string | null): string {
  if (!path) return "";

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // Remove leading slash
  path = path.replace(/^\/+/, "");

  const base = API_BASE_URL.replace(/\/+$/, "");
  const cleanPath = path.replace(/^\/+/, "");
console.log(base,cleanPath);

  return `${base}/${cleanPath}`;

  
}