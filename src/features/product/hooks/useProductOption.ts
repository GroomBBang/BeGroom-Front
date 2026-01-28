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
    const found = details.find((d) => d.productDetailId === productDetailId);
    if (!found) return;

    setSelected((prev) => {
      const exists = prev.find((x) => x.productDetailId === productDetailId);
      if (exists) {
        return prev.map((x) =>
          x.productDetailId === productDetailId
            ? { ...x, qty: Math.min(x.quantity, x.qty + 1) }
            : x,
        );
      }
      return [...prev, { ...found, qty: 1 }];
    });
  };

  const dec = (id: number) => {
    setSelected((prev) =>
      prev.map((x) => (x.productDetailId === id ? { ...x, qty: Math.max(1, x.qty - 1) } : x)),
    );
  };

  const inc = (id: number) => {
    setSelected((prev) =>
      prev.map((x) =>
        x.productDetailId === id ? { ...x, qty: Math.min(x.quantity, x.qty + 1) } : x,
      ),
    );
  };

  const remove = (id: number) => {
    if (!hasOptions) return;
    setSelected((prev) => prev.filter((x) => x.productDetailId !== id));
  };

  const getUnitPrice = (d: { discountedPrice?: number; basePrice: number }) =>
    typeof d.discountedPrice === 'number' ? d.discountedPrice : d.basePrice;

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
