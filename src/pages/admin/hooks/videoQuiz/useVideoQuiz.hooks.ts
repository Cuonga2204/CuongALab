import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { VideoQuizApi } from "src/pages/admin/api/videoQuiz.api";
import type {
  CreateVideoQuizRequest,
  VideoQuiz,
} from "src/pages/admin/types/videoQuizz.types";

export const useCreateQuiz = () => {
  const queryClient = useQueryClient();
  return useMutation<VideoQuiz, unknown, CreateVideoQuizRequest>({
    mutationFn: VideoQuizApi.createQuiz,
    onSuccess: () => {
      toast.success("Tạo quiz thành công!");
      queryClient.invalidateQueries({ queryKey: ["video-quiz"] });
    },
    onError: () => toast.error("Tạo quiz thất bại!"),
  });
};

export const useGetQuizByLecture = (lectureId: string) => {
  return useQuery<VideoQuiz[]>({
    queryKey: ["video-quiz", lectureId],
    queryFn: () => VideoQuizApi.getByLecture(lectureId),
    enabled: !!lectureId,
  });
};

/** === Xóa quiz === */
export const useDeleteQuiz = () => {
  const queryClient = useQueryClient();
  return useMutation<VideoQuiz, unknown, string>({
    mutationFn: VideoQuizApi.deleteQuiz,
    onSuccess: () => {
      toast.success("🗑️ Xóa quiz thành công!");
      queryClient.invalidateQueries({ queryKey: ["video-quiz"] });
    },
    onError: () => toast.error("Xóa quiz thất bại!"),
  });
};
