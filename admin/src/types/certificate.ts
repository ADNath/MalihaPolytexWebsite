export interface Certificate {
  certificateId: number;
  title: string;
  description: string | null;
  image: string;
  displayOrder: number;
  isActive: boolean;
}

export interface CertificateRequest {
  title: string;
  description: string | null;
  image: string;
  displayOrder: number;
  isActive: boolean;
}