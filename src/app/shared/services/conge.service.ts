import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conge } from '../models/conge.model';

@Injectable({
  providedIn: 'root'
})
export class CongeService {
  private apiUrl = 'http://localhost:5000/api/conges'; // Changez l'URL si nécessaire

  constructor(private http: HttpClient) {}

  getConges(): Observable<Conge[]> {
    return this.http.get<Conge[]>(this.apiUrl);
  }

  getCongeById(id: string): Observable<Conge> {
    return this.http.get<Conge>(`${this.apiUrl}/${id}`);
  }

  createConge(conge: Conge): Observable<Conge> {
    const formData = new FormData();
    formData.append('StartDate', conge.StartDate.toISOString());
    formData.append('EndDate', conge.EndDate.toISOString());
    formData.append('Type', conge.Type);
    formData.append('Status', conge.Status);
    formData.append('File', conge.File);
    return this.http.post<Conge>(this.apiUrl, formData);

  }

  updateConge(id: string, conge: Conge): Observable<Conge> {
    const formData = new FormData();
    formData.append('StartDate', conge.StartDate.toISOString());
    formData.append('EndDate', conge.EndDate.toISOString());
    formData.append('Type', conge.Type);
    formData.append('Status', conge.Status);
    formData.append('File', conge.File);
    return this.http.put<Conge>(`${this.apiUrl}/${id}`, formData);
  }
  deleteConge(id: string): Observable<Conge> {
    return this.http.delete<Conge>(`${this.apiUrl}/${id}`);
  }
}
