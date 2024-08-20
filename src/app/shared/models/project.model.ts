import { User } from "./user.model";
export interface Task {
    Title: string;
    Description: string;
    Status: string;
    Priority: string;
    StartDate: string;  // Format ISO 8601
    DueDate: string;    // Format ISO 8601
    assignedTo: string; // User ID
    createdBy: string;  // User ID
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
  }
  