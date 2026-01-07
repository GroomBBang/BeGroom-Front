import { create } from 'zustand';

interface CheckoutState {
  orderId: number | null;
  setOrderId: (orderId: number) => void;
  clearOrderId: () => void;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
  orderId: null,

  setOrderId: (orderId) =>
    set({
      orderId,
    }),

  clearOrderId: () =>
    set({
      orderId: null,
    }),
}));
