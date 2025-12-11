export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  phone?: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserListResponse {
  total: number;
  page: number;
  limit: number;
  users: UserFormData[];
}

export interface UserFormData {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  avatar?: File;
  createdAt: string;
  updatedAt: string;
}
