// src/features/product/hooks/useProductOptions.ts
'use client';

import { useMemo, useState } from 'react';
import { SelectedDetail } from '../types/model';

type Props = Omit<SelectedDetail, 'qty'>;

export function useProductOptions(detailsInput: Props[] | undefined) {
  const details = detailsInput ?? [];
  const hasOptions = details.length > 1;
  const singleDetail = details.length === 1 ? details[0] : null;

  const [selected, setSelected] = useState<SelectedDetail[]>(() => {
    if (!singleDetail) return [];
    return [{ ...singleDetail, qty: 1 }];
  });

  const onSelectOption = (productDetailId: number) => {
    const found = details.find((d) => d.id === productDetailId);
    if (!found) return;

    setSelected((prev) => {
      const exists = prev.find((x) => x.id === productDetailId);
      if (exists) {
        return prev.map((x) =>
          x.id === productDetailId ? { ...x, qty: Math.min(x.stock, x.qty + 1) } : x,
        );
      }
      return [...prev, { ...found, qty: 1 }];
    });
  };

  const dec = (id: number) => {
    setSelected((prev) =>
      prev.map((x) => (x.id === id ? { ...x, qty: Math.max(1, x.qty - 1) } : x)),
    );
  };

  const inc = (id: number) => {
    setSelected((prev) =>
      prev.map((x) => (x.id === id ? { ...x, qty: Math.min(x.stock, x.qty + 1) } : x)),
    );
  };

  const remove = (id: number) => {
    if (!hasOptions) return;
    setSelected((prev) => prev.filter((x) => x.id !== id));
  };

  const getUnitPrice = (d: { sellingPrice?: number; originalPrice: number }) =>
    typeof d.sellingPrice === 'number' ? d.sellingPrice : d.originalPrice;

  const totalPrice = useMemo(() => {
    return selected.reduce((acc, cur) => acc + getUnitPrice(cur) * cur.qty, 0);
  }, [selected]);

  return {
    details,
    hasOptions,
    selected,
    onSelectOption,
    dec,
    inc,
    remove,
    totalPrice,
    getUnitPrice,
  };
}
