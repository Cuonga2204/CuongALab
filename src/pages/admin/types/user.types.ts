export interface LearningProfile {
  role?: string; // student | working | ...
  goals?: string[]; // get_job | learn_basic | ...
  interests?: string[]; // frontend | backend | ai (AI normalize)
  level?: string; // beginner | intermediate | advanced
}
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  phone?: number;
  /* ===== ONBOARDING / AI ===== */
  learning_profile?: LearningProfile;
  has_onboarding: boolean;
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
