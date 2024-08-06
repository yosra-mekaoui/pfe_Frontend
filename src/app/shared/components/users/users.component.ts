import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../../core/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit,ViewChild } from '@angular/core';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RefreshComponent } from '../refresh/refresh.component';


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
  @ViewChild(RefreshComponent) refresh!: RefreshComponent | undefined;

  private baseUrl = 'http://localhost:5000/api';

  constructor(private fb: FormBuilder,
    private userService: UserService, 
    private authService: AuthService,
    private http: HttpClient,
    public dialog: MatDialog
  ) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required],
      startWorkDate: ['', Validators.required],
      sold: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.checkUserRole();
    if (this.isRhRole) {
        this.loadUsers();
    }
  }
  ngAfterViewInit(): void {
    // Vérifiez si le composant est bien disponible
    console.log('RefreshAnimationComponent:', this.refresh);
  }
  

  checkUserRole(): void {
    const userRole = this.authService.getUserRole();
    this.isRhRole = userRole === 'RH';
  }
  loadUsers(): void {
    this.userService.getProfile().subscribe(
      (data: User[]) => {
        this.users = data;
        // Vérifiez si le composant est disponible après le chargement des utilisateurs
        setTimeout(() => {
          if (this.refresh) {
            this.refresh.triggerRefresh();
          } else {
            console.error('RefreshAnimationComponent not found');
          }
        }, 0); // Assurez-vous que la mise à jour du DOM est effectuée
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
openUserDetail(user: any) {
  // Ouvrir une modale avec les détails de l'utilisateur
  const dialogRef = this.dialog.open(UserDetailComponent, {
    width: '400px',
    data: user
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}
}