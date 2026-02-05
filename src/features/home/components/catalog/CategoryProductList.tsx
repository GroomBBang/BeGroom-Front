'use client';

import { ProductCardType } from '@/features/product/types/model';
import { useMemo, useState } from 'react';
import CategoryProductCard from './CategoryProductCard';

const PAGE_SIZE = 6;

export default function CategoryProductList({ products }: { products: ProductCardType[] }) {
  const items = useMemo(() => products ?? [], [products]);
  const pageCount = Math.ceil(items.length / PAGE_SIZE);

  const [pageIndex, setPageIndex] = useState(0);

  const visibleProducts = useMemo(() => {
    const start = pageIndex * PAGE_SIZE;
    return items.slice(start, start + PAGE_SIZE);
  }, [items, pageIndex]);

  if (items.length === 0) return null;

  const next = () => setPageIndex((p) => (p + 1) % pageCount);
  const prev = () => setPageIndex((p) => (p - 1 + pageCount) % pageCount);

  return (
    <div className="h-full relative">
      {/* 3 x 2 리스트 */}
      <div className="grid grid-cols-3 py-2">
        {visibleProducts.map((product) => (
          <div key={product.productId} className="flex flex-col">
            <CategoryProductCard product={product} />
          </div>
        ))}
      </div>

      {/* 컨트롤 */}
      <button
        type="button"
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/40 px-3 py-2 text-black hover:bg-white/90"
        aria-label="이전 배너"
      >
        ‹
      </button>

      <button
        type="button"
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/40 px-3 py-2 text-black hover:bg-white/90"
        aria-label="다음 배너"
      >
        ›
      </button>
    </div>
  );
}
