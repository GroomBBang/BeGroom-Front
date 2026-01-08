'use client';

import { formatWon } from '@/shared/lib/format';
import { X } from 'lucide-react';
import type { CartActionsType, CartItemType } from '../types/model';

type ItemActions = Pick<CartActionsType, 'toggleSelect' | 'updateQty' | 'removeItem'>;

type Props = {
  item: CartItemType;
  actions: ItemActions;
};

export default function CartItemCard({ item, actions }: Props) {
  const { toggleSelect, updateQty, removeItem } = actions;

  return (
    <div className="rounded-md border border-border bg-background p-5">
      <div className="flex gap-4">
        <input
          type="checkbox"
          checked={item.isSelected}
          onChange={() => toggleSelect(item.cartItemId)}
          className="mt-2 h-4 w-4"
        />

        {/* 이미지 */}
        <div className="h-20 w-20 overflow-hidden rounded-md bg-muted">
          {item.mainImageUrl ? (
            <img
              src={item.mainImageUrl}
              alt={item.productName}
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>

        {/* 내용 */}
        <div className="flex flex-1 items-start justify-between gap-4">
          <div>
            <div className="text-xs text-muted-foreground">{item.productName}</div>
            <div className="mt-1 text-sm font-bold text-foreground">{item.productDetailName}</div>

            {/* 수량 */}
            <div className="mt-3 inline-flex items-center overflow-hidden rounded-sm border border-border">
              <button
                type="button"
                onClick={() => updateQty(item.cartItemId, item.quantity - 1)}
                className="grid h-9 w-10 place-items-center hover:bg-muted cursor-pointer"
              >
                −
              </button>
              <div className="grid h-9 w-10 place-items-center text-sm font-bold">
                {item.quantity}
              </div>
              <button
                type="button"
                onClick={() => updateQty(item.cartItemId, item.quantity + 1)}
                className="grid h-9 w-10 place-items-center hover:bg-muted cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          {/* 가격 + 삭제 */}
          <div className="flex flex-col items-end gap-2">
            <button
              type="button"
              onClick={() => {
                removeItem(item.cartItemId);
              }}
              className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="삭제"
            >
              <X size={18} />
            </button>

            <div className="mt-6 text-lg font-bold text-foreground">
              {formatWon((item.discountedPrice ?? item.basePrice) * item.quantity)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
