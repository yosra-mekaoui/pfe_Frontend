export interface Project {
    _id?: string;
    Name: string;
    Description: string;
    StartDate: Date;
    EndDate: Date;
    Status: 'Not Started' | 'In Progress' | 'Completed';
    manager: string; // User ID
    teamMembers: string[]; // Array of User IDs
    tasks: string[]; // Array of Task IDs
  }
  