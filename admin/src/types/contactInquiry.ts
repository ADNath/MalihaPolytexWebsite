export interface ContactInquiryResponse {
  inquiryId: number;

  name: string;

  company: string | null;

  email: string;

  phone: string | null;

  subject: string | null;

  message: string;

  status: string;

  createdAt: string;

  updatedAt: string | null;
}

export interface UpdateContactInquiryStatusRequest {
  status: string;
}