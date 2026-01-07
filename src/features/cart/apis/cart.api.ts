import http from '@/shared/apis/http';
import { addCartItemRequestDTO, getCartResponseDTO } from '../types/response';

export default function cartAPI() {
  // 장바구니 조회
  const fetchCart = async () => {
    const response = await http.get<getCartResponseDTO>('/cart');
    return response.result;
  };

  // 장바구니 선택 여부 (단일)
  const selectCartItem = async (id: number, isSelected: boolean) => {
    await http.put(`/cart/items/${id}/select`, { isSelected });
  };

  // 장바구니 선택 (전체)
  const selectAllCartItems = async () => {
    await http.put(`/cart/select-all`);
  };

  // 장바구니 선택 취소 (전체)
  const deselectAllCartItems = async () => {
    await http.put(`/cart/deselect-all`);
  };

  const addCartItem = async (data: addCartItemRequestDTO) => {
    await http.post('/cart/items', data);
  };

  const updateCartItemQty = async (id: number, quantity: number) => {
    await http.put(`/cart/items/${id}/quantity`, { quantity });
  };

  const removeCartItem = async (id: number) => {
    await http.delete(`/cart/items/${id}`);
  };

  const clearCart = async () => {
    await http.delete('/cart');
  };

  const removeSelectedItems = async (ids: number[]) => {
    await http.delete('/cart/selected', {
      data: { ids },
    });
  };

  return {
    fetchCart,
    selectCartItem,
    selectAllCartItems,
    deselectAllCartItems,
    addCartItem,
    updateCartItemQty,
    removeCartItem,
    clearCart,
    removeSelectedItems,
  };
}
