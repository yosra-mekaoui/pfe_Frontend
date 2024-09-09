// src/app/linkedin.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinkedInService {
  private apiUrl = 'http://localhost:5000/api/search'; // Remplace par l'URL de ton API

  constructor(private http: HttpClient) {}

  searchLinkedIn(searchTerm: string, page: number): Observable<any> {
    return this.http.post<any>(this.apiUrl, { searchTerm, page });
  }
}
