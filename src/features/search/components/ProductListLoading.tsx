'use client';

/**
 * 단일 상품 카드 스켈레톤
 */
function SkeletonItem() {
  return (
    <div className="group">
      {/* 이미지 영역 */}
      <div className="mb-2 overflow-hidden rounded bg-gray-100 aspect-[5/6]">
        <div className="h-full w-full animate-pulse bg-gray-200" />
      </div>

      {/* 텍스트 영역 */}
      <div className="flex flex-col gap-2">
        {/* 브랜드 */}
        <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />

        {/* 상품명 2줄 */}
        <div className="space-y-2">
          <div className="h-5 w-full animate-pulse rounded bg-gray-200" />
        </div>

        {/* 설명 */}
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />

        {/* 가격 영역 */}
        <div className="flex items-center gap-2">
          <div className="h-6 w-12 animate-pulse rounded bg-gray-200" />
          <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
        </div>

        {/* 좋아요 영역 */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-10 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

/**
 * 상품 리스트 스켈레톤 (그리드)
 */
export default function ProductListLoading({ count = 9 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonItem key={i} />
      ))}
    </div>
  );
}
