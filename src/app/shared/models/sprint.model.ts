export interface Sprint {
    _id?: string;
    Name: string;
    Description: string;
    StartDate: Date;
    EndDate: Date;
    Tasks: string[]; // Array of Task IDs
  }
  