export interface OrderItem {
    id: string;
    product: {
      id: string;
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
    id: string;
    trackingCode: string;
    status: string;
    createdAt: string;
    total: number;
    items: OrderItem[];
    statusHistory: OrderStatusHistory[];
    deliveryAddress: {
      street: string;
      number: string;
      complement?: string;
      neighborhood: string;
      city: string;
      state: string;
      postalCode: string;
    };
  }