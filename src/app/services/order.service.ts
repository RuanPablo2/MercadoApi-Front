import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderResponse } from '../dto/response/order-response';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = '${environment.apiUrl}/api/orders';

  constructor(private http: HttpClient) {}

  getOrderById(id: string): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`${this.apiUrl}/${id}`);
  }

  cancelOrder(id: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/cancel`, {});
  }
}