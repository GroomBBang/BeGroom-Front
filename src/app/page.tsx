'use client';

import { useMemo, useState } from 'react';

/* ======================
   타입 & 데이터
====================== */

type CategoryKey = 'all' | 'veg' | 'fruit' | 'dairy' | 'bakery';

const categories: { key: CategoryKey; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'veg', label: '채소' },
  { key: 'fruit', label: '과일' },
  { key: 'dairy', label: '유제품' },
  { key: 'bakery', label: '베이커리' },
];

type Product = {
  id: string;
  category: CategoryKey;
  categoryLabel: string;
  title: string;
  price: number;
  originalPrice?: number;
  discountRate?: number;
  likes: number;
};

const products: Product[] = [
  {
    id: 'p1',
    category: 'veg',
    categoryLabel: '채소',
    title: '[KF365] 유기농 샐러드 믹스',
    price: 5900,
    originalPrice: 7900,
    discountRate: 25,
    likes: 342,
  },
  {
    id: 'p2',
    category: 'bakery',
    categoryLabel: '베이커리',
    title: '수제 식빵',
    price: 4500,
    likes: 421,
  },
  {
    id: 'p3',
    category: 'fruit',
    categoryLabel: '과일',
    title: '프리미엄 과일 모음',
    price: 29900,
    likes: 156,
  },
  {
    id: 'p4',
    category: 'dairy',
    categoryLabel: '유제품',
    title: '[Kurly Only] 저지방 우유 1L',
    price: 3200,
    originalPrice: 3900,
    discountRate: 18,
    likes: 589,
  },
];

/* ======================
   유틸
====================== */

function formatWon(n: number) {
  return n.toLocaleString('ko-KR') + '원';
}

/* ======================
   Page
====================== */

export default function HomePage() {
  const [category, setCategory] = useState<CategoryKey>('all');

  const filtered = useMemo(() => {
    if (category === 'all') return products;
    return products.filter((p) => p.category === category);
  }, [category]);

  return (
    <>
      {/* Hero */}
      <section className="bg-[#5A2D87] py-20 text-center text-white">
        <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
          신선한 식재료,
          <br />
          내일 아침 문앞에서
        </h1>
        <p className="mt-4 text-sm text-white/80 md:text-base">
          샛별배송, 새벽 7시 전 도착
        </p>
      </section>

      {/* Category Tabs */}
      <div className="mx-auto max-w-6xl px-4">
        <nav className="flex gap-6 py-4 text-sm font-semibold">
          {categories.map((c) => {
            const active = c.key === category;
            return (
              <button
                key={c.key}
                onClick={() => setCategory(c.key)}
                className={[
                  'relative pb-2 transition',
                  active ? 'text-purple-700' : 'text-zinc-600 hover:text-zinc-900',
                ].join(' ')}
              >
                {c.label}
                {active && (
                  <span className="absolute left-0 right-0 -bottom-px h-0.5 rounded-full bg-purple-700" />
                )}
              </button>
            );
          })}
        </nav>
        <div className="h-px bg-zinc-100" />
      </div>

      {/* Coupon Banner */}
      <div className="mx-auto max-w-6xl px-4">
        <div className="mt-8 rounded-2xl bg-purple-700 p-6 text-white shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xl font-extrabold">선착순 쿠폰</div>
              <p className="mt-1 text-sm opacity-90">지금 바로 받아가세요</p>
            </div>

            <button
              type="button"
              className="rounded-full bg-white/20 px-4 py-2 text-sm font-bold hover:bg-white/25"
            >
              쿠폰 받기 →
            </button>
          </div>
        </div>
      </div>

      {/* Products */}
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-12">
        <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-zinc-900">이 상품 어때요?</h2>
          <p className="mt-2 text-sm text-zinc-500">지금 가장 핫한 상품</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((p) => (
            <article
              key={p.id}
              className="overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-sm transition hover:shadow-md"
            >
              {/* 이미지 자리(대체 UI) */}
              <div className="flex aspect-[4/3] items-center justify-center bg-zinc-100">
                <span className="text-xs font-semibold text-zinc-500">NO IMAGE</span>
              </div>

              <div className="p-4">
                <div className="text-xs font-semibold text-zinc-500">{p.categoryLabel}</div>
                <div className="mt-1 line-clamp-2 text-sm font-bold text-zinc-900">
                  {p.title}
                </div>

                <div className="mt-3 flex items-end gap-2">
                  {typeof p.discountRate === 'number' && (
                    <span className="text-sm font-extrabold text-rose-500">
                      {p.discountRate}%
                    </span>
                  )}
                  <span className="text-base font-extrabold text-zinc-900">
                    {formatWon(p.price)}
                  </span>
                </div>

                {typeof p.originalPrice === 'number' && (
                  <div className="mt-1 text-xs text-zinc-400 line-through">
                    {formatWon(p.originalPrice)}
                  </div>
                )}

                <div className="mt-3 flex items-center gap-2 text-xs text-zinc-500">
                  <span aria-hidden>♡</span>
                  <span>{p.likes}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-12 rounded-xl border border-zinc-100 bg-white p-8 text-center text-sm text-zinc-500">
            해당 카테고리에 상품이 없어요.
          </div>
        )}
      </main>
    </>
  );
}

