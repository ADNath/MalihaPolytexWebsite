export interface CompanyVideo {
  companyVideoId: number;
  title: string;
  description: string | null;
  videoUrl: string;
  videoThumbnail: string;
  displayOrder: number;
  isActive: boolean;
}

export interface CompanyVideoRequest {
  title: string;
  description: string | null;
  videoUrl: string;
  videoThumbnail: string;
  displayOrder: number;
  isActive: boolean;
}