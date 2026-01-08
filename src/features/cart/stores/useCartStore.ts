import http from '@/shared/apis/http';
import { create } from 'zustand';

interface CartState {
  cartCount: number;
  setCartCount: (cartCount: number) => void;
  clearCartCount: () => void;
  fetchCartCount: () => Promise<void>;
}

export const useCartStore = create<CartState>((set) => ({
  cartCount: 0,

  setCartCount: (cartCount) => set({ cartCount }),
  clearCartCount: () => set({ cartCount: 0 }),

  fetchCartCount: async () => {
    const response = await http.get<number>('/cart/count');
    set({ cartCount: response.result ?? 0 });
  },
}));
