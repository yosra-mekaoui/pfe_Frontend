import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Backlog } from '../models/backlog.model';

@Injectable({
  providedIn: 'root'
})
export class BacklogService {
  private apiUrl = 'http://localhost:5000/api/backlogs'; // Your API URL

  constructor(private http: HttpClient) { }

  getBacklogs(): Observable<Backlog[]> {
    return this.http.get<Backlog[]>(this.apiUrl);
  }

  getBacklog(id: string): Observable<Backlog> {
    return this.http.get<Backlog>(`${this.apiUrl}/${id}`);
  }

  createBacklog(backlog: Backlog): Observable<Backlog> {
    return this.http.post<Backlog>(this.apiUrl, backlog);
  }

  updateBacklog(id: string, backlog: Backlog): Observable<Backlog> {
    return this.http.put<Backlog>(`${this.apiUrl}/${id}`, backlog);
  }

  deleteBacklog(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
