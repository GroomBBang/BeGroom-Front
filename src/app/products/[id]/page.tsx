// src/app/product/[id]/page.tsx
'use client';

import { useCart } from '@/features/cart/hooks/useCart';
import { products } from '@/features/product/mocks/product';
import { useRecentProducts } from '@/features/user/hooks/useRecentProducts';
import { formatWon } from '@/shared/lib/format';
import { ChevronLeft, ChevronRight, Download, Gift, Heart, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { use, useEffect, useMemo, useState } from 'react';

type TabKey = 'desc' | 'info';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { addProduct } = useRecentProducts();

  const product = useMemo(() => products.find((p) => p.id === id), [id]);

  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);

  const router = useRouter();
  const { addToCart } = useCart();

  useEffect(() => {
    if (product) {
      addProduct({
        id: Number(product.id),
        thumb: product.imageUrls[0],
        time: Date.now(),
      });
    }
  }, [product]);

  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-xl border border-border bg-background p-10 text-center text-muted-foreground">
          상품을 찾을 수 없어요.
        </div>
      </div>
    );
  }

  const images = (product.imageUrls ?? []).slice(0, 5);
  const heroImage = images[0];

  const price = product.price * qty;
  const dec = () => setQty((v) => Math.max(1, v - 1));
  const inc = () => setQty((v) => Math.min(99, v + 1));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* TOP */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[480px_1fr]">
        {/* LEFT: 대표 이미지 */}
        <section className="relative h-[550px] overflow-hidden rounded-xl border border-border bg-muted">
          {heroImage ? (
            <img src={heroImage} alt={product.title} className="h-full w-full object-cover" />
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

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart
                className={liked ? 'fill-orange-500 text-orange-500' : 'text-muted-foreground'}
                size={18}
              />
              <span>{product.likes + (liked ? 1 : 0)}명이 좋아합니다</span>
            </div>
          </div>

          <h1 className="mt-2 text-3xl font-bold text-foreground">{product.title}</h1>

          <p className="mt-3 text-sm text-muted-foreground">{product.description}</p>

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
              <span className="text-primary-700">이 상품에 사용 가능한 쿠폰 (2개)</span>
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
                addToCart(product, qty);
                router.push('/cart');
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

      {/* BOTTOM: Tabs */}
      <DetailTabs product={product} images={images} />
    </div>
  );
}

/* ======================
   Tabs Section
====================== */

function DetailTabs({
  product,
  images,
}: {
  product: {
    description: string;
    categoryLabel: string;
    price: number;
    originalPrice?: number;
  };
  images: string[];
}) {
  const [tab, setTab] = useState<TabKey>('desc');

  return (
    <section className="mt-12">
      {/* 탭 헤더 */}
      <div className="border-b border-border">
        <div className="flex gap-8">
          <button
            type="button"
            onClick={() => setTab('desc')}
            className={[
              'relative py-4 text-sm font-bold transition-colors',
              tab === 'desc' ? 'text-primary-700' : 'text-muted-foreground hover:text-foreground',
            ].join(' ')}
          >
            상품설명
            {tab === 'desc' && (
              <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-primary-700" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setTab('info')}
            className={[
              'relative py-4 text-sm font-bold transition-colors',
              tab === 'info' ? 'text-primary-700' : 'text-muted-foreground hover:text-foreground',
            ].join(' ')}
          >
            상품정보
            {tab === 'info' && (
              <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-primary-700" />
            )}
          </button>
        </div>
      </div>

      {/* 탭 내용 */}
      <div className="py-8">
        {tab === 'desc' ? (
          <div className="flex flex-col gap-4">
            <ImageCarousel images={images} />
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>
          </div>
        ) : (
          <>
            <h2 className="mb-5 text-xl font-bold text-foreground">상품 정보</h2>

            <div className="overflow-hidden rounded-md border border-border bg-background">
              <InfoRow label="카테고리" value={product.categoryLabel} />
              <InfoRow label="판매가" value={formatWon(product.price)} />
              <InfoRow
                label="정상가"
                value={
                  typeof product.originalPrice === 'number' ? formatWon(product.originalPrice) : '-'
                }
              />
              <InfoRow label="재고" value="50개" />
              <InfoRow label="배송" value="샛별배송 (새벽 7시 전 도착)" />
              <InfoRow label="배송비" value="40,000원 이상 무료배송" />
              <InfoRow label="포장 타입" value="냉장 포장" />
              <InfoRow label="판매자" value="컬리" />
            </div>

            <div className="mt-8 rounded-md bg-primary-50 p-6">
              <div className="text-sm font-bold text-primary-700">안내사항</div>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                <li>신선식품 특성상 배송 후 교환 및 반품이 어려울 수 있습니다.</li>
                <li>상품 이미지는 연출컷이며 실제와 다를 수 있습니다.</li>
                <li>배송일 기준 유통기한 5일 이상 남은 제품으로 발송됩니다.</li>
              </ul>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

/* ======================
   Image Carousel (max 5)
====================== */

function ImageCarousel({ images }: { images: string[] }) {
  const safe = images.slice(0, 5);
  const [idx, setIdx] = useState(0);

  if (safe.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-background p-16 text-center text-sm text-muted-foreground">
        상세 이미지가 없어요.
      </div>
    );
  }

  const prev = () => setIdx((v) => (v - 1 + safe.length) % safe.length);
  const next = () => setIdx((v) => (v + 1) % safe.length);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background">
      <div className="relative h-[520px] bg-muted">
        <img
          src={safe[idx]}
          alt={`상세 이미지 ${idx + 1}`}
          className="h-full w-full object-cover"
        />

        <button
          type="button"
          onClick={prev}
          aria-label="이전 이미지"
          className="absolute left-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-background/80 text-foreground shadow backdrop-blur hover:bg-background cursor-pointer"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          type="button"
          onClick={next}
          aria-label="다음 이미지"
          className="absolute right-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-background/80 text-foreground shadow backdrop-blur hover:bg-background cursor-pointer"
        >
          <ChevronRight size={18} />
        </button>

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {safe.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIdx(i)}
              className={[
                'h-2 w-2 rounded-full transition',
                i === idx ? 'bg-background' : 'bg-background/40 hover:bg-background/70',
              ].join(' ')}
              aria-label={`이미지 ${i + 1}로 이동`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ======================
   Info Table Row
====================== */

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[160px_1fr] border-b border-border last:border-b-0">
      <div className="bg-muted px-6 py-4 text-sm font-medium text-muted-foreground">{label}</div>
      <div className="px-6 py-4 text-sm text-foreground">{value}</div>
    </div>
  );
}

/* ======================
   Coupon Row
====================== */

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
