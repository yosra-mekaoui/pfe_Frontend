import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Teletravail } from '../../models/teletravail.model';
import { TeletravailService } from '../../services/teletravail.service';

@Component({
  selector: 'app-teletravail',
  templateUrl: './teletravail.component.html',
  styleUrls: ['./teletravail.component.scss']
})
export class TeletravailComponent implements OnInit {
  teletravailForm!: FormGroup;
  teletravails: Teletravail[] = [];
  editingTeletravailId: string | null = null;
  private baseUrl = 'http://localhost:5000/api';


  constructor(private fb: FormBuilder, private http: HttpClient, private teletravailService: TeletravailService) { 
    this.teletravailForm = this.fb.group({
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
      Reason: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTeletravails();
  }

  loadTeletravails(): void {
    this.teletravailService.getTeletravails().subscribe(
      (data: Teletravail[]) => {
        this.teletravails = data;
      },
      (error) => {
        console.error('Error fetching teletravails', error);
      }
    );
  }

  onSubmit(): void {
    if (this.teletravailForm.valid) {
      this.http.post(`${this.baseUrl}/teletravails`, this.teletravailForm.value).subscribe(response => {
        console.log('Teletravail request sent', response);
        this.loadTeletravails();
      }, error => {
        console.error('Error sending teletravail request', error);
      });
    }
  }
  startEditing(id: string): void {
    this.editingTeletravailId = id;
  }

  //update
  editTeletravail(teletravail: Teletravail): void {
    this.teletravailForm.patchValue({
      StartDate: teletravail.StartDate,
      EndDate: teletravail.EndDate,
      Reason: teletravail.Reason,
      Status: teletravail.Status
    });
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
  
    

}