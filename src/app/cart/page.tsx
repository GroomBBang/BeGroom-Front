// src/app/cart/page.tsx
'use client';

import { useCart } from '@/features/cart/hooks/useCart';
import { formatWon } from '@/shared/lib/format';
import { Trash2, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const {
    items,
    totals,
    allSelected,
    toggleSelect,
    setAllSelected,
    removeSelected,
    removeItem,
    updateQty,
  } = useCart();

  const isEmpty = items.length === 0;

  const router = useRouter();

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-foreground">장바구니</h1>

      {isEmpty ? (
        <div className="rounded-xl border border-border bg-background p-16 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-muted text-muted-foreground">
            🛍️
          </div>
          <div className="text-sm text-muted-foreground">장바구니가 비어있습니다</div>
          <Link
            href="/"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-primary-700 px-6 text-sm font-bold text-white hover:bg-primary-800"
          >
            쇼핑 계속하기
          </Link>
        </div>
      ) : (
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
                <div key={item.id} className="rounded-md border border-border bg-background p-5">
                  <div className="flex gap-4">
                    <input
                      type="checkbox"
                      checked={item.selected}
                      onChange={() => toggleSelect(item.id)}
                      className="mt-2 h-4 w-4"
                    />

                    {/* 이미지 */}
                    <div className="h-20 w-20 overflow-hidden rounded-md bg-muted">
                      {item.imageUrls.length > 0 ? (
                        <img
                          src={item.imageUrls[0]}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>

                    {/* 내용 */}
                    <div className="flex flex-1 items-start justify-between gap-4">
                      <div>
                        <div className="text-xs text-muted-foreground">{item.categoryLabel}</div>
                        <div className="mt-1 text-sm font-bold text-foreground">{item.title}</div>

                        {/* 수량 */}
                        <div className="mt-3 inline-flex items-center overflow-hidden rounded-sm border border-border">
                          <button
                            type="button"
                            onClick={() => updateQty(item.id, item.quantity - 1)}
                            className="grid h-9 w-10 place-items-center hover:bg-muted"
                          >
                            −
                          </button>
                          <div className="grid h-9 w-10 place-items-center text-sm font-bold">
                            {item.quantity}
                          </div>
                          <button
                            type="button"
                            onClick={() => updateQty(item.id, item.quantity + 1)}
                            className="grid h-9 w-10 place-items-center hover:bg-muted"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* 가격 + 삭제 */}
                      <div className="flex flex-col items-end gap-2">
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
                          aria-label="삭제"
                        >
                          <X size={18} />
                        </button>

                        <div className="mt-6 text-lg font-bold text-foreground">
                          {formatWon(item.price * item.quantity)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* RIGHT: 주문 요약 */}
          <aside className="h-fit rounded-md border border-border bg-background p-6">
            <h2 className="text-lg font-bold text-foreground">주문 요약</h2>

            <div className="mt-5 space-y-3 text-sm">
              <Row label="상품 금액" value={formatWon(totals.subtotal)} />
              <Row label="배송비" value={formatWon(totals.shipping)} />
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

          {/* 추천 영역(시안 하단 박스 느낌) */}
          <div className="mt-8 col-span-2">
            <h2 className="mb-3 text-lg font-bold text-foreground">이런 상품은 어떠세요?</h2>
            <div className="rounded-md border border-border bg-background p-16 text-center text-sm text-muted-foreground">
              추천 상품이 곧 업데이트됩니다
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-muted-foreground">{label}</div>
      <div className="font-medium text-foreground">{value}</div>
    </div>
  );
}
