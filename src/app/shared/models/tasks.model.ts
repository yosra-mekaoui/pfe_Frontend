import { User } from "./user.model";
import { Project } from "./project.model";


export interface Task {
    _id?: string;
    Title: string;
    Description: string;
    Status: 'To Do' | 'In Progress' | 'Done';
    Priority: 'Low' | 'Medium' | 'High';
    StartDate: Date;
    DueDate: Date;
    project?: Project; // Vérifiez que le type de `project` est correct
  assignedTo?: User; // Vérifiez que le type de `assignedTo` est correct
  createdBy?: User;

  }
  