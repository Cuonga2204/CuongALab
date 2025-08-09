export interface Course {
  id: string;
  author_id: string;
  title: string;
  avatar: string;
  price_old: number;
  price_current: number;
  name_teacher: string;
  rating_average: number;
  overview: string;
  description: string;
  status: string;
  student_count: number;
  total_sections: number;
  total_lectures: number;
  total_video_duration: number;
  total_hours: number;
  category: string;
}
