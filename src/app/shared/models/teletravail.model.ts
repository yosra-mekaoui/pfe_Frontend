export interface Teletravail {
    _id?: string; // Ajoutez cette ligne si vous utilisez MongoDB et que les documents ont un champ `_id`
    StartDate: Date;
    EndDate: Date;
    Reason: string;
    Status: 'Pending' | 'Approved' | 'Rejected';
    userId: {
      firstName: string;
      lastName: string;
      email: string;
      id: string;
    };
    Staff?: string;
    staffName?: string;
  }
  