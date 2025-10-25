import { create } from "zustand";
import type { Cart } from "src/pages/user/Cart/types/cart.types";

interface CartState {
  cart: Cart | null;
  setCart: (cart: Cart) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: null,

  setCart: (cart) => set({ cart }),

  clearCart: () =>
    set({
      cart: null,
    }),
}));
