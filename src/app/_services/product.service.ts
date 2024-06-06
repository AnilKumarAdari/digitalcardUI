// product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/prodcuts';
import { ApiService } from './common/api-service';
const PRODUCTS_API = 'products';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private api: ApiService) {}

  getProducts(): Observable<Product[]> {
    return this.api.getData(PRODUCTS_API);
  }

  addProduct(product: Product): Observable<Product> {
    return this.api.postData(PRODUCTS_API, product);
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return this.api.updateData(PRODUCTS_API, id, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.api.deleteData(PRODUCTS_API, id);
  }
}
