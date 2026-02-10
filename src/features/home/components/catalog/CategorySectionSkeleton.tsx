// components/home/CategorySectionSkeleton.tsx
'use client';

export default function CategorySectionSkeleton() {
  return (
    <div
      className="flex gap-4 h-[500px] border-t border-t-primary-100 border-t-[3px]
                 border-b border-b-gray-300 border-b-[1px] animate-pulse"
      aria-busy="true"
      aria-label="카테고리 섹션 로딩 중"
    >
      {/* 좌측 영역 */}
      <div className="w-[200px] flex flex-col gap-6 py-3 pl-5">
        <div className="space-y-2">
          <div className="h-6 w-28 rounded bg-gray-200" /> {/* 카테고리 타이틀 */}
          <div className="h-3 w-16 rounded bg-gray-200" /> {/* 바로가기 */}
        </div>

        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-6 w-16 rounded-full bg-gray-200" />
          ))}
        </div>
      </div>

      {/* 가운데 배너 영역 */}
      <div className="relative h-full w-[360px] overflow-hidden bg-gray-100">
        <div className="absolute inset-0 bg-gray-200" />
        <div className="absolute inset-x-0 bottom-10 flex justify-center px-6">
          <div className="h-16 w-full max-w-[520px] rounded-sm bg-white/60" />
        </div>
        <div className="absolute left-2 top-1/2 h-10 w-10 -translate-y-1/2 rounded bg-white/50" />
        <div className="absolute right-2 top-1/2 h-10 w-10 -translate-y-1/2 rounded bg-white/50" />
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-2 w-2 rounded-full bg-white/50" />
          ))}
        </div>
      </div>

      {/* 우측 상품 리스트 영역 */}
      <div className="flex-1 overflow-hidden relative">
        <div className="grid grid-cols-3 py-2 gap-y-4 px-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2 px-2">
              <div className="h-45 w-full rounded bg-gray-200" />
              <div className="h-3 w-4/5 rounded bg-gray-200" />
              <div className="h-3 w-2/5 rounded bg-gray-200" />
            </div>
          ))}
        </div>

        {/* 좌/우 버튼 자리만 */}
        <div className="absolute left-0 top-1/2 h-10 w-10 -translate-y-1/2 rounded bg-white/50" />
        <div className="absolute right-0 top-1/2 h-10 w-10 -translate-y-1/2 rounded bg-white/50" />
      </div>
    </div>
  );
}
