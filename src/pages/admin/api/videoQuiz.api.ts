import axiosClient from "src/api/axiosClient";
import type {
  CreateVideoQuizRequest,
  VideoQuiz,
} from "src/pages/admin/types/videoQuizz.types";

export const VideoQuizApi = {
  /** 🟢 Tạo quiz */
  createQuiz: async (payload: CreateVideoQuizRequest): Promise<VideoQuiz> => {
    const res = await axiosClient.post("/video-quiz/create", payload);
    return res.data.data;
  },

  /** 🔵 Lấy quiz theo lecture */
  getByLecture: async (lectureId: string): Promise<VideoQuiz[]> => {
    const res = await axiosClient.get(`/video-quiz/lecture/${lectureId}`);
    return res.data.data;
  },

  /** 🔴 Xoá quiz */
  deleteQuiz: async (id: string): Promise<VideoQuiz> => {
    const res = await axiosClient.delete(`/video-quiz/${id}`);
    return res.data.data;
  },
};
