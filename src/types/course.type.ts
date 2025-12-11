import type { COURSE_CATEGORIES } from "src/constants/course.constants";

export interface Course {
  id: string;
  title: string;
  avatar: string;
  price_current: number;
  price_old: number;
  discount_percent?: number; // %
  discount_tag?: string | null;
  is_discount_active?: boolean;
  sale_start?: string | null;
  sale_end?: string | null;
  teacher_id: string;
  name_teacher: string;
  rating_average: number;
  overview: string;
  description: string;
  student_count: number;
  total_sections: number;
  total_lectures: number;
  total_video_duration: number;
  total_hours: number;
  category: COURSE_CATEGORIES;
}
