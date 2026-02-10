'use client';

import { formatWon } from '@/shared/lib/format';
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
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {product.shortDescription}
            </p>
          </div>
        ) : (
          <>
            <h2 className="mb-5 text-xl font-bold text-foreground">상품 정보</h2>

            <div className="overflow-hidden rounded-md border border-border bg-background">
              <div className="grid grid-cols-[160px_1fr] border-b border-border last:border-b-0">
                <div className="bg-muted px-6 py-4 text-sm font-medium text-muted-foreground">
                  브랜드
                </div>
                <div className="px-6 py-4 text-sm text-foreground">{product.brand}</div>
              </div>
              <div className="grid grid-cols-[160px_1fr] border-b border-border last:border-b-0">
                <div className="bg-muted px-6 py-4 text-sm font-medium text-muted-foreground">
                  판매가
                </div>
                <div className="px-6 py-4 text-sm text-foreground">
                  {formatWon(product.discountedPrice ?? product.salesPrice)}
                </div>
              </div>

              <div className="grid grid-cols-[160px_1fr] border-b border-border last:border-b-0">
                <div className="bg-muted px-6 py-4 text-sm font-medium text-muted-foreground">
                  정상가
                </div>
                <div className="px-6 py-4 text-sm text-foreground">
                  {formatWon(product.salesPrice)}
                </div>
              </div>

              <div className="grid grid-cols-[160px_1fr] border-b border-border last:border-b-0">
                <div className="bg-muted px-6 py-4 text-sm font-medium text-muted-foreground">
                  배송
                </div>
                <div className="px-6 py-4 text-sm text-foreground">샛별배송 (새벽 7시 전 도착)</div>
              </div>

              <div className="grid grid-cols-[160px_1fr] border-b border-border last:border-b-0">
                <div className="bg-muted px-6 py-4 text-sm font-medium text-muted-foreground">
                  배송비
                </div>
                <div className="px-6 py-4 text-sm text-foreground">무료배송</div>
              </div>

              <div className="grid grid-cols-[160px_1fr] border-b border-border last:border-b-0">
                <div className="bg-muted px-6 py-4 text-sm font-medium text-muted-foreground">
                  판매자
                </div>
                <div className="px-6 py-4 text-sm text-foreground">컬리</div>
              </div>
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
