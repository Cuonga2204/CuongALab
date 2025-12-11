import axiosClient from "src/api/axiosClient";
import type {
  PricingRow,
  CoursePricing,
  UpdatePricingPayload,
} from "../types/pricing.types";

/* ============================================
   GET ALL PRICING + COURSES (Admin)
============================================ */
export const getAllCoursePricing = async (): Promise<PricingRow[]> => {
  const res = await axiosClient.get("/course-pricing/admin/all");
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
