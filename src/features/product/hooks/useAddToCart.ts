'use client';

import cartAPI from '@/features/cart/apis/cart.api';
import { useCartStore } from '@/features/cart/stores/useCartStore';
import toast from 'react-hot-toast';

type SelectedItem = {
  productDetailId: number;
  qty: number;
};

export function useAddToCart() {
  const api = cartAPI();
  const fetchCartCount = useCartStore((s) => s.fetchCartCount);

  const addToCart = async (selected: SelectedItem[]) => {
    if (selected.length === 0) return;

    const payload = {
      items: selected.map((s) => ({
        productDetailId: s.productDetailId,
        quantity: s.qty,
      })),
    };

    try {
      await api.addCartItem(payload);
      toast.success('상품이 장바구니에 추가되었습니다');
      fetchCartCount();
    } catch (e) {
      console.error(e);
      toast.error('장바구니 추가 실패');
    }
  };

  return { addToCart };
}
