export interface ProductResponse {
  productId: number;
  category: string;
  name: string;
  description: string | null;
  image: string;
  denier: string | null;
  cuttingLength: string | null;
  color: string | null;
  displayOrder: number;
  isActive: boolean;
}

export interface Product {
  id: number;
  category: string;
  name: string;
  description: string | null;
  image: string;
  denier: string | null;
  cuttingLength: string | null;
  color: string | null;
}