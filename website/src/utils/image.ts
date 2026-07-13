export function getImageUrl(image?: string | null) {
  if (!image) return "";

  if (image.startsWith("http")) {
    return image;
  }

  const baseUrl = import.meta.env.VITE_API_URL.replace("/api", "");

  return `${baseUrl}${image}`;
}