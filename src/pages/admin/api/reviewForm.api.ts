import axiosClient from "src/api/axiosClient";
import type {
  ReviewFormResponse,
  ReviewQuestion,
  SubmitCourseReviewRequest,
} from "../types/reviewForm.types";

export const getReviewForm = async (): Promise<ReviewFormResponse> => {
  const res = await axiosClient.get("/course-review/review-form");
  return res.data.data;
};

export const getCourseReviews = async (params: {
  page: number;
  limit: number;
  userId?: string;
}) => {
  const res = await axiosClient.get("/course-review", { params });
  return res.data.data;
};

export const updateReviewForm = async (
  questions: ReviewQuestion[]
): Promise<ReviewQuestion[]> => {
  const res = await axiosClient.put("/course-review/review-form", {
    questions,
  });
  return res.data.data;
};
export const submitCourseReview = async ({
  courseId,
  userId,
  payload,
}: SubmitCourseReviewRequest) => {
  const res = await axiosClient.post(`/course-review/${courseId}/review`, {
    userId,
    ...payload,
  });

  return res.data.data;
};
