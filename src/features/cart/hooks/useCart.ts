// src/features/cart/hooks/useCart.ts
'use client';

import type { CartContextType, CartItemType } from '@/features/cart/types';
import type { Product } from '@/features/product/types';
import { useCallback, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'begroom_cart_v1';

function readStorage(): CartItemType[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItemType[]) : [];
  } catch {
    return [];
  }
}

function writeStorage(items: CartItemType[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

export function useCart(): CartContextType {
  const [items, setItems] = useState<CartItemType[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(readStorage());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writeStorage(items);
  }, [items, hydrated]);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const found = prev.find((x) => x.id === product.id);
      if (!found) {
        return [...prev, { ...product, quantity, selected: true }];
      }
      return prev.map((x) =>
        x.id === product.id ? { ...x, quantity: x.quantity + quantity, selected: true } : x,
      );
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const updateQty = useCallback((id: string, nextQty: number) => {
    setItems((prev) =>
      prev.map((x) => (x.id === id ? { ...x, quantity: Math.max(1, nextQty) } : x)),
    );
  }, []);

  const toggleSelect = useCallback((id: string) => {
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, selected: !x.selected } : x)));
  }, []);

  const setAllSelected = useCallback((selected: boolean) => {
    setItems((prev) => prev.map((x) => ({ ...x, selected })));
  }, []);

  const removeSelected = useCallback(() => {
    setItems((prev) => prev.filter((x) => !x.selected));
  }, []);

  const totals = useMemo(() => {
    const selectedItems = items.filter((x) => x.selected);
    const subtotal = selectedItems.reduce((acc, x) => acc + x.price * x.quantity, 0);
    const shipping = subtotal === 0 ? 0 : subtotal >= 40000 ? 0 : 3000;
    const total = subtotal + shipping;
    const selectedCount = selectedItems.reduce((acc, x) => acc + x.quantity, 0);
    return { subtotal, shipping, total, selectedCount };
  }, [items]);

  const allSelected = useMemo(() => items.length > 0 && items.every((x) => x.selected), [items]);

  return {
    items,
    totals,
    allSelected,
    addToCart,
    removeItem,
    updateQty,
    toggleSelect,
    setAllSelected,
    removeSelected,
  };
}
