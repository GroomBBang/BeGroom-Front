// src/features/cart/hooks/useCart.ts
'use client';

import cartAPI from '@/features/cart/apis/cart.api';
import type { CartContextType, CartItemType } from '@/features/cart/types';
import { useCallback, useEffect, useMemo, useState } from 'react';

export function useCart(): CartContextType {
  const [items, setItems] = useState<CartItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const api = useMemo(() => cartAPI(), []);

  const refetch = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await api.fetchCart();
      setItems(data.items);
    } finally {
      setIsLoading(false);
    }
  }, [api]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const removeItem = async (id: string) => {
    const prev = items;
    setItems((cur) => cur.filter((x) => x.id !== id));

    try {
      await api.removeCartItem(id);
    } catch (e) {
      setItems(prev);
    }
  };

  const updateQty = async (id: string, nextQty: number) => {
    const safeQty = Math.max(1, nextQty);
    const prev = items;

    setItems((cur) => cur.map((x) => (x.id === id ? { ...x, quantity: safeQty } : x)));

    try {
      await api.updateCartItemQty(id, safeQty);
    } catch (e) {
      setItems(prev);
    }
  };

  const toggleSelect = (id: string) => {
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, selected: !x.selected } : x)));
  };

  const setAllSelected = (selected: boolean) => {
    setItems((prev) => prev.map((x) => ({ ...x, selected })));
  };

  const removeSelected = async () => {
    const selectedIds = items.filter((x) => x.selected).map((x) => x.id);
    if (selectedIds.length === 0) return;

    const prev = items;
    setItems((cur) => cur.filter((x) => !x.selected));

    try {
      await api.removeSelectedItems(selectedIds); // DELETE /cart/items body: { ids }
    } catch (e) {
      setItems(prev);
    }
  };

  const totals = useMemo(() => {
    const selectedItems = items.filter((x) => x.selected);
    const subtotal = selectedItems.reduce((acc, x) => acc + x.price * x.quantity, 0);
    const shipping = subtotal === 0 ? 0 : subtotal >= 40000 ? 0 : 3000;
    const total = subtotal + shipping;
    const selectedCount = selectedItems.reduce((acc, x) => acc + x.quantity, 0);
    return { subtotal, shipping, total, selectedCount };
  }, [items]);

  const allSelected = items.length > 0 && items.every((x) => x.selected);

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
