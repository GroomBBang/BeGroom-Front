// src/features/cart/hooks/useCart.ts
'use client';

import cartAPI from '@/features/cart/apis/cart.api';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useCartStore } from '../stores/useCartStore';
import { CartContextType, CartItemType } from '../types/model';

export function useCart(): CartContextType {
  const [items, setItems] = useState<CartItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchCartCount = useCartStore((s) => s.fetchCartCount);

  const api = useMemo(() => cartAPI(), []);

  const refetch = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await api.fetchCart();
      setItems(data.groupItems[0].items);
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
    }
  };

  // 장바구니 수량 변경
  const updateQty = async (id: number, nextQty: number) => {
    const safeQty = Math.max(1, nextQty);
    const prev = items;

    setItems((cur) => cur.map((x) => (x.cartItemId === id ? { ...x, quantity: safeQty } : x)));

    try {
      await api.updateCartItemQty(id, safeQty);
    } catch (e) {
      setItems(prev);
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

  const totals = useMemo(() => {
    const selectedItems = items.filter((x) => x.isSelected);
    const subtotal = selectedItems.reduce(
      (acc, x) => acc + (x.discountedPrice ?? x.basePrice) * x.quantity,
      0,
    );
    const shipping = subtotal === 0 ? 0 : subtotal >= 40000 ? 0 : 3000;
    const total = subtotal + shipping;
    const selectedCount = selectedItems.reduce((acc, x) => acc + x.quantity, 0);
    return { subtotal, shipping, total, selectedCount };
  }, [items]);

  const allSelected = items.length > 0 && items.every((x) => x.isSelected);

  return {
    items,
    isLoading,
    totals,
    allSelected,
    removeItem,
    updateQty,
    toggleSelect,
    setAllSelected,
    removeSelected,
  };
}
