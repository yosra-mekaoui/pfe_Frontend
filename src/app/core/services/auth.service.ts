import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../../modules/user.model';
import { AuthResponse } from '../../modules/auth-response.model';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api';
  private tokenUrl = 'http://localhost:5000/api/token';

  constructor(private http: HttpClient, private router: Router) {}

  register(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, user).pipe(
      tap((response: AuthResponse) => {
        this.storeTokens(response.accessToken, response.refreshToken);
      })
    );
  }

  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, credentials).pipe(
      tap((response: AuthResponse) => {
        this.storeTokens(response.accessToken, response.refreshToken);
      })
    );
  }

  logout(): void {
    console.log('Logging out...');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    console.log('Tokens removed, redirecting to login...');
    this.router.navigate(['/login']).then(() => {
    console.log('Redirected to login');
    // window.location.reload(); // Forcer un rechargement complet pour vider les données en cache


  });
}

  public storeTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  refreshToken(): Observable<AuthResponse> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return throwError('No refresh token available');
    }
    return this.http.post<AuthResponse>(this.tokenUrl, { token: refreshToken }).pipe(
      tap((response: AuthResponse) => {
        this.storeTokens(response.accessToken, refreshToken);
      })
    );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');
    // Vérifier si le token est null ou non
    return token !== null;
  }
}
