import axiosClient from "src/api/axiosClient";

import type {
  CreateQuestionBankPayload,
  AddBankQuestionPayload,
  UpdateQuestionBankPayload,
} from "src/pages/admin/types/question-bank.types";

export const QuestionBankApi = {
  getAll: async () => {
    const res = await axiosClient.get("/question-bank/all");
    return res.data.data;
  },

  getDetail: async (id: string) => {
    const res = await axiosClient.get(`/question-bank/${id}`);
    return res.data.data;
  },

  create: async (payload: CreateQuestionBankPayload) => {
    const res = await axiosClient.post("/question-bank/create", payload);
    return res.data.data;
  },

  update: async (id: string, payload: UpdateQuestionBankPayload) => {
    const res = await axiosClient.put(`/question-bank/update/${id}`, payload);
    return res.data.data;
  },

  addQuestion: async (payload: AddBankQuestionPayload) => {
    const res = await axiosClient.post(
      `/question-bank/${payload.formId}/question/add`,
      {
        question: payload.question,
        options: payload.options,
      }
    );
    return res.data.data;
  },

  deleteForm: async (id: string) => {
    const res = await axiosClient.delete(`/question-bank/delete/${id}`);
    return res.data.data;
  },

  deleteQuestion: async (formId: string, index: number) => {
    const res = await axiosClient.delete(
      `/question-bank/${formId}/question/${index}`
    );
    return res.data.data;
  },
  importToQuiz: async (payload: { quizId: string; formId: string }) => {
    const res = await axiosClient.post("/question-bank/import", payload);
    return res.data.data;
  },
};
