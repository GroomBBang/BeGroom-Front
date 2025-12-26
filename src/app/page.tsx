'use client';

import ProductCard from '@/features/product/components/ProductCard';
import { useMemo, useState } from 'react';

import { categories } from '@/features/product/constants/categories';
import { products } from '@/features/product/mocks/product';
import { CategoryKey } from '@/features/product/types';
import { formatWon } from '@/shared/lib/format';

export default function HomePage() {
  const [category, setCategory] = useState<CategoryKey>('all');

  const filtered = useMemo(() => {
    if (category === 'all') return products;
    return products.filter((p) => p.category === category);
  }, [category]);

  return (
    <>
      {/* Hero */}
      <section className="bg-primary-500 py-20 text-center text-white">
        <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
          신선한 식재료,
          <br />
          내일 아침 문앞에서
        </h1>
        <p className="mt-4 text-sm text-white/80 md:text-base">샛별배송, 새벽 7시 전 도착</p>
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
                  'relative pb-2 transition cursor-pointer',
                  active ? 'text-primary-500' : 'text-muted-foreground hover:text-foreground',
                ].join(' ')}
              >
                {c.label}
                {active && (
                  <span className="absolute left-0 right-0 -bottom-px h-0.5 rounded-full bg-primary-500" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="h-px bg-border" />
      </div>

      {/* Coupon Banner */}
      <div className="mx-auto max-w-6xl px-4">
        <div className="mt-8 rounded-2xl bg-primary-500 p-6 text-white shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-t6 font-bold">선착순 쿠폰</div>
              <p className="mt-1 text-sm opacity-90">지금 바로 받아가세요</p>
            </div>

            <button
              type="button"
              className="rounded-full bg-white/20 px-4 py-2 text-sm font-bold hover:bg-white/25 cursor-pointer"
            >
              쿠폰 받기 →
            </button>
          </div>
        </div>
      </div>

      {/* Products */}
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-12">
        <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-foreground">이 상품 어때요?</h2>
          <p className="mt-2 text-sm text-muted-foreground">지금 가장 핫한 상품</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} formatWon={formatWon} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-12 rounded-xl border border-border bg-background p-8 text-center text-sm text-muted-foreground">
            해당 카테고리에 상품이 없어요.
          </div>
        )}
      </main>
    </>
  );
}
