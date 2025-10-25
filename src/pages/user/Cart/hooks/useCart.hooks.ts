import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { SuccessMessageEnum } from "src/constants/validation-message";
import {
  addToCart,
  clearCart,
  getUserCart,
  removeFromCart,
} from "src/pages/user/Cart/apis/cart.apis";
import type { Cart } from "src/pages/user/Cart/types/cart.types";

/** === GET USER CART === */
export const useGetUserCart = (userId: string) => {
  return useQuery<Cart>({
    queryKey: ["cart", userId],
    queryFn: () => getUserCart(userId),
    // enabled: !!userId,
  });
};

/** === ADD COURSE TO CART === */
export const useAddToCart = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (courseId: string) => addToCart(userId, courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
    },
  });
};

/** === REMOVE COURSE FROM CART === */
export const useRemoveFromCart = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (courseId: string) => removeFromCart(userId, courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
    },
  });
};

/** === CLEAR CART === */
export const useClearCart = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => clearCart(userId),
    onSuccess: () => {
      toast.success(SuccessMessageEnum["CART-003"]);
      queryClient.invalidateQueries({ queryKey: ["cart", userId] });
    },
  });
};
