'use client';

export default function PopularProductsSkeleton() {
  return (
    <aside className="flex flex-col gap-6" aria-busy="true" aria-live="polite">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight">실시간 인기 제품</h2>
        <span className="h-4 w-14 rounded bg-gray-200" />
      </div>

      {/* 리스트 */}
      <div className="flex flex-col gap-2">
        {Array.from({ length: 12 }).map((_, idx) => (
          <PopularProductCardSkeleton key={idx} />
        ))}
      </div>

      {/* 하단 버튼 */}
      <div className="flex items-center justify-center px-6">
        <div className="h-11 w-full rounded-full border bg-gray-50" />
      </div>
    </aside>
  );
}

function PopularProductCardSkeleton() {
  return (
    <div className="flex gap-3 rounded-2xl p-1">
      {/* 썸네일 */}
      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md bg-gray-200" />

      {/* 랭킹 */}
      <div className="w-4 shrink-0">
        <div className="mt-1 h-4 w-4 rounded bg-gray-200" />
      </div>

      {/* 텍스트 */}
      <div className="min-w-0 flex-1 flex flex-col">
        {/* brand */}
        <div className="h-3 w-20 rounded bg-gray-200" />

        {/* name (2줄 느낌) */}
        <div className="mt-2 h-4 w-4/5 rounded bg-gray-200" />
        <div className="mt-2 h-4 w-3/5 rounded bg-gray-200" />

        {/* 가격 영역 */}
        <div className="mt-3 flex items-baseline gap-2">
          <div className="h-3 w-12 rounded bg-gray-200" />
          <div className="h-4 w-20 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
