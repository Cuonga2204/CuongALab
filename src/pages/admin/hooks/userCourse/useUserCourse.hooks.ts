import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { UserCourseApi } from "../../api/user-course.api";
import type {
  UserCourseRecord,
  LectureProgressItem,
} from "../../types/user-course.types";
import { toast } from "react-toastify";
import type { Course } from "src/types/course.type";

export const useGetCoursesByUser = (userId: string) =>
  useQuery<UserCourseRecord[]>({
    queryKey: ["userCourses", userId],
    queryFn: () => UserCourseApi.getCoursesByUser(userId),
    enabled: !!userId,
  });

export const useGetLectureProgress = (userId: string, courseId: string) =>
  useQuery<LectureProgressItem[]>({
    queryKey: ["lectureProgress", userId, courseId],
    queryFn: () => UserCourseApi.getLectureProgress(userId, courseId),
    enabled: !!userId && !!courseId,
  });

export const useAddCourseToUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, courseId }: { userId: string; courseId: string }) =>
      UserCourseApi.addCourseToUser(userId, courseId),
    onSuccess: () => {
      toast.success("Added course successfully!");
      qc.invalidateQueries({ queryKey: ["userCourses"] });
    },
  });
};

export const useDeleteUserCourse = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (userCourseId: string) =>
      UserCourseApi.deleteUserCourse(userCourseId),
    onSuccess: () => {
      toast.success("Course removed!");
      qc.invalidateQueries({ queryKey: ["userCourses"] });
    },
  });
};

export const useGetRecommendedCoursesByUser = (userId: string) =>
  useQuery<Course[]>({
    queryKey: ["user-course-recommend", userId],
    queryFn: () => UserCourseApi.getRecommendedCoursesByUser(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
