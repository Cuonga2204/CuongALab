import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-toastify";

import {
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseDetail,
  getAllCourses,
  getCoursesByTeacher,
  getAllCoursesPublic,
  searchCourses,
} from "src/pages/admin/api/course.api";

import {
  SuccessMessageEnum,
  ValidationMessageEnum,
} from "src/constants/validation-message";

import type {
  CourseCreateFormData,
  CourseFormData,
} from "src/pages/admin/types/course.types";

import type { Course } from "src/types/course.type";

import { useAuthStore } from "src/store/authStore";
import { ROLE_USER } from "src/constants/auth.constants";

/* ===========================================================
    GET ALL COURSES (Admin only)
=========================================================== */
export const useGetAllCourses = (page?: number, limit?: number) => {
  return useQuery({
    queryKey: ["courses", page, limit],
    queryFn: () => getAllCourses(page, limit),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetAllCoursesPublic = () =>
  useQuery({
    queryKey: ["courses-public"],
    queryFn: getAllCoursesPublic,
    staleTime: 5 * 60 * 1000,
  });
/* ===========================================================
    GET COURSES BY TEACHER (Teacher only)
=========================================================== */
export const useGetCoursesByTeacher = (teacherId: string, enabled = true) =>
  useQuery({
    queryKey: ["teacher-courses", teacherId],
    queryFn: () => getCoursesByTeacher(teacherId),
    enabled: !!teacherId && enabled,
  });

/* ===========================================================
    CREATE COURSE
=========================================================== */
export const useCreateCourse = () => {
  const { user } = useAuthStore();
  const isTeacher = user?.role === ROLE_USER.TEACHER;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: CourseCreateFormData) => createCourse(formData),

    onSuccess: () => {
      toast.success(SuccessMessageEnum["COURSE-001"]);

      // 🟢 Teacher → invalidate course list của teacher
      if (isTeacher) {
        queryClient.invalidateQueries({ queryKey: ["teacher-courses"] });
      } else {
        // 🟢 Admin → invalidate tất cả courses
        queryClient.invalidateQueries({ queryKey: ["courses"] });
      }
    },

    onError: () => toast.error(ValidationMessageEnum["COURSE-001"]),
  });
};

/* ===========================================================
    UPDATE COURSE
=========================================================== */
export const useUpdateCourse = () => {
  const { user } = useAuthStore();
  const isTeacher = user?.role === ROLE_USER.TEACHER;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CourseFormData }) =>
      updateCourse(id, data),

    onSuccess: () => {
      toast.success(SuccessMessageEnum["COURSE-003"]);

      if (isTeacher) {
        queryClient.invalidateQueries({ queryKey: ["teacher-courses"] });
      } else {
        queryClient.invalidateQueries({ queryKey: ["courses"] });
      }
      queryClient.invalidateQueries({ queryKey: ["course-detail"] });
    },

    onError: () => toast.error(ValidationMessageEnum["COURSE-003"]),
  });
};

/* ===========================================================
    DELETE COURSE
=========================================================== */
export const useDeleteCourse = () => {
  const { user } = useAuthStore();
  const isTeacher = user?.role === ROLE_USER.TEACHER;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCourse(id),

    onSuccess: () => {
      toast.success(SuccessMessageEnum["COURSE-002"]);

      if (isTeacher) {
        queryClient.invalidateQueries({ queryKey: ["teacher-courses"] });
      } else {
        queryClient.invalidateQueries({ queryKey: ["courses"] });
      }
    },

    onError: () => toast.error(ValidationMessageEnum["COURSE-002"]),
  });
};

/* ===========================================================
    GET COURSE DETAIL
=========================================================== */
export const useGetCourseDetail = (id: string) =>
  useQuery<Course>({
    queryKey: ["course-detail", id],
    queryFn: () => getCourseDetail(id),
    enabled: !!id,
  });

//Search

export const useSearchCourses = (keyword: string) =>
  useQuery({
    queryKey: ["course-search", keyword],
    queryFn: () => searchCourses(keyword),
    enabled: keyword.trim().length > 0, // ⭐ FIX
    staleTime: 2 * 60 * 1000,
  });
