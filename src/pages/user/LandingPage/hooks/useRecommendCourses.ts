import { useQuery } from "@tanstack/react-query";
import { getRecommendedCoursesApi } from "../api/courseRecommend.api";

/* =====================
   USE RECOMMENDED COURSES
===================== */
export const useRecommendCourses = (userId?: string, enabled?: boolean) => {
  return useQuery({
    queryKey: ["recommended-courses", userId],
    queryFn: () => getRecommendedCoursesApi(userId!),
    enabled: !!userId && enabled,
    staleTime: 5 * 60 * 1000,
  });
};
