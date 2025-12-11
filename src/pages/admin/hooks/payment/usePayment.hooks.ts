import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deletePayment,
  getPaymentDetail,
  getPayments,
} from "src/pages/admin/api/payment.api";

export const useGetPayments = (page: number, limit: number) =>
  useQuery({
    queryKey: ["payments", page, limit],
    queryFn: () => getPayments(page, limit),
  });

export const useGetPaymentDetail = (id: string) =>
  useQuery({
    queryKey: ["payment-detail", id],
    queryFn: () => getPaymentDetail(id),
    enabled: !!id,
  });

export const useDeletePayment = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deletePayment,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["payments"] });
    },
  });
};
