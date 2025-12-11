import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getLectureProgress,
  getProgressBySection,
  updateLectureProgress,
} from "src/pages/user/Lecture/apis/lectureProgress.api";

import type {
  LectureProgress,
  LectureProgressItem,
} from "src/pages/user/Lecture/types/lecture-progress.types";

export const useUpdateLectureProgress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateLectureProgress,

    // ⭐ UPDATE UI NGAY LẬP TỨC
    onMutate: async (newProgress) => {
      await queryClient.cancelQueries({
        queryKey: [
          "section-progress",
          newProgress.section_id,
          newProgress.user_id,
        ],
      });

      const previous = queryClient.getQueryData([
        "section-progress",
        newProgress.section_id,
        newProgress.user_id,
      ]);

      queryClient.setQueryData(
        ["section-progress", newProgress.section_id, newProgress.user_id],
        (old: LectureProgressItem[] = []) => {
          const exists = old.find(
            (p) => p.lecture_id === newProgress.lecture_id
          );

          if (exists) {
            exists.percentage = newProgress.percentage;
            return [...old];
          }

          return [
            ...old,
            {
              lecture_id: newProgress.lecture_id,
              percentage: newProgress.percentage,
            },
          ];
        }
      );

      return { previous };
    },

    onError: (_err, newProgress, context) => {
      // rollback khi lỗi
      if (context?.previous) {
        queryClient.setQueryData(
          ["section-progress", newProgress.section_id, newProgress.user_id],
          context.previous
        );
      }
    },

    onSettled: (data, _err, newProgress) => {
      // Sau khi server update xong, đồng bộ lại 1 lần
      queryClient.invalidateQueries({
        queryKey: [
          "section-progress",
          newProgress.section_id,
          newProgress.user_id,
        ],
      });
    },
  });
};

//   GET LECTURE PROGRESS (lấy % đã xem của Lecture)
export const useGetLectureProgress = (lectureId: string, userId: string) =>
  useQuery({
    queryKey: ["lecture-progress", lectureId, userId],
    queryFn: () => getLectureProgress(lectureId, userId),
    enabled: !!lectureId && !!userId,
  });

//   GET LECTURE PROGRESS BY SECTION
export const useGetProgressBySection = (sectionId: string, userId: string) =>
  useQuery<LectureProgress[]>({
    queryKey: ["section-progress", sectionId, userId],
    queryFn: () => getProgressBySection(sectionId, userId),
    enabled: !!sectionId && !!userId,
  });
