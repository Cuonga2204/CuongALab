// src/pages/user/UserCourse/hooks/useUserCourse.hooks.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { UserCourseApi } from "src/pages/user/MyCourses/apis/user-courses.apis";
import type { UserCourse } from "src/pages/user/MyCourses/types/user-courses.types";

/** 🟢 Ghi danh vào khóa học */
export const useEnrollCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UserCourseApi.enrollCourse,
    onSuccess: () => {
      toast.success("Đã ghi danh vào khóa học!");
      queryClient.invalidateQueries({ queryKey: ["user-courses"] });
    },
    onError: () => toast.error("Không thể ghi danh vào khóa học."),
  });
};

/** 🔵 Lấy danh sách khóa học của user */
export const useGetCoursesByUser = (user_id: string) => {
  return useQuery<UserCourse[]>({
    queryKey: ["user-courses", user_id],
    queryFn: () => UserCourseApi.getCoursesByUser(user_id),
    enabled: !!user_id,
  });
};

/** 🟣 Cập nhật trạng thái học */
export const useUpdateUserCourseStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: "in_progress" | "completed";
    }) => UserCourseApi.updateStatus(id, status),
    onSuccess: () => {
      toast.success("Cập nhật trạng thái học thành công!");
      queryClient.invalidateQueries({ queryKey: ["user-courses"] });
    },
    onError: () => toast.error("Cập nhật trạng thái thất bại."),
  });
};
