import type { USER_COURSE_STATUS } from "src/pages/user/MyCourses/constants/user-courses.constants";
import type { Course } from "src/types/course.type";

export interface UserCourse extends Course {
  id: string;

  userId: string;
  courseId: string;
  status: USER_COURSE_STATUS; // hoặc import từ enum USER_COURSE_STATUS
}
