import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/tasks.model';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';
import { TaskDetailComponent } from '../task-detail/task-detail.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  @Input() projectId!: string; // Déclaration comme @Input()
  tasks: Task[] = [];
  projects: Project[] = [];
  filteredTasks: Task[] = [];
  selectedProjectId: string = '';
  


  constructor(private taskService: TaskService,
    private projectService: ProjectService,
    private dialog: MatDialog,
    private router: Router) { }

    ngOnInit(): void {
      // Get Projects
      this.projectService.getProjects().subscribe((projects: Project[]) => {
        this.projects = projects;
        // Load all tasks initially
        this.loadTasks();
      });
    }
  
    loadTasks(): void {
      this.taskService.getTasks().subscribe((tasks: Task[]) => {
        console.log('All Tasks:', tasks); // Debug
        this.tasks = tasks;
        this.filterTasks();
      });
    }
  
    onProjectFilterChange(event: Event): void {
      const target = event.target as HTMLSelectElement;
      this.selectedProjectId = target.value;
      console.log('Selected Project ID:', this.selectedProjectId); // Debug
      this.filterTasks();
    }
    
    filterTasks(): void {
      console.log('Filtering tasks...'); // Debug
      if (this.selectedProjectId) {
        this.filteredTasks = this.tasks.filter(task => task.project?._id === this.selectedProjectId);
      } else {
        this.filteredTasks = this.tasks;
      }
      console.log('Filtered Tasks:', this.filteredTasks); // Debug
    }
  
  
    getTasksForProject(): void {
      this.taskService.getTasksForProject(this.projectId).subscribe((tasks: Task[]) => {
        this.tasks = tasks;
      });
    }
  getProjectName(projectId: string): string {
    const project = this.projects.find(p => p._id === projectId);
    return project ? project.Name : 'Unknown Project';
  }

  openTaskDetail(task: Task): void {
    this.dialog.open(TaskDetailComponent, {
      width: '600px',
      data: task
    });
  }
  deleteTask(taskId: string | undefined): void {
    if (taskId) {
      this.taskService.deleteTask(taskId).subscribe(() => {
        this.loadTasks();
      });
    } else {
      console.error('Task ID is undefined');
    }
  }
  

  editTask(taskId: string): void {
    this.router.navigate([`/dashboard/task/edit/${taskId}`]);
  }
  
}
