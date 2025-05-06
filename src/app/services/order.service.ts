import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderResponse } from '../dto/response/order-response';
import { environment } from '../../enviroments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  getOrderById(id: number): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  getAllOrders(): Observable<OrderResponse[]> {
    return this.http.get<{ content: OrderResponse[] }>(`${this.apiUrl}/my-orders`, { withCredentials: true })
      .pipe(map(response => response.content));
  }

  cancelOrder(id: number): Observable<OrderResponse> {
    return this.http.put<OrderResponse>(`${this.apiUrl}/${id}/cancel`, {}, { withCredentials: true });
  }
}