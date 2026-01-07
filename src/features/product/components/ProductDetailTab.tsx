'use client';

import { formatWon } from '@/shared/lib/format';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { ProductType, TabKey } from '../types/model';

export default function ProductDetailTab({ product }: { product: ProductType }) {
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
            <ImageCarousel images={product.detailImageUrls} />
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {product.shortDescription}
            </p>
          </div>
        ) : (
          <>
            <h2 className="mb-5 text-xl font-bold text-foreground">상품 정보</h2>

            <div className="overflow-hidden rounded-md border border-border bg-background">
              <InfoRow label="브랜드" value={product.brand} />
              <InfoRow
                label="판매가"
                value={formatWon(product.discountedPrice ?? product.salesPrice)}
              />
              <InfoRow label="정상가" value={formatWon(product.salesPrice)} />
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
   Info Table Row (탭 영역에서 사용)
====================== */

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[160px_1fr] border-b border-border last:border-b-0">
      <div className="bg-muted px-6 py-4 text-sm font-medium text-muted-foreground">{label}</div>
      <div className="px-6 py-4 text-sm text-foreground">{value}</div>
    </div>
  );
}
