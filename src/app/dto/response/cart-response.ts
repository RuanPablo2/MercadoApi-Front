export interface CartItem {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
  };
  quantity: number;
  subtotal: number;
}
  
  export interface CartResponse {
    id: string;
    items: CartItem[];
    total: number;
  }