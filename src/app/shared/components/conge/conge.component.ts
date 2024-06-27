import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Conge } from '../../models/conge.model';
import { CongeService } from '../../services/conge.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-conge',
  templateUrl: './conge.component.html',
  styleUrls: ['./conge.component.scss']
})
export class CongeComponent implements OnInit {
  congeForm!: FormGroup;
  conges: Conge[] = [];
  userId: string | null = null;
  editingCongeId: string | null = null;
  private baseUrl = 'http://localhost:5000/api';
  isStaffRole: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private congeService: CongeService,
    private authService: AuthService
  ) {
    this.congeForm = this.fb.group({
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
      Type: ['', Validators.required],
      Status: ['Pending', Validators.required],
      File: [null]
    });
  }

  ngOnInit(): void {
    this.userId = this.authService.getCurrentUserId();
    const userRole = this.authService.getUserRole();
    this.isStaffRole = userRole === 'Staff';

    if (this.userId) {
      this.loadConges();
    }
  }

  loadConges(): void {
    if (this.isStaffRole) {
      this.congeService.getCongesByUserId(this.userId!).subscribe(
        (data: Conge[]) => {
          this.conges = data;
        },
        (error) => {
          console.error('Error fetching conges', error);
        }
      );
    } else {
      this.congeService.getConges().subscribe(
        (data: Conge[]) => {
          this.conges = data;
        },
        (error) => {
          console.error('Error fetching conges', error);
        }
      );
    }
  }

  onSubmit(): void {
    console.log('Form values:', this.congeForm.value);
    if (this.congeForm.valid) {
      const formData = new FormData();
      formData.append('StartDate', this.congeForm.get('StartDate')!.value);
      formData.append('EndDate', this.congeForm.get('EndDate')!.value);
      formData.append('Type', this.congeForm.get('Type')!.value);
      formData.append('Status', this.congeForm.get('Status')!.value);
      formData.append('userId', this.userId!); // Ajout de userId au formData

      const fileInputElement = document.getElementById('File') as HTMLInputElement;
    if (fileInputElement.files && fileInputElement.files.length > 0) {
      formData.append('File', fileInputElement.files[0]);
    } else {
      console.error('File input is empty');
    }
    console.log('FormData contents:');
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

      const headers = new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      });

      console.log('FormData contents:');
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      if (this.editingCongeId) {
        this.http
          .put(`${this.baseUrl}/conges/${this.editingCongeId}`, formData, { headers })
          .subscribe(
            (response) => {
              console.log('Conge updated', response);
              this.loadConges();
              this.congeForm.reset();
              this.editingCongeId = null;
            },
            (error) => {
              console.error('Error updating conge', error);
            }
          );
      } else {
        this.http.post(`${this.baseUrl}/conges`, formData, { headers }).subscribe(
          (response) => {
            console.log('Conge request sent', response);
            this.loadConges();
          },
          (error) => {
            console.error('Error sending conge request', error);
            if (error.status === 400) {
              console.error('Bad Request:', error.error);
            }
          }
        );
      }
    }
  }

  startEditing(id: string): void {
    this.editingCongeId = id;
    const conge = this.conges.find((c) => c._id === id);
    if (conge) {
      this.congeForm.setValue({
        StartDate: conge.StartDate,
        EndDate: conge.EndDate,
        Type: conge.Type,
        Status: conge.Status,
        File: conge.File
      });
    }
  }

  deleteConge(id: string): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    });

    this.http.delete(`${this.baseUrl}/conges/${id}`, { headers }).subscribe(
      (response) => {
        console.log('Conge deleted', response);
        this.loadConges();
      },
      (error) => {
        console.error('Error deleting conge', error);
      }
    );
  }
}
