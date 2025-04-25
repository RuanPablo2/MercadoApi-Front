import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private apiUrl = '${environment.apiUrl}/orders';

  constructor(private http: HttpClient) {}

  getCheckoutInfo(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/cart`, { withCredentials: true });
  }

  completeOrder(payload: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${payload.orderId}/checkout`, payload, { withCredentials: true });
  }
}