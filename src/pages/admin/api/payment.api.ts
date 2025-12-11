import axiosClient from "src/api/axiosClient";

export const getPayments = (page: number, limit: number) =>
  axiosClient
    .get(`/payment/get-all`, {
      params: { page, limit },
    })
    .then((res) => res.data.data);

export const getPaymentDetail = (id: string) =>
  axiosClient.get(`/payment/detail/${id}`).then((res) => res.data.data);

export const deletePayment = (id: string) =>
  axiosClient.delete(`/payment/delete/${id}`).then((res) => res.data.data);
