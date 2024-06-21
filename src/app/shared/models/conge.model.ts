export interface Conge {
    _id?: string;
    StartDate: Date;
    EndDate: Date;
    Type: 'Annual' | 'Sick' | 'Maternity' | 'Paternity' | 'Unpaid' | 'Other';
    Status: 'Pending' | 'Approved' | 'Rejected';
    File: File;
    }