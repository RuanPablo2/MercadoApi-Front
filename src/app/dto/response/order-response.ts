export interface OrderItem {
    id: number;
    product: {
      id: number;
      name: string;
      imageUrl: string;
      price: number;
    };
    quantity: number;
    subtotal: number;
  }
  
  export interface OrderStatusHistory {
    status: string;
    timestamp: string;
  }
  
  export interface OrderResponse {
    id: number;
    trackingCode: string | null;
    status: string;
    currentStatus?: string;
    createdAt: string;
    total: number;
    items: {
      productId: number;
      quantity: number;
      productName: string;
      unitPrice: number;
      total: number;
    }[];
    statusHistory?: {
      status: string;
      changedAt: string;
    }[];
  } 