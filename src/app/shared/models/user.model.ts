// src/app/shared/models/user.model.ts
export interface Role {
  _id: string;
  Role_Name: string;
}

export interface User {
  _id?: string;
  id?: string;
  firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
    startWorkDate: Date;
    sold: number;
  }
  