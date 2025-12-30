'use client';

import Link from 'next/link';

export default function CartEmpty() {
  return (
    <div className="rounded-xl border border-border bg-background p-16 text-center">
      <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-muted text-muted-foreground">
        🛍️
      </div>
      <div className="text-sm text-muted-foreground">장바구니가 비어있습니다</div>
      <Link
        href="/"
        className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-primary-700 px-6 text-sm font-bold text-white hover:bg-primary-800"
      >
        쇼핑 계속하기
      </Link>
    </div>
  );
}
