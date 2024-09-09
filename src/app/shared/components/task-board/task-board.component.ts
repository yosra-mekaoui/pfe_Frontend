import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ProjectService } from '../../services/project.service';
import { Task } from '../../models/tasks.model';
import { Project } from '../../models/project.model';
import { transferArrayItem,moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss'],
})
export class TaskBoardComponent implements OnInit {
  @Input() projectId!: string;
  projects: Project[] = []; // List of all projects
  selectedProjectId: string = ''; // ID of the selected project
  selectedProjectDescription: string = '';
  selectedProjectStartDate: string = '';
  selectedProjectEndDate: string = '';

  tasks: { [key: string]: Task[] } = {
    'To Do': [],
    'In Progress': [],
    'Done': []
  };
  
  constructor(private taskService: TaskService, private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
  this.projectService.getProjects().subscribe((projects: Project[]) => {
    this.projects = projects;
    if (projects.length > 0) {
      this.selectedProjectId = projects[0]?._id || ''; // Set the first project as default
      this.loadTasks(this.selectedProjectId);
    }
  });
}
loadTasks(projectId: string): void {
  this.taskService.getTasksForProject(projectId).subscribe((tasks: Task[]) => {
    this.tasks['To Do'] = [];
    this.tasks['In Progress'] = [];
    this.tasks['Done'] = [];
    
    tasks.forEach(task => {
      this.tasks[task.Status].push(task);
    });

    const selectedProject = this.projects.find(project => project._id === projectId);

    if (selectedProject) {
      this.selectedProjectDescription = selectedProject.Description;
    
      this.selectedProjectStartDate = new Date(selectedProject.StartDate).toLocaleDateString();
      this.selectedProjectEndDate = new Date(selectedProject.EndDate).toLocaleDateString(); // Make sure this line is executed
    }
  });
}
  onProjectChange(event: any): void {
    const selectedProjectId = event.target.value;
    this.loadTasks(selectedProjectId);
  }
  drop(event: any): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);

      const movedTask = event.container.data[event.currentIndex];
      const newStatus = this.getNewStatus(event.container.id);
      this.updateTaskStatus(movedTask, newStatus);
    }
  }

  getNewStatus(containerId: string): 'To Do' | 'In Progress' | 'Done' {
    switch (containerId) {
      case 'cdk-drop-list-0':
        return 'To Do';
      case 'cdk-drop-list-1':
        return 'In Progress';
      case 'cdk-drop-list-2':
        return 'Done';
      default:
        return 'To Do';
    }
  }

  updateTaskStatus(task: Task, newStatus: 'To Do' | 'In Progress' | 'Done'): void {
    task.Status = newStatus;
    console.log('Status to update:', newStatus);
    if (task._id) {
      this.taskService.updateTask(task._id, newStatus).subscribe({
        next: updatedTask => {
          console.log('Task updated successfully:', updatedTask);
        },
        error: err => {
          console.error('Error updating task:', err);
        }
      });
    } else {
      console.error("Task ID is undefined");
    }
  }
  
  

}
