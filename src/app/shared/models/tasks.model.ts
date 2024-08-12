export interface Task {
    _id?: string;
    Title: string;
    Description: string;
    Status: 'To Do' | 'In Progress' | 'Done';
    Priority: 'Low' | 'Medium' | 'High';
    StartDate: Date;
    DueDate: Date;
    project: string; // Project ID
    assignedTo: string; // User ID
    createdBy: string;

  }
  