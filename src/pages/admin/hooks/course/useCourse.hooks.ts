import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseDetail,
  getAllCourses,
} from "src/pages/admin/api/course.api";
import {
  SuccessMessageEnum,
  ValidationMessageEnum,
} from "src/constants/validation-message";
import type { CourseFormData } from "src/pages/admin/types/course.types";
import type { Course } from "src/types/course.type";

/** === GET ALL COURSE === */

export const useGetAllCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: () => getAllCourses(),
  });
};

/** === CREATE COURSE === */

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: CourseFormData) => createCourse(formData),
    onSuccess: () => {
      toast.success(SuccessMessageEnum["COURSE-001"]);
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: () => toast.error(ValidationMessageEnum["COURSE-001"]),
  });
};

/** === UPDATE COURSE === */

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CourseFormData }) =>
      updateCourse(id, data),
    onSuccess: () => {
      toast.success(SuccessMessageEnum["COURSE-003"]);
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: () => toast.error(ValidationMessageEnum["COURSE-003"]),
  });
};

/** === DELETE COURSE === */

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCourse(id),
    onSuccess: () => {
      toast.success(SuccessMessageEnum["COURSE-002"]);
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: () => toast.error(ValidationMessageEnum["COURSE-002"]),
  });
};

/** === GET COURSE DETAIL === */

export const useGetCourseDetail = (id: string) => {
  return useQuery<Course>({
    queryKey: ["course-detail", id],
    queryFn: () => getCourseDetail(id),
    enabled: !!id,
  });
};
