export interface UserInfo {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface CourseInfo {
  id: string;
  title: string;
  avatar?: string;
  total_sections?: number;
  total_lectures?: number;
}

export interface UserCourseRecord {
  id: string; // UserCourse ID
  status: "in_progress" | "completed";
  progress: number;
  user_id: UserInfo;
  course_id: CourseInfo;
}

export interface LectureProgressItem {
  id: string;
  lecture_id: string;
  percentage_watched: number;
  is_completed: boolean;
}
