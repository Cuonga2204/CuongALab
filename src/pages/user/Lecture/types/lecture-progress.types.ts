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
  lecture_id: string;
  section_id: string;
  course_id: string;
  user_id: string;
  watched_seconds: number;
  percentage_watched: number;
  percentage: number;
  is_completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LectureProgressItem {
  lecture_id: string;
  percentage: number; // percentage_watched
  watched_seconds?: number; // optional nếu server trả về
}
