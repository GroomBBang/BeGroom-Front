'use client';

import { formatWon } from '@/shared/lib/format';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { CartContextType } from '../types';
import CartItemCard from './CartItem';
import CartRecommend from './CartRecommend';

export default function CartMain({ cart }: { cart: CartContextType }) {
  const {
    items,
    totals,
    allSelected,
    toggleSelect,
    setAllSelected,
    removeSelected,
    removeItem,
    updateQty,
  } = cart;

  const router = useRouter();
  return (
    <div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
        {/* LEFT */}
        <section>
          {/* 상단 선택/삭제 바 */}
          <div className="mb-4 rounded-md border border-border bg-background px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm">
                <label className="inline-flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={(e) => setAllSelected(e.target.checked)}
                    className="h-4 w-4"
                  />
                  <span className="text-foreground">
                    전체 선택 ({items.filter((x) => x.selected).length}/{items.length})
                  </span>
                </label>

                <button
                  type="button"
                  onClick={removeSelected}
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  <Trash2 size={16} />
                  선택 삭제
                </button>
              </div>

              <div className="text-sm text-muted-foreground">총 {items.length}개 상품</div>
            </div>
          </div>

          {/* 아이템 목록 */}
          <div className="space-y-4">
            {items.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                actions={{ toggleSelect, updateQty, removeItem }}
              />
            ))}
          </div>
        </section>

        {/* RIGHT: 주문 요약 */}
        <aside className="h-fit rounded-md border border-border bg-background p-6">
          <h2 className="text-lg font-bold text-foreground">주문 요약</h2>

          <div className="mt-5 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <div className="text-muted-foreground">상품 금액</div>
              <div className="font-medium text-foreground">{formatWon(totals.subtotal)}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-muted-foreground">배송비</div>
              <div className="font-medium text-foreground">{formatWon(totals.shipping)}</div>
            </div>
          </div>

          <div className="mt-4 rounded-md bg-primary-50 px-4 py-3 text-sm text-primary-700">
            {totals.subtotal >= 40000
              ? '무료배송 대상입니다'
              : `${formatWon(40000 - totals.subtotal)} 추가 주문 시 무료배송`}
          </div>

          <div className="my-5 h-px bg-border" />

          <div className="flex items-end justify-between">
            <div className="text-sm font-bold text-muted-foreground">총 결제 금액</div>
            <div className="text-2xl font-bold text-foreground">{formatWon(totals.total)}</div>
          </div>

          <button
            type="button"
            onClick={() => router.push('/checkout')}
            className="mt-6 h-12 w-full rounded-sm bg-primary-700 text-sm font-bold text-white hover:bg-primary-800 cursor-pointer"
          >
            {totals.selectedCount}개 상품 주문하기
          </button>

          <ul className="mt-5 list-disc space-y-2 pl-5 text-xs text-muted-foreground">
            <li>샛별배송: 새벽 7시 전 도착</li>
            <li>40,000원 이상 무료배송</li>
            <li>신선식품 품질 보증</li>
          </ul>
        </aside>
      </div>
      <CartRecommend />
    </div>
  );
}
