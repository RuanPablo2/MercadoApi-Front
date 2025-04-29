import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/environment';
import { ProductResponse } from '../dto/response/product-response';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getAllProducts(page = 0, size = 20): Observable<{ content: ProductResponse[] }> {
    return this.http.get<{ content: ProductResponse[] }>(`${this.apiUrl}?page=${page}&size=${size}`, { withCredentials: true });
  }

  getProductById(id: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}