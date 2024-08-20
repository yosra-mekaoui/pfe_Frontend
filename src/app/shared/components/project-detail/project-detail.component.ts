import { Component, Inject } from '@angular/core';
import { Project } from '../../models/project.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent {
  

  constructor(
    public dialogRef: MatDialogRef<ProjectDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public project: Project
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
  getTeamMemberNames(members: User[]): string {
    return members.map(member => `${member.firstName} ${member.lastName}`).join(', ');
  }
}