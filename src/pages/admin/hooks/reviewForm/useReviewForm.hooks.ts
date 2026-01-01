import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import {
  getCourseReviews,
  getReviewForm,
  submitCourseReview,
  updateReviewForm,
} from "../../api/reviewForm.api";

import type {
  ReviewQuestion,
  SubmitCourseReviewRequest,
} from "../../types/reviewForm.types";

/* ================= ADMIN ================= */

export const useGetReviewForm = () =>
  useQuery({
    queryKey: ["review-form"],
    queryFn: getReviewForm,
  });

export const useGetCourseReviews = (params: {
  page: number;
  limit: number;
  userId?: string;
}) =>
  useQuery({
    queryKey: ["course-reviews", params],
    queryFn: () => getCourseReviews(params),
  });

export const useUpdateReviewForm = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (questions: ReviewQuestion[]) => updateReviewForm(questions),

    onSuccess: () => {
      toast.success("Cập nhật form đánh giá thành công");
      qc.invalidateQueries({ queryKey: ["review-form"] });
    },
  });
};

/* ================= USER ================= */

export const useSubmitCourseReview = (courseId: string) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: SubmitCourseReviewRequest) => submitCourseReview(data),

    onSuccess: () => {
      toast.success("Gửi đánh giá thành công");

      // invalidate nếu bạn có list review / course detail
      qc.invalidateQueries({ queryKey: ["course-detail", courseId] });
      qc.invalidateQueries({ queryKey: ["course-reviews", courseId] });
    },
  });
};
