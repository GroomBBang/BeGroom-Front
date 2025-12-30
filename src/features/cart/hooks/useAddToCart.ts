'use client';

import cartAPI from '@/features/cart/apis/cart.api';

export function useAddToCart() {
  const api = cartAPI();

  const addToCart = async (productId: string, quantity: number) => {
    await api.addCartItem(productId, quantity);
  };

  return { addToCart };
}
