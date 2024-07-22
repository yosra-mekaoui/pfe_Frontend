import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Teletravail } from '../models/teletravail.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TeletravailService {
  private apiUrl = 'http://localhost:5000/api/teletravails'; // Changez l'URL si nécessaire
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient, private authService: AuthService) {}
  private getHeaders(): HttpHeaders {
    const token = this.authService.getAccessToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getTeletravails(): Observable<Teletravail[]> {
    return this.http.get<Teletravail[]>(this.apiUrl);
  }

  createTeletravail(data: Teletravail): Observable<Teletravail> {
    const formData = new FormData();
    formData.append('StartDate', data.StartDate.toISOString());
    formData.append('EndDate', data.EndDate.toISOString());
    formData.append('Reason', data.Reason); 
    return this.http.post<Teletravail>(this.apiUrl, formData);
  }
  getTeletravailsByUserId(userId: string): Observable<Teletravail[]> {
    return this.http.get<Teletravail[]>(`${this.apiUrl}/user/${userId}`, { headers: this.getHeaders() });
  }
  updateTeletravail(id: string, data: Teletravail): Observable<Teletravail> {
    const formData = new FormData();
    formData.append('StartDate', data.StartDate.toISOString());
    formData.append('EndDate', data.EndDate.toISOString());
    formData.append('Reason', data.Reason); 
    return this.http.put<Teletravail>(`${this.apiUrl}/${id}`, formData);
  }
  deleteTeletravail(id: string): Observable<Teletravail> {
    return this.http.delete<Teletravail>(`${this.apiUrl}/${id}`);
  }
  getTeletravailsByManager(managerId: string): Observable<Teletravail[]> {
    return this.http.get<Teletravail[]>(`${this.baseUrl}/managers/${managerId}/teletravails`);
  }
  updateTeletravailStatus(teletravilId: string, newStatus: string): Observable<Teletravail> {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('No token found');
     }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.put<Teletravail>(`${this.apiUrl}/${teletravilId}/status`, { Status: newStatus }, { headers });
  }
  getApprovedTeletravails(): Observable<Teletravail[]> {
    return this.http.get<Teletravail[]>(`${this.baseUrl}/approvedteletravails`);
  }

  searchTeletravail(name: string): Observable<Teletravail[]> {
    return this.http.get<Teletravail[]>(`${this.baseUrl}/searchTeletravail?name=${name}`);
  }


}
