import axiosInstance from "src/api/axiosClient";
import { SectionQuizEndpointsEnum } from "src/pages/admin/constants/section-quiz.endpoints";

import type {
  SectionQuizQuestion,
  CreateQuizQuestionPayload,
  UpdateQuizPayload,
  SubmitQuizPayload,
  SectionQuiz,
  SectionQuizResult,
  CreateQuizPayload,
} from "src/pages/admin/types/section-quiz.types";

/* =======================
   GET QUIZ BY SECTION
======================= */
export const getQuizBySection = async (
  sectionId: string
): Promise<SectionQuiz[]> => {
  const res = await axiosInstance.get(
    SectionQuizEndpointsEnum.GET_BY_SECTION.replace(":sectionId", sectionId)
  );
  return res.data.data; // ARRAY!!!
};
//get quiz by id
export const getQuizById = async (id: string): Promise<SectionQuiz> => {
  const res = await axiosInstance.get(
    SectionQuizEndpointsEnum.GET_BY_ID.replace(":id", id)
  );
  return res.data.data;
};

/* =======================
      CREATE QUIZ
======================= */
export const createQuiz = async (
  payload: CreateQuizPayload
): Promise<SectionQuiz> => {
  const res = await axiosInstance.post(
    SectionQuizEndpointsEnum.CREATE_QUIZ,
    payload
  );
  return res.data.data;
};

/* =======================
      UPDATE QUIZ
======================= */
export const updateQuiz = async (
  id: string,
  payload: UpdateQuizPayload
): Promise<SectionQuiz> => {
  const res = await axiosInstance.put(
    SectionQuizEndpointsEnum.UPDATE_QUIZ.replace(":id", id),
    payload
  );
  return res.data.data;
};

/* =======================
      DELETE QUIZ
======================= */
export const deleteQuiz = async (id: string): Promise<SectionQuiz> => {
  const res = await axiosInstance.delete(
    SectionQuizEndpointsEnum.DELETE_QUIZ.replace(":id", id)
  );
  return res.data.data;
};

/* =======================
    CREATE QUESTION
======================= */
export const createQuizQuestion = async (
  payload: CreateQuizQuestionPayload
): Promise<SectionQuizQuestion> => {
  const res = await axiosInstance.post(
    SectionQuizEndpointsEnum.CREATE_QUESTION,
    payload
  );
  return res.data.data;
};

/* =======================
    UPDATE QUESTION
======================= */
export const updateQuizQuestion = async (
  id: string,
  payload: CreateQuizQuestionPayload
): Promise<SectionQuizQuestion> => {
  const res = await axiosInstance.put(
    SectionQuizEndpointsEnum.UPDATE_QUESTION.replace(":id", id),
    payload
  );
  return res.data.data;
};

/* =======================
    DELETE QUESTION
======================= */
export const deleteQuizQuestion = async (
  id: string
): Promise<{ message: string }> => {
  const res = await axiosInstance.delete(
    SectionQuizEndpointsEnum.DELETE_QUESTION.replace(":id", id)
  );
  return res.data.data;
};

/* =======================
       SUBMIT QUIZ
======================= */
export const submitQuiz = async (
  payload: SubmitQuizPayload
): Promise<SectionQuizResult> => {
  const res = await axiosInstance.post(
    SectionQuizEndpointsEnum.SUBMIT_QUIZ,
    payload
  );
  return res.data.data;
};

/* =======================
     GET USER RESULT
======================= */
export const getUserQuizResult = async (
  userId: string,
  sectionId: string
): Promise<SectionQuizResult[]> => {
  const res = await axiosInstance.get(
    SectionQuizEndpointsEnum.GET_USER_RESULT.replace(":userId", userId).replace(
      ":sectionId",
      sectionId
    )
  );
  return res.data.data; // ← ARRAY
};
