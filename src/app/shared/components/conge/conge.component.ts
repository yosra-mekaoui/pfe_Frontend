import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Conge } from '../../models/conge.model';
import { CongeService } from '../../services/conge.service';

@Component({
  selector: 'app-conge',
  templateUrl: './conge.component.html',
  styleUrls: ['./conge.component.scss']
})
export class CongeComponent implements OnInit {
  congeForm!: FormGroup;
  conges: Conge[] = [];
  editingCongeId: string | null = null;
  private baseUrl = 'http://localhost:5000/api';

  constructor(private fb: FormBuilder, private http: HttpClient, private congeService: CongeService) { 
    this.congeForm = this.fb.group({
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
      Type: ['', Validators.required],
      Status: ['', Validators.required],
      File: [null, Validators.required] 
    });
  }

  ngOnInit(): void {
    this.loadConges();
  }

  loadConges(): void {
    this.congeService.getConges().subscribe(
      (data: Conge[]) => {
        this.conges = data;
      },
      (error) => {
        console.error('Error fetching conges', error);
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
  
      const fileControl = this.congeForm.get('File');
      if (fileControl && fileControl.value) {
        formData.append('File', fileControl.value);
      }
      if (this.editingCongeId) { 
        // Update existing conge
        this.http.put(`${this.baseUrl}/conges/${this.editingCongeId}`, this.congeForm.value).subscribe(response => {
          console.log('Conge updated', response);
          this.loadConges();
          this.congeForm.reset();
          this.editingCongeId = null;
        }, error => {
          console.error('Error updating conge', error);
        });
      } else {
        // Create new conge
        const formData = new FormData();
        formData.append('StartDate', this.congeForm.value.StartDate);
        formData.append('EndDate', this.congeForm.value.EndDate);
        formData.append('Type', this.congeForm.value.Type);
        formData.append('Status', this.congeForm.value.Status);
        formData.append('File', this.congeForm.value.File || '');
        this.http.post(`${this.baseUrl}/conges`, this.congeForm.value).subscribe(response => {
          console.log('Conge request sent', response);
          this.loadConges();
        }, error => {
          console.error('Error sending conge request', error);
        });
      }
    }
  }
  startEditing(id: string): void {
    this.editingCongeId = id;
    const conge = this.conges.find(c => c._id === id);
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
    this.http.delete(`${this.baseUrl}/conges/${id}`).subscribe(response => {
      console.log('Conge deleted', response);
      this.loadConges();
    }, error => {
      console.error('Error deleting conge', error);
    });
  }

}
