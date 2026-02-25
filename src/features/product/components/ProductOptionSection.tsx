// src/features/product/components/ProductOptionsSection.tsx
'use client';

import { formatWon } from '@/shared/lib/format';
import { useModalStore } from '@/shared/stores/useModalStore';
import { SelectedDetail } from '../types/model';

type Props = {
  hasOptions: boolean;
  details: Array<{
    id: number;
    name: string;
    isAvailable: boolean;
  }>;
  selected: SelectedDetail[];
  onSelectOption: (id: number) => void;
  dec: (id: number) => void;
  inc: (id: number) => void;
  remove: (id: number) => void;
  getUnitPrice: (d: { sellingPrice?: number; originalPrice: number }) => number;
};

export default function ProductOptionsSection({
  hasOptions,
  details,
  selected,
  onSelectOption,
  dec,
  inc,
  remove,
  getUnitPrice,
}: Props) {
  const { onAlertModal } = useModalStore();

  return (
    <div className="grid grid-cols-[120px_1fr] border-b border-border py-6">
      <div className="text-sm font-medium text-muted-foreground">구매 수량</div>

      <div className="space-y-3">
        {hasOptions && (
          <select
            className="h-12 w-full rounded-sm border border-border bg-background px-3 text-sm outline-none"
            defaultValue=""
            onChange={(e) => {
              const v = Number(e.target.value);
              if (!v) return;
              onSelectOption(v);
              e.currentTarget.value = '';
            }}
          >
            <option value="" disabled>
              상품을 선택해주세요
            </option>
            {details.map((d) => (
              <option key={d.id} value={d.id} disabled={!d.isAvailable}>
                {d.name}
              </option>
            ))}
          </select>
        )}

        {selected.map((s) => {
          const unit = getUnitPrice(s);
          return (
            <div key={s.id} className="rounded-sm border border-border bg-background p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="text-sm font-medium text-foreground">{s.name}</div>

                {hasOptions && (
                  <button
                    type="button"
                    onClick={() => remove(s.id)}
                    className="text-muted-foreground hover:text-foreground"
                    aria-label="옵션 제거"
                  >
                    ×
                  </button>
                )}
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="inline-flex items-center overflow-hidden rounded-sm border border-border bg-background">
                  <button
                    type="button"
                    disabled={s.qty === 1}
                    onClick={() => dec(s.id)}
                    className="grid h-10 w-12 place-items-center text-foreground hover:bg-muted cursor-pointer disabled:cursor-not-allowed disabled:text-muted-foreground disabled:hover:bg-transparent"
                    aria-label="수량 감소"
                  >
                    −
                  </button>
                  <div className="grid h-10 w-12 place-items-center text-sm font-bold text-foreground">
                    {s.qty}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (s.qty >= s.stock) {
                        onAlertModal('선택하신 상품의 재고가 부족합니다.');
                        return;
                      }
                      inc(s.id);
                    }}
                    className="grid h-10 w-12 place-items-center text-foreground hover:bg-muted cursor-pointer"
                    aria-label="수량 증가"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <div className="text-sm font-bold text-foreground">{formatWon(unit * s.qty)}</div>
                  {typeof s.sellingPrice === 'number' && s.sellingPrice < s.originalPrice && (
                    <div className="text-xs text-muted-foreground line-through">
                      {formatWon(s.originalPrice * s.qty)}원
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-2 text-xs text-muted-foreground">재고: {s.stock}개</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
