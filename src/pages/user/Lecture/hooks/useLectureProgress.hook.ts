import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import {
  getLectureProgress,
  updateLectureProgress,
} from "src/pages/user/Lecture/apis/lectureProgress.api";

import type { LectureProgressUpdatePayLoad } from "src/pages/user/Lecture/types/lecture-progress.types";

//   UPDATE LECTURE PROGRESS  (gửi tiến độ xem video)
export const useUpdateLectureProgress = () => {
  return useMutation({
    mutationFn: (data: LectureProgressUpdatePayLoad) =>
      updateLectureProgress(data),
    onError: () => {
      toast.error("LECTURE_PROGRESS_UPDATE_FAILED");
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
