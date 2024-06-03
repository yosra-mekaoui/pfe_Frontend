import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../modules/user.model';
import { AuthResponse } from '../../modules/auth-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private baseUrl = 'http://localhost:5000/api';
  
    constructor(private http: HttpClient) {}
  
    register(user: User): Observable<AuthResponse> {
      return this.http.post<AuthResponse>(`${this.baseUrl}/register`, user);
    }
  
    login(credentials: { email: string; password: string }): Observable<AuthResponse> {
      return this.http.post<AuthResponse>(`${this.baseUrl}/login`, credentials);
    }
  
    isAuthenticated(): boolean {
      const token = localStorage.getItem('token');
      return !!token;
    }
  }