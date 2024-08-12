import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Teletravail } from '../../models/teletravail.model';
import { TeletravailService } from '../../services/teletravail.service';
import { AuthService } from '../../../core/services/auth.service';
@Component({
  selector: 'app-teletravail',
  templateUrl: './teletravail.component.html',
  styleUrls: ['./teletravail.component.scss']
})
export class TeletravailComponent implements OnInit {
  teletravailForm!: FormGroup;
  teletravails: Teletravail[] = [];
  userId: string | null = null;
  isStaffRole: boolean = false;
  isManagerRole: boolean = false;
  isRhRole: boolean = false;
  pendingTeletravails: Teletravail[] = [];
  processedTeletravails: Teletravail[] = [];
  approvedTeletravails: Teletravail[] = [];
  editingTeletravailId: string | null = null;
  searchTerm: string = '';
  private baseUrl = 'http://localhost:5000/api';


  constructor(private fb: FormBuilder, private http: HttpClient, private teletravailService: TeletravailService, private authService: AuthService) { 
    this.teletravailForm = this.fb.group({
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
      Reason: ['', Validators.required],
      Status: ['Pending', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userId = this.authService.getCurrentUserId();
    const userRole = this.authService.getUserRole();
    this.isStaffRole = userRole === 'Staff';
    this.isManagerRole = userRole === 'Manager';
    this.isRhRole = userRole === 'RH';


    if (this.userId) {
      this.loadTeletravails();
    }
  }

  loadTeletravails(): void {
    if(this.isStaffRole) {  
    this.teletravailService.getTeletravailsByUserId(this.userId!).subscribe(
      (data: Teletravail[]) => {
        this.teletravails = data;
      },
      (error) => {
        console.error('Error fetching teletravails', error);
      }
    );
  } 
  else if (this.isManagerRole) {
console.log('Manager role');

    this.teletravailService.getTeletravailsByManager(this.userId!).subscribe(
      (data: Teletravail[]) => {
        this.teletravails = data;
        this.pendingTeletravails = data.filter(t => t.Status === 'Pending');
        this.processedTeletravails = data.filter(t => t.Status !== 'Pending');
      },
      (error) => {
        console.error('Error fetching teletravails', error);
      }
    );
  }
  else if(this.isRhRole) {
    console.log('-------------')
    this.teletravailService.getApprovedTeletravails().subscribe(
      (data: Teletravail[]) => {
        this.approvedTeletravails = data.filter(teletravail => teletravail.Status === 'Approved');
        console.log('-------------')
        console.log(data)

      },
      (error) => {
        console.error('Error fetching teletravails', error);
      }
    );
  }
}
search(): void {
  if (this.searchTerm.trim() !== '') {
    this.teletravailService.searchTeletravail(this.searchTerm).subscribe(
      (data) => {
        this.approvedTeletravails = data;
      },
      (error) => {
        console.error('Error fetching approved tt:', error);
        // Gérer l'erreur ici, par exemple afficher un message à l'utilisateur
      }
    );
  } else {
    this.getApprovedTeletravails(); // Charger tous les congés approuvés si aucun terme de recherche n'est saisi
  }
}
getApprovedTeletravails(): void {
  console.log('-------------')
  this.teletravailService.getApprovedTeletravails().subscribe(
    (data) => {
      this.approvedTeletravails = data;
      console.log(this.approvedTeletravails); // Verify structure

    },
    (error) => {
      console.error('Error fetching approved teletravails', error);
    }
  );
}


  onSubmit(): void {
    console.log('onSubmit called');
    console.log('Form values:', this.teletravailForm.value);
    if (this.teletravailForm.valid) {
      const formData = {
        StartDate: this.teletravailForm.get('StartDate')!.value,
        EndDate: this.teletravailForm.get('EndDate')!.value,
        Reason: this.teletravailForm.get('Reason')!.value,
        Status: this.teletravailForm.get('Status')!.value,
        userId: this.userId!
      };
  
  
      const headers = new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json'
      });

      console.log('FormData contents:', formData);
      
      if (this.editingTeletravailId) {
        this.http
        this.http.put(`${this.baseUrl}/teletravails/${this.editingTeletravailId}`, formData, { headers }).subscribe(
            (response) => {
              console.log('Tt updated', response);
              this.loadTeletravails();
              this.teletravailForm.reset();
              this.editingTeletravailId = null;
            },
            (error) => {
              console.error('Error updating tt', error);
            }
          );
      } else {
        this.http.post(`${this.baseUrl}/teletravails`, formData, { headers }).subscribe(
          (response) => {
            console.log('Conge request sent', response);
            this.loadTeletravails();
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
    this.editingTeletravailId = id;
    const teletravail = this.teletravails.find(t => t._id === id);
    if (teletravail) {
      this.teletravailForm.patchValue({
        StartDate: teletravail.StartDate,
        EndDate: teletravail.EndDate,
        Reason: teletravail.Reason,
        Status: teletravail.Status
      });
    }
    }


  
  deleteTeletravail(id: string): void {
    if (confirm('Are you sure you want to delete this telework request?')) {
      this.http.delete(`${this.baseUrl}/teletravails/${id}`).subscribe(() => {
        alert('Telework request deleted successfully.');
        this.loadTeletravails();
        this.http.get(`${this.baseUrl}/teletravails`);
            }, error => {
        console.error('Error deleting telework request', error);
        alert('Error deleting telework request.');
      });
    }
  }

  onChangeStatus(newStatus: string, teletravailId: string | undefined): void {
    if(!teletravailId) {
      console.error('No teletravail ID provided for status change');
      return;
    }
    console.log('Changing teletravail status to:', newStatus);
    this.teletravailService.updateTeletravailStatus(teletravailId, newStatus).subscribe(
      (response) => {
        console.log('Teletravail status updated', response);
        this.loadTeletravails();
      },
      (error) => {
        console.error('Error updating teletravail status', error);
      }
    );
  }
  
    

}