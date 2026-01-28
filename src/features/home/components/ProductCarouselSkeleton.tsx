'use client';

export default function ProductCarouselSkeleton() {
  return (
    <div className="relative w-full">
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

function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      {/* 이미지 */}
      <div className="relative mb-2 overflow-hidden rounded bg-gray-100 aspect-[5/6]">
        <div className="h-full w-full bg-gray-200" />

        {/* 하트 버튼 자리 */}
        <div className="absolute right-2 top-2 h-9 w-9 rounded-full bg-white/90 shadow">
          <div className="flex h-full w-full items-center justify-center">
            <div className="h-5 w-5 rounded bg-gray-200" />
          </div>
        </div>
      </div>

      {/* 텍스트 영역 */}
      <div className="flex flex-col gap-2">
        {/* brand */}
        <div className="h-4 w-1/3 rounded bg-gray-200" />

        {/* name (2줄) */}
        <div className="h-5 w-11/12 rounded bg-gray-200" />
        <div className="h-5 w-8/12 rounded bg-gray-200" />

        {/* shortDescription */}
        <div className="h-4 w-10/12 rounded bg-gray-200" />

        {/* 가격 */}
        <div className="mt-1 flex items-center gap-2">
          <div className="h-6 w-12 rounded bg-gray-200" /> {/* 할인율 자리 */}
          <div className="h-6 w-24 rounded bg-gray-200" /> {/* 가격 자리 */}
        </div>

        {/* 좋아요 */}
        <div className="mt-1 flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-gray-200" />
          <div className="h-4 w-10 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
