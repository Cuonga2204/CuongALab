export type UserRole = "admin" | "teacher" | "user";
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole | string;
  avatar?: string;
  phone?: number;
  createdAt: string;
  updatedAt: string;
}
