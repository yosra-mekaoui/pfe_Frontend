// src/app/shared/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from '../../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:5000/api';
  private apiUrl = `${this.baseUrl}/users`;

  constructor(private http: HttpClient) {}

  getProfile(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/users/${id}`, user);
  }

  deleteUser(userId: string): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/${userId}`);
  }
  searchUserByName(name: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/searchUserByName?name=${name}`);
  }
}
