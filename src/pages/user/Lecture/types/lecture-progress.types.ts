export interface LectureProgressUpdatePayLoad {
  user_id: string;
  course_id: string;
  section_id: string;
  lecture_id: string;
  watched_seconds: number;
  percentage: number;
}

export interface LectureProgress {
  id: string;
  user_id: string;
  course_id: string;
  section_id: string;
  lecture_id: string;
  watched_seconds: number;
  last_watched_at: number; // %
  is_completed: boolean;
  createdAt: string;
  updatedAt: string;
}
