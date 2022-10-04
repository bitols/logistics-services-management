import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Senders } from '../models/senders.model';

const baseUrl = 'http://localhost:3000';


@Injectable({
  providedIn: 'root'
})
export class SendersService {
  constructor(private http: HttpClient) { }

  get(id: any): Observable<Senders> {
    return this.http.get(`${baseUrl}/senders/${id}`);
  }
}
