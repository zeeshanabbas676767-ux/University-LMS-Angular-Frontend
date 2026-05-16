import { Role } from './role.model';

export interface User {
  id: number;
  fullName: string;
  email: string;
  roleId: number;
  role: Role;
}