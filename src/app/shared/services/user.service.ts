// src/app/shared/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users`);
  }

  updateProfile(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/users`, user);
  }
}
