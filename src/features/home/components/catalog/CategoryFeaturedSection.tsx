// components/home/CategoryFeaturedSection.tsx
'use client';

import { ProductCardType } from '@/features/product/types/model';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

type Props = {
  products: ProductCardType[]; // 총 6개
};

export default function CategoryFeaturedSection({ products }: Props) {
  const items = useMemo(() => products ?? [], [products]);
  const total = items.length;

  const [index, setIndex] = useState(0);

  if (total === 0) return null;

  const next = () => setIndex((prev) => (prev + 1) % total);
  const prev = () => setIndex((prev) => (prev - 1 + total) % total);

  return (
    <div className="relative h-full w-[360px] overflow-hidden bg-gray-100">
      {/* 슬라이드 트랙 */}
      <div
        className="flex h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {items.map((p) => {
          const productId = (p as any).productId ?? (p as any).id;
          const imageUrl = (p as any).mainImageUrl ?? (p as any).imageUrl ?? '';
          const name = p.name;

          return (
            <Link
              key={String(productId)}
              href={`/products/${productId}`}
              className="relative h-full w-full shrink-0"
            >
              <Image src={imageUrl} alt={name} fill className="object-cover" sizes="360px" />

              {/* 가운데 문구 */}
              <div className="absolute inset-x-0 bottom-10 flex justify-center px-6">
                <div className="w-full max-w-[520px] rounded-sm bg-white/60 px-6 py-4 text-center">
                  <p className="text-lg font-bold text-black">{name}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* 좌 버튼 */}
      <button
        type="button"
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/40 px-3 py-2 text-black hover:bg-white/90"
        aria-label="이전 배너"
      >
        ‹
      </button>

      {/* 우 버튼 */}
      <button
        type="button"
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/40 px-3 py-2 text-black hover:bg-white/90"
        aria-label="다음 배너"
      >
        ›
      </button>

      {/* 인디케이터 점 */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full ${i === index ? 'bg-white' : 'bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  );
}
