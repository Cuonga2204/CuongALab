import axiosClient from "src/api/axiosClient";
import { CartEndpointsEnum } from "src/pages/user/Cart/constants/cart.endpoints";

export const PaymentApi = {
  createPaymentUrl: async (payload: { cartId: string }) => {
    const response = await axiosClient.post(
      CartEndpointsEnum.PAYMENT_CART,
      payload
    );
    return response.data?.data;
  },
};
