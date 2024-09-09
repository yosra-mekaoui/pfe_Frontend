import { User } from "./user.model";
export interface Task {
    Title: string;
    Description: string;
    Status: string;
    Priority: string;
    StartDate: string;  // Format ISO 8601
    DueDate: string;    // Format ISO 8601
    assignedTo: User; // User ID
    createdBy: User;  // User ID
    _id?: string;
    project?: Project;
  }
export interface Project {
    _id?: string;
    Name: string;
    Description: string;
    StartDate: Date;
    EndDate: Date;
    Status: 'Not Started' | 'In Progress' | 'Completed';
    manager: User; // User ID
    teamMembers: User[]; // Array of User IDs
    tasks: Task[]; // Array of Task IDs
    showTasks?: boolean; // Ajouter cette propriété pour suivre l'affichage des tâches

  }
  