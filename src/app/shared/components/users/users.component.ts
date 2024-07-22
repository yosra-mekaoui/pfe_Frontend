import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../../core/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  isRhRole: boolean = false;
  editingUserId: string | null = null;
  userForm!: FormGroup;
  searchTerm: string = '';
  private baseUrl = 'http://localhost:5000/api';

  constructor(private fb: FormBuilder,
    private userService: UserService, 
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.checkUserRole();
    if (this.isRhRole) {
      this.loadUsers();
    }
  }

  checkUserRole(): void {
    const userRole = this.authService.getUserRole();
    this.isRhRole = userRole === 'RH';
  }
   loadUsers(): void {
    this.userService.getProfile().subscribe(
      (data: User[]) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  deleteUser(id: string): void {
    if (!id) {
      console.error('No user ID provided for delete');
      return;
    }
    if(confirm('Are you sure you want to delete this user?')) {
      this.http.delete(`${this.baseUrl}/users/${id}`).subscribe(() => {
        alert('User deleted successfully');
        this.loadUsers();
        this.http.get(`${this.baseUrl}/users`);
      }, (error) => {
        
        console.error('Error deleting user', error);
        alert('An error occurred. Please try again later.');
    });
  }
}

    updateUser(id: string ): void {
      this.editingUserId = id;
      const user = this.users.find((user) => user._id === id);
      if (user) {
        this.userForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role
        });
        }
      }

      searchUserByName(): void {
        if (this.searchTerm.trim() !== '') {
        this.userService.searchUserByName(this.searchTerm).subscribe(
          (data: User[]) => {
            this.users = data;
          },
          (error) => {
            console.error('Error fetching users', error);
          }
        );
      }
}
}