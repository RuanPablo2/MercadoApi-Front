import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartResponse } from '../dto/response/cart-response';
import { environment } from '../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  getCart(): Observable<CartResponse> {
    return this.http.post<CartResponse>(this.apiUrl, {}, { withCredentials: true });
  }

  addItemToCart(orderId: number, itemRequest: { productId: number; quantity: number }): Observable<CartResponse> {
    return this.http.post<CartResponse>(`${this.apiUrl}/${orderId}/items`, itemRequest, { withCredentials: true });
  }

  decreaseItemQuantity(orderId: number, itemId: number, quantity: number): Observable<CartResponse> {
    return this.http.patch<CartResponse>(
      `${this.apiUrl}/${orderId}/items/${itemId}/decrease?quantity=${quantity}`,
      {},
      { withCredentials: true }
    );
  }

  removeItem(orderId: number, itemId: number): Observable<CartResponse> {
    return this.http.delete<CartResponse>(`${this.apiUrl}/${orderId}/items/${itemId}`, { withCredentials: true });
  }

  checkout(orderId: number): Observable<CartResponse> {
    return this.http.put<CartResponse>(`${this.apiUrl}/${orderId}/checkout`, {}, { withCredentials: true });
  }
}