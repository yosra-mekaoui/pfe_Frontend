export interface Conge {
    _id?: string;
    StartDate: Date;
    EndDate: Date;
    Type: 'Annual' | 'Sick' | 'Maternity' | 'Paternity' | 'Unpaid' | 'Other';
    Status: 'Pending' | 'Approved' | 'Rejected';
    File: string;
    userId: {
        firstName: string;
        lastName: string;
        email: string;
        id: string;
      };
      Staff?: string;
      staffName?: string;
    }