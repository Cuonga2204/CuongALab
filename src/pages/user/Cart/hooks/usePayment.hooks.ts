import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { PaymentApi } from "src/pages/user/Cart/apis/payment.api";

export const usePaymentCart = () => {
  return useMutation({
    mutationFn: PaymentApi.createPaymentUrl,

    onSuccess: (paymentUrl: string) => {
      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        toast.error("Không nhận được link thanh toán từ server!");
      }
    },
    onError: () => {
      toast.error("Tạo thanh toán thất bại. Vui lòng thử lại!");
    },
  });
};
