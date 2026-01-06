'use client';

type Props = {
  /** 1부터 시작하는 현재 페이지 */
  page: number;
  /** 전체 페이지 수 */
  totalPages: number;
  /** 페이지 변경 콜백 (1부터 시작하는 page로 호출) */
  onChange: (page: number) => void;

  /** 한 번에 보여줄 페이지 버튼 개수 (기본 10) */
  pageSize?: number;
  className?: string;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function Pagination({
  page,
  totalPages,
  onChange,
  pageSize = 10,
  className,
}: Props) {
  if (totalPages <= 1) return null;

  const current = clamp(page, 1, totalPages);

  // 1..10 / 11..20 이런 식으로 묶어서 표시
  const groupIndex = Math.floor((current - 1) / pageSize);
  const start = groupIndex * pageSize + 1;
  const end = Math.min(start + pageSize - 1, totalPages);

  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const canPrev = current > 1;
  const canNext = current < totalPages;

  const go = (next: number) => onChange(clamp(next, 1, totalPages));

  const baseBtn =
    'min-w-10 h-10 px-3 border border-gray-200 text-sm flex items-center justify-center select-none';
  const normalBtn = `${baseBtn} text-gray-700 hover:bg-gray-50`;
  const activeBtn = `${baseBtn} font-bold text-[#5f0080]`;
  const disabledBtn = `${baseBtn} text-gray-300 cursor-not-allowed bg-gray-50`;

  return (
    <nav className={className}>
      <div className="flex justify-center">
        <div className="inline-flex overflow-hidden rounded border border-gray-200 bg-white">
          {/* 맨 처음 */}
          <button
            type="button"
            onClick={() => go(1)}
            disabled={!canPrev}
            className={!canPrev ? disabledBtn : normalBtn}
            aria-label="첫 페이지"
          >
            «
          </button>

          {/* 이전 */}
          <button
            type="button"
            onClick={() => go(current - 1)}
            disabled={!canPrev}
            className={!canPrev ? disabledBtn : normalBtn}
            aria-label="이전 페이지"
          >
            ‹
          </button>

          {/* 페이지 번호 */}
          {pages.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => go(p)}
              className={p === current ? activeBtn : normalBtn}
              aria-current={p === current ? 'page' : undefined}
            >
              {p}
            </button>
          ))}

          {/* 다음 */}
          <button
            type="button"
            onClick={() => go(current + 1)}
            disabled={!canNext}
            className={!canNext ? disabledBtn : normalBtn}
            aria-label="다음 페이지"
          >
            ›
          </button>

          {/* 맨 끝 */}
          <button
            type="button"
            onClick={() => go(totalPages)}
            disabled={!canNext}
            className={!canNext ? disabledBtn : normalBtn}
            aria-label="마지막 페이지"
          >
            »
          </button>
        </div>
      </div>
    </nav>
  );
}
