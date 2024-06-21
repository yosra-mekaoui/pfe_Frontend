// src/app/shared/components/profile/profile.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User | undefined;
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    this.http.get<User>(`${this.baseUrl}/users`).subscribe(
      (data: User) => {
        this.user = data;
      },
      (error) => {
        console.error('Error fetching user profile', error);
      }
    );
  }
}
