import axiosInstance from '@/shared/apis';
import type { CartItemType } from '../types';

type GetCartResponseDTO = {
  items: CartItemType[];
};

export default function cartAPI() {
  const fetchCart = async (): Promise<GetCartResponseDTO> => {
    const response = await axiosInstance.get('/cart');
    return response.data;
  };

  const addCartItem = async (productId: string, quantity: number) => {
    await axiosInstance.post('/cart/items', { productId, quantity });
  };

  const updateCartItemQty = async (id: string, quantity: number) => {
    await axiosInstance.patch(`/cart/items/${id}`, { quantity });
  };

  const removeCartItem = async (id: string) => {
    await axiosInstance.delete(`/cart/items/${id}`);
  };

  const clearCart = async () => {
    await axiosInstance.delete('/cart');
  };

  const removeSelectedItems = async (ids: string[]) => {
    await axiosInstance.delete('/cart/items', {
      data: { ids },
    });
  };

  return {
    fetchCart,
    addCartItem,
    updateCartItemQty,
    removeCartItem,
    clearCart,
    removeSelectedItems,
  };
}
