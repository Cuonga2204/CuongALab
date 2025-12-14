import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { QuestionBankApi } from "src/pages/admin/api/question-bank.api";
import type {
  CreateQuestionBankPayload,
  AddBankQuestionPayload,
  DeleteBankQuestionPayload,
  UpdateQuestionBankPayload,
} from "src/pages/admin/types/question-bank.types";

export const useGetAllQuestionBanks = () =>
  useQuery({
    queryKey: ["bank-all"],
    queryFn: QuestionBankApi.getAll,
  });

export const useGetBankDetail = (id: string) =>
  useQuery({
    queryKey: ["bank-detail", id],
    queryFn: () => QuestionBankApi.getDetail(id),
  });

export const useCreateBank = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateQuestionBankPayload) =>
      QuestionBankApi.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bank-all"] });
    },
  });
};

export const useUpdateBank = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string; payload: UpdateQuestionBankPayload }) =>
      QuestionBankApi.update(data.id, data.payload),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ["bank-detail", id] });
      qc.invalidateQueries({ queryKey: ["bank-all"] });
    },
  });
};

export const useAddBankQuestion = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddBankQuestionPayload) =>
      QuestionBankApi.addQuestion(payload),
    onSuccess: (_, payload) => {
      qc.invalidateQueries({ queryKey: ["bank-detail", payload.formId] });
    },
  });
};

export const useDeleteBank = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => QuestionBankApi.deleteForm(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bank-all"] });
    },
  });
};

export const useDeleteBankQuestion = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: DeleteBankQuestionPayload) =>
      QuestionBankApi.deleteQuestion(data.formId, data.index),
    onSuccess: (_, data) => {
      qc.invalidateQueries({ queryKey: ["bank-detail", data.formId] });
    },
  });
};

export const useImportBankToQuiz = () =>
  useMutation({
    mutationFn: (payload: { quizId: string; formId: string }) =>
      QuestionBankApi.importToQuiz(payload),
  });
