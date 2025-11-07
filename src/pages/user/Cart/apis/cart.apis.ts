import axiosClient from "src/api/axiosClient";
import { CartEndpointsEnum } from "src/pages/user/Cart/constants/cart.endpoints";
import type { Cart } from "src/pages/user/Cart/types/cart.types";

export const getUserCart = async (userId: string): Promise<Cart> => {
  const response = await axiosClient.get(
    CartEndpointsEnum.GET_USER_CART.replace(":userId", userId)
  );
  return response.data.data;
};

export const addToCart = async (userId: string, courseId: string) => {
  const response = await axiosClient.post(CartEndpointsEnum.ADD_TO_CART, {
    userId,
    courseId,
  });
  return response.data.data;
};

export const removeFromCart = async (userId: string, courseId: string) => {
  const response = await axiosClient.delete(
    CartEndpointsEnum.REMOVE_FROM_CART,
    {
      data: { userId, courseId },
    }
  );
  return response.data.data;
};

export const clearCart = async (userId: string) => {
  const response = await axiosClient.delete(
    CartEndpointsEnum.CLEAR_CART.replace(":userId", userId)
  );
  return response.data.data;
};
