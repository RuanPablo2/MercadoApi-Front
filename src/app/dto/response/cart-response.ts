export interface CartItem {
  productId: number;
  productName: string;
  unitPrice: number;
  quantity: number;
  total: number;
}

export interface CartResponse {
  id: number;
  userEmail: string;
  createdAt: string;
  status: string;
  trackingCode: string | null;
  total: number;
  items: CartItem[];
  statusHistory: {
    status: string;
    changedAt: string;
  }[];
}