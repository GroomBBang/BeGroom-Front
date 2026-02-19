// components/HeroCarousel.tsx
'use client';

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

const slides = [
  {
    id: '1',
    image:
      'https://product-image.kurly.com/hdims/resize/%3E1900x%3E370/quality/85/src/banner/main/pc/img/2f752daf-359d-43e7-8104-c119a5dde65d.png',
  },
  {
    id: '2',
    image:
      'https://product-image.kurly.com/hdims/resize/%3E1900x%3E370/quality/85/src/banner/main/pc/img/1943c573-f679-478e-aa29-2429a97238d0.jpg',
  },
  {
    id: '3',
    image:
      'https://product-image.kurly.com/hdims/resize/%3E1900x%3E370/quality/85/src/banner/main/pc/img/e0b93ef5-2457-4d21-9869-1da5ae3cd3ca.png',
  },
  {
    id: '4',
    image:
      'https://product-image.kurly.com/hdims/resize/%3E1900x%3E370/quality/85/src/banner/main/pc/img/59346834-8a91-41c1-9f0d-fcbefcdc73bd.jpg',
  },
  {
    id: '5',
    image:
      'https://product-image.kurly.com/hdims/resize/%3E1900x%3E370/quality/85/src/banner/main/pc/img/5e62e15b-8d5c-4104-ada6-9bd635e18af1.jpg',
  },
  {
    id: '6',
    image:
      'https://product-image.kurly.com/hdims/resize/%3E1900x%3E370/quality/85/src/banner/main/pc/img/34796882-7b69-407e-8bcd-96b627321fdf.png',
  },
  {
    id: '7',
    image:
      'https://product-image.kurly.com/hdims/resize/%3E1900x%3E370/quality/85/src/banner/main/pc/img/78b51a5e-f706-4920-a913-14db34b270b5.jpg',
  },
];

const AUTOPLAY_MS = 3000;

export default function HeroCarousel() {
  const total = slides.length;
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const timerRef = useRef<number | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startTimer = () => {
    clearTimer();
    if (total <= 1) return;
    if (isPaused) return;

    timerRef.current = window.setInterval(() => {
      setIndex((v) => (v + 1) % total);
    }, AUTOPLAY_MS);
  };

  const prev = () => {
    setIndex((v) => (v - 1 + total) % total);
    startTimer();
  };

  const next = () => {
    setIndex((v) => (v + 1) % total);
    startTimer();
  };

  useEffect(() => {
    startTimer();
    return clearTimer;
  }, [isPaused, total]);

  const trackStyle = useMemo(() => {
    return {
      transform: `translateX(-${index * 100}%)`,
    } as React.CSSProperties;
  }, [index]);

  if (total === 0) return null;

  return (
    <div
      className="relative overflow-hidden rounded-xl min-h-[180px] sm:min-h-[240px] lg:min-h-[280px] bg-black/5"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      role="region"
      aria-label="메인 배너 캐러셀"
    >
      <div className="flex h-full transition-transform duration-500 ease-out" style={trackStyle}>
        {slides.map((s) => (
          <div key={s.id} className="h-full w-full shrink-0 relative">
            <Image
              src={s.image}
              alt="banner-image"
              fill
              sizes="(max-width: 736px) 100vw, 736px"
              className="object-cover"
              priority={s.id === '1'}
              fetchPriority={s.id === '1' ? 'high' : 'auto'}
            />
          </div>
        ))}
      </div>

      {/* 컨트롤 */}
      <div className="absolute bottom-6 right-6 flex items-center gap-2">
        <div className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium">
          {index + 1} / {total}
        </div>
        <button
          onClick={prev}
          className="h-8 w-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-white cursor-pointer"
          aria-label="이전"
          type="button"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
        <button
          onClick={next}
          className="h-8 w-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-white cursor-pointer"
          aria-label="다음"
          type="button"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
