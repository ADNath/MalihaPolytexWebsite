export interface CompanyProfile {
  companyProfileId: number;
  title: string;
  description: string;
  pdfUrl: string;
  updatedAt: string;
  isActive: boolean;
}

export interface CompanyProfileRequest {
  title: string;
  description: string;
  pdfUrl: string;
  isActive: boolean;
}