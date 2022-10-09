import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Suppliers } from '../models/suppliers.model';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Suppliers[]> {
    return this.http.get<Suppliers[]>(`${baseUrl}/suppliers`);
  }

  getAllByName(name: any): Observable<Suppliers[]> {
    return this.http.get<Suppliers[]>(`${baseUrl}/suppliers?name=${name}`);
  }

  get(id: any): Observable<Suppliers> {
    return this.http.get(`${baseUrl}/suppliers/${id}`);
  }
}
