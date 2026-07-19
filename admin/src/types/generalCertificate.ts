export interface GeneralCertificateResponse {
  generalCertificateId: number;
  title: string;
  description: string | null;
  image: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  createdBy: string | null;
  updatedAt: string | null;
  updatedBy: string | null;
}

export interface CreateGeneralCertificateRequest {
  title: string;
  description: string | null;
  image: string | null;
  displayOrder: number;
  isActive: boolean;
}

export interface UpdateGeneralCertificateRequest {
  generalCertificateId: number;
  title: string;
  description: string | null;
  image: string | null;
  existingImage: string | null;
  displayOrder: number;
  isActive: boolean;
}