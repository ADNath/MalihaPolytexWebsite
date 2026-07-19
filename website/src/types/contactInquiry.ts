export interface ContactInquiryRequest {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}