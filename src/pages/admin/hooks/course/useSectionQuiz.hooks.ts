import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getQuizBySection,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  createQuizQuestion,
  updateQuizQuestion,
  deleteQuizQuestion,
  submitQuiz,
  getUserQuizResult,
  getQuizById,
} from "../../api/sectionQuiz.api";

import { toast } from "react-toastify";
import type {
  CreateQuizQuestionPayload,
  UpdateQuizPayload,
  SubmitQuizPayload,
  CreateQuizPayload,
  SectionQuizResult,
} from "src/pages/admin/types/section-quiz.types";

/* GET QUIZ by section */
export const useGetQuizBySection = (sectionId: string) =>
  useQuery({
    queryKey: ["quiz", sectionId],
    queryFn: () => getQuizBySection(sectionId),
    enabled: !!sectionId,
  });
//get quiz by id
export const useGetQuizById = (quizId: string) =>
  useQuery({
    queryKey: ["quiz-detail", quizId],
    queryFn: () => getQuizById(quizId),
    enabled: !!quizId,
  });

/* CREATE */
export const useCreateQuiz = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateQuizPayload) => createQuiz(payload),
    onSuccess: (_, payload) => {
      qc.invalidateQueries({ queryKey: ["quiz", payload.section_id] });
      toast.success("Quiz created!");
    },
  });
};

/* UPDATE QUIZ */
export const useUpdateQuiz = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateQuizPayload }) =>
      updateQuiz(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["quiz"] });
      toast.success("Quiz updated!");
    },
  });
};

/* DELETE QUIZ */
export const useDeleteQuiz = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteQuiz(id),
    onSuccess: () => {
      qc.invalidateQueries();
      toast.success("Quiz deleted");
    },
  });
};

/* CREATE QUESTION */
export const useCreateQuizQuestion = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateQuizQuestionPayload) =>
      createQuizQuestion(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["quiz"] });
      toast.success("Question added!");
    },
  });
};

/* UPDATE QUESTION */
export const useUpdateQuizQuestion = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: CreateQuizQuestionPayload;
      quizId: string;
    }) => updateQuizQuestion(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["quiz"] });
      toast.success("Question updated!");
    },
  });
};

/* DELETE QUESTION */
export const useDeleteQuizQuestion = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteQuizQuestion(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["quiz"] });
      toast.success("Question deleted!");
    },
  });
};

/* SUBMIT */
export const useSubmitQuiz = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: SubmitQuizPayload) => submitQuiz(payload),
    onSuccess: (_, payload) => {
      qc.invalidateQueries({
        queryKey: ["quiz-result", payload.user_id, payload.section_id],
      });
      // invalidate luôn danh sách quiz nếu cần
      qc.invalidateQueries({
        queryKey: ["quiz", payload.section_id],
      });
    },
  });
};

/* GET RESULT */
export const useGetUserQuizResult = (userId: string, sectionId: string) =>
  useQuery<SectionQuizResult[]>({
    queryKey: ["quiz-result", userId, sectionId],
    queryFn: () => getUserQuizResult(userId, sectionId),
    enabled: !!userId && !!sectionId,
  });
