export interface RegisterDto {
  fullName: string;
  email: string;
  password: string;
  department_Name?: string;
  roleId: number;
}