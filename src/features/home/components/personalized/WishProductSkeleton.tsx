'use client';

import ProductCardSkeleton from '@/features/product/components/ProductCardSceleton';

export default function WishProductSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="h-6 w-40 rounded-md bg-gray-200 animate-pulse" />
        <div className="h-4 w-16 rounded-md bg-gray-200 animate-pulse" />
      </div>

      <div className="overflow-hidden">
        <ul className="flex gap-4 pb-2 items-start">
          {Array.from({ length: 4 }).map((_, idx) => (
            <li key={idx} className="shrink-0 basis-[calc((100%-3rem)/4)]">
              <ProductCardSkeleton />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
