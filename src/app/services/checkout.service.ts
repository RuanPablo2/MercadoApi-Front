import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/environment';
import { CartResponse } from '../dto/response/cart-response';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private apiUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  getCheckoutInfo(): Observable<CartResponse> {
    return this.http.post<CartResponse>(this.apiUrl, {}, { withCredentials: true });
  }

  completeOrder(payload: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${payload.orderId}/checkout`, payload, { withCredentials: true });
  }
}