import axiosClient from "src/api/axiosClient";
import type { Course } from "src/types/course.type";

/* =====================
   RECOMMEND COURSE
===================== */
export const getRecommendedCoursesApi = async (
  userId: string
): Promise<Course[]> => {
  const res = await axiosClient.post("/user/recommend-course", { userId });
  return res.data.data;
};
