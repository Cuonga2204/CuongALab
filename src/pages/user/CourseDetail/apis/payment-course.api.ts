import axiosClient from "src/api/axiosClient";

export const PaymentCourseApi = {
  createPaymentCourse: async (payload: {
    userId: string;
    courseId: string;
    price: number;
  }) => {
    const res = await axiosClient.post("/payment-course/create", payload);
    return res.data?.data?.paymentUrl;
  },
};
