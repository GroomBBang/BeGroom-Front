import { MyWishResponseDTO } from '@/features/user/types/response';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import { useLayoutEffect, useRef, useState } from 'react';
import WishProductCard from './WishProductCard';

const GAP = 16;

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

export default function WishProductsCarousel({ wish }: { wish: MyWishResponseDTO['wish'] }) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLUListElement | null>(null);

  const [offset, setOffset] = useState(0);
  const [bounds, setBounds] = useState({ min: 0, max: 0 });

  const canPrev = offset < bounds.max - 1;
  const canNext = offset > bounds.min + 1;

  const recalcBounds = () => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const max = 0;
    const min = Math.min(0, viewport.clientWidth - track.scrollWidth);

    setBounds({ min, max });
    setOffset((prev) => clamp(prev, min, max));
  };

  useLayoutEffect(() => {
    recalcBounds();
    const onResize = () => recalcBounds();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [wish.length]);

  const moveByPage = (dir: 'prev' | 'next') => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const step = viewport.clientWidth + GAP;
    setOffset((prev) => clamp(dir === 'next' ? prev - step : prev + step, bounds.min, bounds.max));
  };

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
            aria-label="이전 상품"
            onClick={() => moveByPage('prev')}
            type="button"
            className="absolute left-[-2rem] top-1/3 z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm hover:shadow-lg ring-1 ring-black/5 cursor-pointer"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
        )}

        {canNext && (
          <button
            aria-label="다음 상품"
            onClick={() => moveByPage('next')}
            type="button"
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
            {wish.map((p) => (
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
