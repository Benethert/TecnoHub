import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../shared/models/product.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getProducts(search?: string): Observable<{ data: Product[] }> {
    const params: Record<string, string> = {};
    if (search) params['search'] = search;
    return this.http.get<{ data: Product[] }>(this.apiUrl, { params });
  }

  getProduct(id: number): Observable<{ data: Product }> {
    return this.http.get<{ data: Product }>(`${this.apiUrl}/${id}`);
  }
}
