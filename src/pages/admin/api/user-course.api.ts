import axiosClient from "src/api/axiosClient";

import type {
  LectureProgressItem,
  UserCourseRecord,
} from "src/pages/admin/types/user-course.types";
import type { Course } from "src/types/course.type";

export const UserCourseApi = {
  getCoursesByUser: async (userId: string): Promise<UserCourseRecord[]> => {
    const res = await axiosClient.get(`/user-progress/user/${userId}/courses`);
    return res.data.data;
  },

  getLectureProgress: async (
    userId: string,
    courseId: string
  ): Promise<LectureProgressItem[]> => {
    const res = await axiosClient.get(
      `/user-progress/lectures/${userId}/${courseId}`
    );
    return res.data.data;
  },

  addCourseToUser: async (userId: string, courseId: string) => {
    return axiosClient.post("/user-course/enroll", {
      user_id: userId,
      course_id: courseId,
    });
  },

  deleteUserCourse: async (userCourseId: string) => {
    return axiosClient.delete(`/user-course/${userCourseId}`);
  },
  getRecommendedCoursesByUser: async (userId: string): Promise<Course[]> => {
    const res = await axiosClient.get(`/user-course/recommend/${userId}`);
    return res.data.data;
  },
};
