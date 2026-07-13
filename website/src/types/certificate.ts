export interface CertificateResponse {
  certificateId: number;

  title: string;

  description?: string;

  image: string;

  displayOrder: number;

  isActive: boolean;
}