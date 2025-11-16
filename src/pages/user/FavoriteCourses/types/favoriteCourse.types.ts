import type { Course } from "src/types/course.type";

export interface FavoriteCourse {
  id: string;
  userId: string;
  courseId: Course;
  createdAt: string;
  updatedAt: string;
}
