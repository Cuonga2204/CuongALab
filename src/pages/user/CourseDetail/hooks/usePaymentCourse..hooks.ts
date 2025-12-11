import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { PaymentCourseApi } from "../apis/payment-course.api";

export const usePaymentCourse = () => {
  return useMutation({
    mutationFn: PaymentCourseApi.createPaymentCourse,

    onSuccess: (url) => {
      if (url) {
        window.location.href = url;
      } else {
        toast.error("Không nhận được link thanh toán!");
      }
    },

    onError: () => {
      toast.error("Thanh toán thất bại. Vui lòng thử lại!");
    },
  });
};
