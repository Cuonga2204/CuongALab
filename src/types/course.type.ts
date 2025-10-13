import type { COURSE_CATEGORIES } from "src/constants/course.constants";

export interface Course {
  _id: string;
  title: string;
  avatar: File;
  price_current: number;
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
