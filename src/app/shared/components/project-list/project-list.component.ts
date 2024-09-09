import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Project } from '../../models/project.model';
import { User } from '../../models/user.model';
import { Task } from '../../models/tasks.model';
import { MatDialog } from '@angular/material/dialog';
import { ProjectDetailComponent } from '../project-detail/project-detail.component';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects: any[] = [];
  filteredProjects: any[] = [];
  isManagerRole: boolean = false;


  constructor(private projectService: ProjectService,
    private authService: AuthService,private dialog: MatDialog ) { }

  ngOnInit(): void {
    this.checkUserRole();
    if (this.isManagerRole) {
    this.getProjects();
    }
  }
  checkUserRole(): void {
    const userRole = this.authService.getUserRole();
    this.isManagerRole = userRole === 'Manager';
  }
  getProjects(): void {
    this.projectService.getProjects().subscribe((projects: any[]) => {
      this.projects = projects;
      this.filteredProjects = projects;
    });
  }
  toggleTaskView(projectId: string): void {
    this.filteredProjects = this.filteredProjects.map(project => {
      if (project._id === projectId) {
        project.showTasks = !project.showTasks;
      }
      return project;
    });
  }
  getTeamMemberNames(members: User[]): string {
    return members.map(member => `${member.firstName} ${member.lastName}`).join(', ');
  }
  // getTask(tasks: Task[]): string {
  //   return tasks.map(task => `${task.Title} ${task.Priority}`).join(', ');
  // }
  getTask(tasks: Task[]): string {
    const maxTasksToShow = 4;
    const tasksToShow = tasks.slice(0, maxTasksToShow);
    const taskDisplay = tasksToShow.map(task => `${task.Title} ${task.Priority}`).join(', ');
    
    return tasks.length > maxTasksToShow ? `${taskDisplay}, ...` : taskDisplay;
  }
  
  onStatusFilterChange(event: any): void {
    const status = event.target.value;
    this.filteredProjects = this.projects.filter(project => 
      status ? project.Status === status : true
    );
  }

  onDateFilterChange(event: any): void {
    const selectedDate = event.target.value;
    this.filteredProjects = this.projects.filter(project => 
      selectedDate ? new Date(project.StartDate) >= new Date(selectedDate) : true
    );
  }
  openProjectDetail(project: Project): void {
    this.dialog.open(ProjectDetailComponent, {
      width: '600px',
      data: project
    });
  }
  deleteProject(projectId: string): void {
    this.projectService.deleteProject(projectId).subscribe(() => {
      this.getProjects();
    });
  }
  
  
}
