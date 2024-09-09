import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/tasks.model';
import { Project } from '../models/project.model';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/api'; // Your API URL

  constructor(private http: HttpClient) { }

  getTasksForProject(projectId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/projects/${projectId}/tasks`);
  }
  //getTasks
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/taches`);
    }

  getTask(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  // TaskService
updateTask(taskId: string, status: 'To Do' | 'In Progress' | 'Done'): Observable<Task> {
  return this.http.put<Task>(`${this.apiUrl}/tasks/${taskId}`, { status });
}




  
  

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
