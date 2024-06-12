import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Teletravail } from '../models/teletravail.model';

@Injectable({
  providedIn: 'root'
})
export class TeletravailService {
  private apiUrl = 'http://localhost:5000/api/teletravails'; // Changez l'URL si nécessaire

  constructor(private http: HttpClient) {}

  getTeletravails(): Observable<Teletravail[]> {
    return this.http.get<Teletravail[]>(this.apiUrl);
  }

  createTeletravail(data: Teletravail): Observable<Teletravail> {
    return this.http.post<Teletravail>(this.apiUrl, data);
  }
}
