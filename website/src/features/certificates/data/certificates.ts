export interface Certificate {
  id: number;
  title: string;
  description: string;
  image: string;
}

export const certificates: Certificate[] = [
  {
    id: 1,
    title: "GRS Scope Certificate",
    description: "Certificate Overview",
    image: "/images/certificates/certificate-1.jpg",
  },
  {
    id: 2,
    title: "Products Appendix",
    description: "Certified Product Categories",
    image: "/images/certificates/certificate-2.jpg",
  },
  {
    id: 3,
    title: "Site Appendix",
    description: "Certified Facility Information",
    image: "/images/certificates/certificate-3.jpg",
  },
];