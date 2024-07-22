import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conge } from '../models/conge.model';
import { AuthService } from '../../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CongeService {
  private apiUrl = 'http://localhost:5000/api/conges'; // Changez l'URL si nécessaire
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getAccessToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getConges(): Observable<Conge[]> {
    return this.http.get<Conge[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getCongesByUserId(userId: string): Observable<Conge[]> {
    return this.http.get<Conge[]>(`${this.apiUrl}/user/${userId}`, { headers: this.getHeaders() });
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
  // Méthode pour récupérer les demandes de congé par manager
  getCongesByManager(managerId: string): Observable<Conge[]> {
    return this.http.get<Conge[]>(`${this.baseUrl}/managers/${managerId}/conges`);
  }

  // Méthode pour mettre à jour le statut d'une demande de congé
  // updateCongeStatus(congeId: string, newStatus: string, token: string): Observable<any> {
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   return this.http.put(`${this.baseUrl}/conges/${congeId}/status`, { Status: newStatus }, { headers });
  // }
  updateCongeStatus(congeId: string, newStatus: string): Observable<Conge> {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('No token found');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.put<Conge>(`${this.apiUrl}/${congeId}/status`, { status: newStatus }, { headers });
  }

  
  
  downloadFile(congeId: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/conges/${congeId}/download`, { responseType: 'blob' });
  }
  getApprovedConges(): Observable<Conge[]> {
    return this.http.get<Conge[]>(`${this.baseUrl}/approvedconges`)
  }
  searchConges(name: string): Observable<Conge[]> {
    return this.http.get<Conge[]>(`${this.baseUrl}/search?name=${name}`);
  }

}
