// src/features/cart/hooks/useCart.ts
'use client';

import cartAPI from '@/features/cart/apis/cart.api';
import checkoutAPI from '@/features/checkout/apis/checkout.api';
import { useCheckoutStore } from '@/features/checkout/stores/useCheckoutStore';
import { createOrderRequestDTO } from '@/features/checkout/types/response';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useCartStore } from '../stores/useCartStore';
import { CartContextType, CartItemType } from '../types/model';

export function useCart(): CartContextType {
  const [items, setItems] = useState<CartItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchCartCount = useCartStore((s) => s.fetchCartCount);

  const router = useRouter();
  const { createOrder } = checkoutAPI();
  const setCheckoutOrder = useCheckoutStore((s) => s.setOrderId);

  const api = useMemo(() => cartAPI(), []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const refetch = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await api.fetchCart();
      setItems(data.groupItems.flatMap((group) => group.items));
    } catch (e) {
      setError('장바구니 조회에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [api]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  // 장바구니 단일 삭제
  const removeItem = async (id: number) => {
    const prev = items;
    setItems((cur) => cur.filter((x) => x.cartItemId !== id));

    try {
      await api.removeCartItem(id);
      fetchCartCount();
    } catch (e) {
      setItems(prev);
      setError('상품 삭제에 실패했습니다.');
    }
  };

  // 장바구니 수량 변경
  const updateQty = async (id: number, nextQty: number, stockQty: number) => {
    if (nextQty < 1) return;
    if (stockQty < nextQty) {
      setError('선택하신 상품의 재고가 부족합니다.');
      return;
    }
    const prev = items;

    setItems((cur) => cur.map((x) => (x.cartItemId === id ? { ...x, quantity: nextQty } : x)));

    try {
      await api.updateCartItemQty(id, nextQty);
    } catch (e) {
      setItems(prev);
      setError('상품 수량 변경에 실패했습니다.');
    }
  };

  // 장바구니 선택
  const toggleSelect = async (cartItemId: number) => {
    const target = items.find((x) => x.cartItemId === cartItemId);
    if (!target) return;

    const isSelected = !target.isSelected;

    setItems((prev) => prev.map((x) => (x.cartItemId === cartItemId ? { ...x, isSelected } : x)));

    try {
      await api.selectCartItem(cartItemId, isSelected);
    } catch (e) {
      setItems((prev) =>
        prev.map((x) =>
          x.cartItemId === cartItemId ? { ...x, isSelected: target.isSelected } : x,
        ),
      );
    }
  };

  // 장바구니 전체 선택
  const setAllSelected = async (selected: boolean) => {
    setItems((prev) => prev.map((x) => ({ ...x, isSelected: selected })));

    try {
      if (selected) {
        await api.selectAllCartItems();
      } else {
        await api.deselectAllCartItems();
      }
    } catch (e) {
      setItems((prev) => prev.map((x) => ({ ...x, isSelected: !selected })));
      setError('상품 삭제에 실패했습니다.');
    }
  };

  const removeSelected = async () => {
    const selectedIds = items.filter((x) => x.isSelected).map((x) => x.cartItemId);
    if (selectedIds.length === 0) return;

    const prev = items;
    setItems((cur) => cur.filter((x) => !x.isSelected));

    try {
      await api.removeSelectedItems(selectedIds);
      fetchCartCount();
    } catch (e) {
      setItems(prev);
    }
  };

  // 주문
  const handleClickOrder = async () => {
    try {
      const selected = items.filter((x) => x.isSelected);
      if (selected.length === 0) {
        alert('주문할 상품을 선택해주세요.');
        return;
      }

      const payload: createOrderRequestDTO = {
        orderProductList: selected.map((x) => ({
          productDetailId: x.productDetailId,
          orderQuantity: x.quantity,
        })),
      };

      const res = await createOrder(payload);

      setCheckoutOrder(res.orderId);

      router.push('/checkout');
    } catch (e) {
      const message = e instanceof Error ? e.message : '주문 생성에 실패했습니다.';
      setError(message);
    }
  };

  const totals = useMemo(() => {
    const selectedItems = items.filter((x) => x.isSelected);
    const subtotal = selectedItems.reduce(
      (acc, x) => acc + (x.discountedPrice ?? x.basePrice) * x.quantity,
      0,
    );
    const shipping = 0;
    const total = subtotal + shipping;
    const selectedCount = selectedItems.reduce((acc, x) => acc + x.quantity, 0);
    return { subtotal, shipping, total, selectedCount };
  }, [items]);

  const allSelected = items.length > 0 && items.every((x) => x.isSelected);

  return {
    items,
    isLoading,
    error,
    clearError,
    totals,
    allSelected,
    removeItem,
    updateQty,
    toggleSelect,
    setAllSelected,
    removeSelected,
    handleClickOrder,
  };
}
