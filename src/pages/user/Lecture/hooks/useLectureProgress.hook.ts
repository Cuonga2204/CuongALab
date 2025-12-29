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

    /* =====================================
       1️⃣ OPTIMISTIC UPDATE (SECTION)
    ===================================== */
    onMutate: async (newProgress) => {
      const sectionKey = [
        "section-progress",
        newProgress.section_id,
        newProgress.user_id,
      ];

      await queryClient.cancelQueries({ queryKey: sectionKey });

      const previous =
        queryClient.getQueryData<LectureProgressItem[]>(sectionKey);

      queryClient.setQueryData<LectureProgressItem[]>(
        sectionKey,
        (old = []) => {
          const exists = old.find(
            (p) => p.lecture_id === newProgress.lecture_id
          );

          if (exists) {
            return old.map((p) =>
              p.lecture_id === newProgress.lecture_id
                ? { ...p, percentage: newProgress.percentage }
                : p
            );
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

    /* =====================================
       2️⃣ ROLLBACK NẾU LỖI
    ===================================== */
    onError: (_err, newProgress, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          ["section-progress", newProgress.section_id, newProgress.user_id],
          context.previous
        );
      }
    },

    /* =====================================
       3️⃣ ĐỒNG BỘ SERVER + COURSE PROGRESS
    ===================================== */
    onSettled: (_data, _err, newProgress) => {
      // section
      queryClient.invalidateQueries({
        queryKey: [
          "section-progress",
          newProgress.section_id,
          newProgress.user_id,
        ],
      });

      // lecture
      queryClient.invalidateQueries({
        queryKey: ["lecture-progress", newProgress.lecture_id],
      });

      // 🔥 course progress (QUAN TRỌNG)
      queryClient.invalidateQueries({
        queryKey: ["course-progress", newProgress.course_id],
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
