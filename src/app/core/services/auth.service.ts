import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthResponse } from '../../modules/auth-response.model';


interface TokenPayload {
  id: string;
  iat: number; // Date de création du token
  exp: number; // Date d'expiration du token
  // Autres champs du token que vous utilisez
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api';
  private tokenUrl = 'http://localhost:5000/api/token';

  private readonly accessTokenKey = 'accessToken';
  private readonly refreshTokenKey = 'refreshToken';
  private readonly userNameKey = 'userName';
  private readonly userRoleKey = 'userRole';
  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, credentials).pipe(
      tap(
        (response) => {
          if (response.accessToken && response.refreshToken  && response.user.firstName && response.user.role) {
            this.storeTokens(response.accessToken, response.refreshToken);
            localStorage.setItem(this.userNameKey, response.user.firstName);
            localStorage.setItem(this.userRoleKey, response.user.role);
          } else {
            console.error('Invalid response:', response); // Log detailed response
            throw new Error('Invalid response structure');
          }
        }
      ),
      catchError((error) => {
        console.error('An error occurred', error);
        return throwError('Error occurred');
      })
    );
  }
  
  getCurrentUserId(): string | null {
    const accessToken = localStorage.getItem(this.accessTokenKey);
    if (accessToken) {
      const decodedToken = this.decodeAccessToken(accessToken);
      return decodedToken.id; // Assurez-vous que 'id' est une chaîne dans votre structure de token
    }
    return null;
  }

  private decodeAccessToken(token: string): TokenPayload {
    const tokenPayload = JSON.parse(atob(token.split('.')[1])) as TokenPayload;
    return tokenPayload;
  }
  logout(): void {
    console.log('Logging out...');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
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

  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  getUserName(): string | null {
    return localStorage.getItem('userName');
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
