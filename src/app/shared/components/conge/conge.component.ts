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
  isManagerRole: boolean = false;
  isRhRole: boolean = false;
  pendingConges: Conge[] = [];
  processedConges: Conge[] = [];
  searchTerm: string = '';
  approvedConges: Conge[] = [];
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
    this.isManagerRole = userRole === 'Manager';
    this.isRhRole = userRole === 'RH';


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
    } else if (this.isManagerRole) {
      this.congeService.getCongesByManager(this.userId!).subscribe(
        (data: Conge[]) => {
          this.conges = data;
          this.pendingConges = data.filter(conge => conge.Status === 'Pending');
          this.processedConges = data.filter(conge => conge.Status !== 'Pending')
        },
        (error) => {
          console.error('Error fetching conges', error);
        }
      );
    }
    else if (this.isRhRole) {
      this.congeService.getApprovedConges().subscribe(
        (data: Conge[]) => {
          this.approvedConges = data.filter(conge => conge.Status === 'Approved');
        },
        (error) => {
          console.error('Error fetching approved conges', error);
        }
      );
    }
  }
  search(): void {
    if (this.searchTerm.trim() !== '') {
      this.congeService.searchConges(this.searchTerm).subscribe(
        (data) => {
          this.approvedConges = data;
        },
        (error) => {
          console.error('Error fetching approved conges:', error);
          // Gérer l'erreur ici, par exemple afficher un message à l'utilisateur
        }
      );
    } else {
      this.getApprovedConges(); // Charger tous les congés approuvés si aucun terme de recherche n'est saisi
    }
  }
  getApprovedConges(): void {
    this.congeService.getApprovedConges().subscribe(
      (data) => {
        this.approvedConges = data;
      },
      (error) => {
        console.error('Error fetching approved congés:', error);
        // Gérer l'erreur ici, par exemple afficher un message à l'utilisateur
      }
    );
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
  // onChangeStatus(newStatus: string, congeId: string | undefined): void {
  //   if (!congeId) {
  //     console.error('Congé ID is undefined');
  //     return;
  //   }
  //   const token = localStorage.getItem('accessToken');
  //   if (token) {
  //     this.congeService.updateCongeStatus(congeId, newStatus, token).subscribe(
  //       (response) => {
  //         console.log('Conge status updated', response);
  //         this.loadConges();
  //       },
  //       (error) => {
  //         console.error('Error updating conge status', error);
  //       }
  //     );
  //   } else {
  //     console.error('No token found');
  //   }
  // }
  onChangeStatus(newStatus: string, congeId: string | undefined): void {
    if (!congeId) {
      console.error('Congé ID is undefined');
      return;
    }
    
    this.congeService.updateCongeStatus(congeId, newStatus).subscribe(
      (response) => {
        console.log('Conge status updated', response);
        this.loadConges(); // Recharger la liste des congés après mise à jour
      },
      (error) => {
        console.error('Error updating conge status', error);
      }
    );
  }
  
  
  downloadFile(congeId: string, fileName: string): void {
    this.congeService.downloadFile(congeId).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Download error:', error);
    });
  }

  getFileName(file: string): string {
    return file.split('/').pop() || 'Unknown File';
  }

}  

