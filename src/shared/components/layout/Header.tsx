'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [q, setQ] = useState('');

  return (
    <header className="w-full bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-extrabold text-foreground">BeGroom</span>
          </Link>

          <Link
            href="/products"
            className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            상품
          </Link>
        </div>

        {/* Search + Auth */}
        <div className="flex items-center gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="검색어를 입력하세요"
            className="
              hidden w-[320px] rounded-full
              border border-border
              bg-input-background
              px-4 py-2 text-sm
              text-foreground
              placeholder:text-muted-foreground
              outline-none
              focus:ring-2 focus:ring-primary-300
              md:block
            "
          />

          <Link
            href="/auth?mode=login"
            className="text-sm text-muted-foreground transition-colors hover:text-primary-500"
          >
            로그인
          </Link>

          <Link
            href="/auth?mode=signup"
            className="
              rounded-full bg-primary-500
              px-4 py-2 text-sm text-white
              transition-colors
              hover:bg-primary-600
            "
          >
            회원가입
          </Link>
        </div>
      </div>

      <div className="h-px bg-border" />
    </header>
  );
}
