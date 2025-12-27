import axiosClient from "src/api/axiosClient";
import type {
  CoursePricing,
  UpdatePricingPayload,
  PricingPaginationResponse,
} from "../types/pricing.types";

/* ============================================
   GET ALL PRICING + COURSES (Admin)
============================================ */
interface GetPricingParams {
  page: number;
  limit: number;
}

export const getAllCoursePricing = async ({
  page,
  limit,
}: GetPricingParams): Promise<PricingPaginationResponse> => {
  const res = await axiosClient.get("/course-pricing/admin/all", {
    params: { page, limit },
  });

  return res.data.data;
};
/* ============================================
   GET PRICING BY COURSE ID
============================================ */
export const getPricingByCourse = async (
  courseId: string
): Promise<CoursePricing | null> => {
  const res = await axiosClient.get(`/course-pricing/course/${courseId}`);
  return res.data.data;
};

/* ============================================
   UPDATE PRICING (Create if not exist)
============================================ */
export const updateCoursePricing = async (
  payload: UpdatePricingPayload
): Promise<CoursePricing> => {
  const res = await axiosClient.put(`/course-pricing/update`, payload);
  return res.data.data;
};
