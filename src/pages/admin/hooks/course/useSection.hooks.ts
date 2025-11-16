import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  createSection,
  updateSection,
  deleteSection,
  getSectionsByCourse,
  reorderSections,
} from "src/pages/admin/api/section.api";
import type { Section } from "src/types/section.type";

/** === GET SECTIONS BY COURSE === */
export const useGetSectionsByCourse = (courseId: string) => {
  return useQuery({
    queryKey: ["sections", courseId],
    queryFn: () => getSectionsByCourse(courseId),
    enabled: !!courseId,
  });
};

/** === CREATE SECTION === */
export const useCreateSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Section) => createSection(data),
    onSuccess: () => {
      toast.success("add Section success!");
      queryClient.invalidateQueries({ queryKey: ["sections"] });
    },
    onError: () => toast.error("add Section fail"),
  });
};

/** === UPDATE SECTION === */
export const useUpdateSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Section }) =>
      updateSection(id, data),
    onSuccess: () => {
      toast.success("Cập nhật Section thành công!");
      queryClient.invalidateQueries({ queryKey: ["sections"] });
    },
    onError: () => toast.error("Cập nhật Section thất bại!"),
  });
};

//

export const useReorderSections = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: {
      courseId: string;
      newOrder: { id: string; order: number }[];
    }) => reorderSections(body),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sections"] });
    },
    onError: () => toast.error("Sắp xếp section thất bại!"),
  });
};

/** === DELETE SECTION === */
export const useDeleteSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteSection(id),
    onSuccess: () => {
      toast.success("Xoá Section thành công!");
      queryClient.invalidateQueries({ queryKey: ["sections"] });
    },
    onError: () => toast.error("Xoá Section thất bại!"),
  });
};
