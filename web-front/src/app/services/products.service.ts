import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from '../models/products.model';
import { SessionsService } from './sessions.service';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient, private sessionsService: SessionsService) { }

  getAll(senderId: any): Observable<Products[]> {
    return this.http.get<Products[]>(`${baseUrl}/senders/${senderId}/products`);
  }

  get(id: any): Observable<Products> {
    return this.http.get(`${baseUrl}/products${id}`);
  }

  create(data: any): Observable<any> {
    const user = this.sessionsService.getUser();
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${user.token}`})
    };
    return this.http.post(`${baseUrl}/products`, data, httpOptions);
  }
}
