'use client';

import { useAddToCart } from '@/features/cart/hooks/useAddToCart';
import { formatWon } from '@/shared/lib/format';
import { Heart, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { Product } from '../types';

export default function ProductDetailMain({ product }: { product: Product }) {
  const { addToCart } = useAddToCart();

  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);

  const thumb = product.imageUrls[0];
  const linePrice = product.price * qty;

  const dec = () => setQty((v) => Math.max(1, v - 1));
  const inc = () => setQty((v) => Math.min(product.stock, v + 1));

  const hasDiscount =
    typeof product.originalPrice === 'number' && product.originalPrice > product.price;
  const discountRate = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <>
      {/* TOP */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[480px_1fr]">
        {/* LEFT: 대표 이미지 */}
        <section className="relative h-[550px] overflow-hidden rounded-xl border border-border bg-muted">
          {thumb ? (
            <img src={thumb} alt={product.title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              NO IMAGE
            </div>
          )}
        </section>

        {/* RIGHT: Info */}
        <section className="bg-background">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-muted-foreground">{product.categoryLabel}</div>

            <button
              type="button"
              onClick={() => setLiked((v) => !v)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer"
              aria-label="좋아요"
            >
              <Heart
                className={liked ? 'fill-orange-500 text-orange-500' : 'text-muted-foreground'}
                size={18}
              />
              <span>{product.likes + (liked ? 1 : 0)}명이 좋아합니다</span>
            </button>
          </div>

          <h1 className="mt-2 text-3xl font-bold text-foreground">{product.title}</h1>

          <p className="mt-3 text-sm text-muted-foreground">{product.description}</p>

          {/* ✅ 가격(할인 UI 적용) */}
          <div className="py-8">
            {hasDiscount ? (
              <div className="flex items-end gap-2">
                <span className="text-4xl font-extrabold text-orange-500">{discountRate}%</span>
                <span className="text-4xl font-bold text-foreground">
                  {formatWon(product.price)}
                </span>
                <span className="pb-1 text-sm text-muted-foreground">원</span>

                <span className="ml-2 pb-1 text-sm text-muted-foreground line-through">
                  {formatWon(product.originalPrice!)}
                </span>
              </div>
            ) : (
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold text-foreground">
                  {formatWon(product.price)}
                </span>
              </div>
            )}
          </div>

          {/* ✅ 쿠폰 제거 → 스크린샷처럼 나열형 정보 */}
          <div className="border-t border-border">
            <div className="grid grid-cols-[120px_1fr] border-b border-border py-6">
              <div className="text-sm font-medium text-muted-foreground">배송</div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-foreground">샛별배송</div>
              </div>
            </div>
            <div className="grid grid-cols-[120px_1fr] border-b border-border py-6">
              <div className="text-sm font-medium text-muted-foreground">판매자</div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-foreground">컬리</div>
              </div>
            </div>
            <div className="grid grid-cols-[120px_1fr] border-b border-border py-6">
              <div className="text-sm font-medium text-muted-foreground">포장타입</div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-foreground">상온 (종이포장)</div>
              </div>
            </div>

            <div className="grid grid-cols-[120px_1fr] items-center border-b border-border py-6">
              <div className="text-sm font-medium text-muted-foreground">수량</div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-foreground">
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

                    <div className="text-sm text-muted-foreground">재고: {product.stock}개</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 총액 */}
          <div className="mt-8 flex gap-4 items-end justify-end">
            <div className="text-sm font-medium text-muted-foreground">총 상품금액 :</div>
            <div className="text-2xl font-bold text-foreground">{formatWon(linePrice)}</div>
          </div>

          {/* CTA (아이콘 2개 + 큰 버튼) */}
          <div className="mt-4 flex items-center gap-3">
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

            <button
              type="button"
              onClick={() => addToCart(product.id, qty)}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-sm bg-primary-700 px-5 text-sm font-bold text-white transition-colors hover:bg-primary-800 cursor-pointer"
            >
              <ShoppingCart size={18} />
              장바구니 담기
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
