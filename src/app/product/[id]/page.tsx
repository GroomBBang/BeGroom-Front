// src/app/product/[id]/page.tsx
'use client';

import { useCart } from '@/features/cart/hooks/useCart';
import { products } from '@/features/product/mocks/product';
import { formatWon } from '@/shared/lib/format';
import { ChevronLeft, ChevronRight, Download, Gift, Heart, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { use, useState } from 'react';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);

  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);

  const router = useRouter();
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-xl border border-border bg-background p-10 text-center text-muted-foreground">
          상품을 찾을 수 없어요.
        </div>
      </div>
    );
  }

  const price = product.price * qty;

  const dec = () => setQty((v) => Math.max(1, v - 1));
  const inc = () => setQty((v) => Math.min(99, v + 1));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid grid-cols-1 gap-15 lg:grid-cols-[480px_1fr]">
        {/* LEFT: Image */}
        <section className="relative h-[550px] overflow-hidden rounded-xl border border-border bg-muted">
          {/* 이미지 */}
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex aspect-[4/3] items-center justify-center text-sm text-muted-foreground">
              NO IMAGE
            </div>
          )}

          {/* 슬라이더 버튼(디자인용) */}
          <button
            type="button"
            aria-label="이전 이미지"
            className="absolute left-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-background/80 text-foreground shadow backdrop-blur hover:bg-background cursor-pointer"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="다음 이미지"
            className="absolute right-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-background/80 text-foreground shadow backdrop-blur hover:bg-background cursor-pointer"
          >
            <ChevronRight size={18} />
          </button>

          {/* 하단 도트(디자인용) */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className={[
                  'h-2 w-2 rounded-full',
                  i === 2 ? 'bg-background' : 'bg-background/40',
                ].join(' ')}
              />
            ))}
          </div>
        </section>

        {/* RIGHT: Info */}
        <section className="bg-background">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-muted-foreground">{product.categoryLabel}</div>
            <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
              <Heart
                className={liked ? 'fill-orange-500 text-orange-500' : 'text-muted-foreground'}
                size={18}
              />
              <span>{product.likes + (liked ? 1 : 0)}명이 좋아합니다</span>
            </div>
          </div>

          <h1 className="mt-2 text-3xl font-bold text-foreground">{product.title}</h1>

          <p className="mt-3 text-sm text-muted-foreground">
            달콤한 {product.title.replace(/\[.*?\]\s?/, '').slice(0, 10)}…
          </p>

          {/* 가격 */}
          <div className="flex items-end justify-between py-6">
            <div className="text-4xl font-bold text-foreground">{formatWon(product.price)}</div>
            {typeof product.originalPrice === 'number' && (
              <div className="text-sm text-muted-foreground line-through">
                {formatWon(product.originalPrice)}
              </div>
            )}
          </div>

          {/* 쿠폰 박스 */}
          <div className="rounded-xl border border-border bg-primary-50 p-5">
            <div className="flex items-center gap-2 text-sm font-bold text-foreground">
              <Gift size={18} className="text-primary-500" />
              <span className="text-primary-500">이 상품에 사용 가능한 쿠폰 (2개)</span>
            </div>

            <div className="mt-4 space-y-3">
              <CouponRow
                badge="5K"
                title="판매자 특가 할인"
                sub="30,000원 이상 · 2026. 1. 23.까지"
              />
              <CouponRow
                badge="10%"
                title="베스트 셀러 쿠폰"
                sub="50,000원 이상 · 2026. 1. 7.까지"
              />
            </div>
          </div>

          <div className="my-6 h-px bg-border" />

          {/* 수량 */}
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-muted-foreground">수량</div>

            <div className="flex items-center gap-4">
              <div className="inline-flex items-center overflow-hidden rounded-lg border border-border bg-background">
                <button
                  type="button"
                  onClick={dec}
                  className="grid h-10 w-12 place-items-center text-foreground hover:bg-muted cursor-pointer"
                  aria-label="수량 감소"
                >
                  −
                </button>
                <div className="grid h-10 w-12 place-items-center text-sm font-bold text-foreground">
                  {qty}
                </div>
                <button
                  type="button"
                  onClick={inc}
                  className="grid h-10 w-12 place-items-center text-foreground hover:bg-muted cursor-pointer"
                  aria-label="수량 증가"
                >
                  +
                </button>
              </div>

              <div className="text-sm text-muted-foreground">재고: 60개</div>
            </div>
          </div>

          <div className="my-6 h-px bg-border" />

          {/* 총액 */}
          <div className="flex items-center justify-between">
            <div className="text-sm font-bold text-muted-foreground">총 상품 금액</div>
            <div className="text-2xl font-bold text-foreground">{formatWon(price)}</div>
          </div>

          {/* CTA */}
          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                addToCart(product, qty); // qty만큼 담기
                router.push('/cart'); // 장바구니로 이동
              }}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-sm bg-primary-700 px-5 text-sm font-bold text-white transition-colors hover:bg-primary-800 cursor-pointer"
            >
              <ShoppingCart size={18} />
              장바구니 담기
            </button>

            <button
              type="button"
              onClick={() => setLiked((v) => !v)}
              className="grid h-12 w-12 place-items-center rounded-sm border border-border bg-background text-foreground hover:bg-muted cursor-pointer"
              aria-label="찜하기"
            >
              <Heart
                className={liked ? 'fill-orange-500 text-orange-500' : 'text-muted-foreground'}
              />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

function CouponRow({ badge, title, sub }: { badge: string; title: string; sub: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-primary-100 p-4">
      <div className="flex items-center gap-4">
        <div className="grid h-12 w-16 place-items-center rounded-sm bg-primary-500 text-lg font-extrabold text-white">
          {badge}
        </div>
        <div>
          <div className="text-sm font-bold text-foreground">{title}</div>
          <div className="mt-1 text-xs text-muted-foreground">{sub}</div>
        </div>
      </div>

      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-sm bg-primary-500 px-3 py-2 text-sm font-bold text-white hover:bg-primary-600 cursor-pointer"
      >
        <Download size={16} />
        받기
      </button>
    </div>
  );
}
