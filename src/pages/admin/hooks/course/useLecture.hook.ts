import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  createLecture,
  updateLecture,
  deleteLecture,
  getLecturesBySection,
  getLectureDetail,
  reorderLectures,
} from "src/pages/admin/api/lecture.api";
import type { Lecture } from "src/types/lecture.type";

/** === GET LECTURES BY SECTION === */
export const useGetLecturesBySection = (sectionId: string) => {
  return useQuery({
    queryKey: ["lectures", sectionId],
    queryFn: () => getLecturesBySection(sectionId),
    enabled: !!sectionId,
  });
};

/** === CREATE LECTURE === */
export const useCreateLecture = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Lecture) => createLecture(data),
    onSuccess: () => {
      toast.success("Thêm Lecture thành công!");
      queryClient.invalidateQueries({ queryKey: ["lectures"] });
    },
    onError: () => toast.error("Thêm Lecture thất bại!"),
  });
};

/** === GET LECTURE DETAIL === */

export const useGetLectureDetail = (id: string) => {
  return useQuery({
    queryKey: ["lectureDetail", id],
    queryFn: () => getLectureDetail(id),
    enabled: !!id, // chỉ gọi khi có id
  });
};

/** === UPDATE LECTURE === */
export const useUpdateLecture = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Lecture }) =>
      updateLecture(id, data),
    onSuccess: () => {
      toast.success("Cập nhật Lecture thành công!");
      queryClient.invalidateQueries({ queryKey: ["lectures"] });
    },
    onError: () => toast.error("Cập nhật Lecture thất bại!"),
  });
};

// Reorder Lecture
export const useReorderLectures = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: {
      sectionId: string;
      newOrder: { id: string; position_in_section: number }[];
    }) => reorderLectures(payload),
    onSuccess: () => {
      toast.success("Reordered successfully!");
      queryClient.invalidateQueries({ queryKey: ["lectures"] });
    },
    onError: () => toast.error("Reorder failed!"),
  });
};

/** === DELETE LECTURE === */
export const useDeleteLecture = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteLecture(id),
    onSuccess: () => {
      toast.success("Xoá Lecture thành công!");
      queryClient.invalidateQueries({ queryKey: ["lectures"] });
    },
    onError: () => toast.error("Xoá Lecture thất bại!"),
  });
};
