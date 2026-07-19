export interface Product {
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

export interface ProductRequest {
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