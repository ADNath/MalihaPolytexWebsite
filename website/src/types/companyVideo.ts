export interface CompanyVideoResponse {
  companyVideoId: number;
  title: string;
  description?: string;
  videoUrl: string;
  videoThumbnail: string;
  displayOrder: number;
  isActive: boolean;
}