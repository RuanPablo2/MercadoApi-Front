import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartResponse } from '../dto/response/cart-response';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = '${environment.apiUrl}/api/orders';

  constructor(private http: HttpClient) {}

  getCart(): Observable<CartResponse> {
    return this.http.post<CartResponse>(this.apiUrl, {});
  }

  updateItemQuantity(productId: string, quantity: number): Observable<CartResponse> {
    return this.http.post<CartResponse>(`${this.apiUrl}/cart/items`, {
      productId,
      quantity
    });
  }

  removeItem(productId: string): Observable<CartResponse> {
    return this.http.delete<CartResponse>(`${this.apiUrl}/cart/items/${productId}`);
  }
}