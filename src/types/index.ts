
export interface Category {
  id: number;
  name: string;
  image: string;
  parentId?: number;
}

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

