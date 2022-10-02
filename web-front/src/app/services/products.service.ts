import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from '../models/products.model';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAll(senderId: any): Observable<Products[]> {
    return this.http.get<Products[]>(`${baseUrl}/senders/${senderId}/products`);
  }

  get(id: any): Observable<Products> {
    return this.http.get(`${baseUrl}/products${id}`);
  }

  create(data: any): Observable<any> {
    console.log(data);
    return this.http.post(`${baseUrl}/products`, data);
  }
}
