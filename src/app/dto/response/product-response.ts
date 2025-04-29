export interface ProductResponse {
    id: number;
    name: string;
    description?: string;
    price: number;
    stockQuantity: number;
    category?: string;
    image?: string;
  }