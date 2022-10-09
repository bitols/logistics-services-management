import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Storages } from '../models/storages.model';

const baseUrl = 'http://localhost:3000';

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
}