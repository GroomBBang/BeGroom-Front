'use client';

import myAPI from '@/features/user/apis/my.api';
import { MyWishResponseDTO } from '@/features/user/types/response';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import WishProductCard from './WishProductCard';
import WishProductSkeleton from './WishProductSkeleton';

const GAP = 16;

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

export default function WishProductsSection() {
  const { fetchMyWish } = myAPI();

  // 데이터 상태
  const [data, setData] = useState<MyWishResponseDTO | null>(null);
  const [loading, setLoading] = useState(true);

  // 캐러셀 DOM 참조
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLUListElement | null>(null);

  // 캐러셀 상태
  const [offset, setOffset] = useState(0); // 현재 위치
  const [bounds, setBounds] = useState({ min: 0, max: 0 }); // 이동 가능 범위

  // 이동 가능 여부
  const canPrev = offset < bounds.max - 1;
  const canNext = offset > bounds.min + 1;

  // 데이터 fetch
  useEffect(() => {
    let mounted = true;

    setLoading(true);
    fetchMyWish()
      .then((res) => {
        if (!mounted) return;
        setData(res.result);
      })
      .catch(() => {
        if (!mounted) return;
        setData(null);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  // bounds 재계산(= viewport와 track 크기 기반)
  const recalcBounds = () => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const max = 0;
    const min = Math.min(0, viewport.clientWidth - track.scrollWidth);

    setBounds({ min, max });
    setOffset((prev) => clamp(prev, min, max));
  };

  // 렌더 직후(레이아웃 확정된 뒤) 측정 + 리사이즈 대응
  useLayoutEffect(() => {
    recalcBounds();

    const onResize = () => recalcBounds();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [data?.wish.length]);

  // 페이지 단위 이동
  const moveByPage = (dir: 'prev' | 'next') => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const step = viewport.clientWidth + GAP;
    setOffset((prev) => {
      const next = dir === 'next' ? prev - step : prev + step;
      return clamp(next, bounds.min, bounds.max);
    });
  };

  if (loading) return <WishProductSkeleton />;

  if (!data || data.wish.length === 0) return <></>;

  return (
    <section className="flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight">내가 찜한 상품</h2>
        <Link className="text-md text-gray-500 hover:text-gray-800" href="/my">
          전체보기
        </Link>
      </header>

      <div className="relative w-full">
        {canPrev && (
          <button
            type="button"
            aria-label="이전 상품"
            onClick={() => moveByPage('prev')}
            className="absolute left-[-2rem] top-1/3 z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm hover:shadow-lg ring-1 ring-black/5 cursor-pointer"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
        )}

        {canNext && (
          <button
            type="button"
            aria-label="다음 상품"
            onClick={() => moveByPage('next')}
            className="absolute right-[-2rem] top-1/3 z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm hover:shadow-lg ring-1 ring-black/5 cursor-pointer"
          >
            <ArrowRightIcon className="h-6 w-6" />
          </button>
        )}

        <div ref={viewportRef} className="overflow-hidden">
          <ul
            ref={trackRef}
            className="flex gap-4 pb-2 items-start transition-transform duration-300 ease-out will-change-transform"
            style={{ transform: `translateX(${offset}px)` }}
          >
            {data.wish.map((p) => (
              <li key={p.productId} className="shrink-0 basis-[calc((100%-3rem)/4)]">
                <WishProductCard product={p} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
