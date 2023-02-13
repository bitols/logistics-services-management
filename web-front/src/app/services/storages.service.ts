import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { options } from '../app.module';
import { Storages } from '../models/storages.model';
import { environment } from '../../environments/environment';

const baseUrl = environment.bffAddress;

@Injectable({
  providedIn: 'root'
})
export class StoragesService {

  constructor(private http: HttpClient) { }

  getAll(senderId: any): Observable<Storages[]> {
    return this.http.get<Storages[]>(`${baseUrl}/senders/${senderId}/storages`);
  }

  getAllByName(senderId: any, name: any): Observable<Storages[]> {
    return this.http.get<Storages[]>(`${baseUrl}/senders/${senderId}/storages?name=${name}`);
  }

  get(id: any): Observable<Storages> {
    return this.http.get(`${baseUrl}/storages/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/storages`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/storages/${id}`);
  }

  getStoredProducts(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/storages/${id}/products`);
  }

  getStoragesReport(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/storages/${id}/reports`);
  }

  addStoragesProducts(id: any, data: any): Observable<any> {
    return this.http.post(`${baseUrl}/storages/${id}/products`, data)
  }

  rmvStoragesProducts(id: any, productId: any, data: any): Observable<any> {
    return this.http.delete(`${baseUrl}/storages/${id}/products/${productId}`, {body: data});
  }
}
