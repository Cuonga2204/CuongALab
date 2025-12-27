import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import type {
  CoursePricing,
  UpdatePricingPayload,
  PricingPaginationResponse,
} from "src/pages/admin/types/pricing.types";

import {
  getAllCoursePricing,
  getPricingByCourse,
  updateCoursePricing,
} from "src/pages/admin/api/coursePricing.api";

/* ============================================
   GET ALL PRICING + COURSES
============================================ */
interface UseGetAllPricingParams {
  page: number;
  limit: number;
}

export const useGetAllPricing = ({ page, limit }: UseGetAllPricingParams) =>
  useQuery<PricingPaginationResponse>({
    queryKey: ["course-pricing", page, limit], // ⭐ QUAN TRỌNG
    queryFn: () => getAllCoursePricing({ page, limit }),
    staleTime: 5 * 60 * 1000,
  });
/* ============================================
   UPDATE PRICING
============================================ */
export const useUpdatePricing = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdatePricingPayload) => updateCoursePricing(payload),

    onSuccess: () => {
      toast.success("Pricing updated successfully!");
      qc.invalidateQueries({ queryKey: ["course-pricing"] });
    },

    onError: () => {
      toast.error("Failed to update pricing");
    },
  });
};

/* ============================================
   GET PRICING BY COURSE
============================================ */
export const useGetPricingByCourse = (courseId: string) =>
  useQuery<CoursePricing | null>({
    queryKey: ["course-pricing", courseId],
    queryFn: () => getPricingByCourse(courseId),
    enabled: !!courseId,
  });
