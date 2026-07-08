export interface ProductFilterGroup {
  key: string;
  label: string;
  options: string[];
}

export interface ProductCategory {
  id: string;
  name: string;
  filters: ProductFilterGroup[];
}

export interface Product {
  id: number;
  category: string;
  name: string;
  image: string;

  denier?: string;
  cuttingLength?: string;
  color?: string;

  [key: string]: string | number | undefined;
}