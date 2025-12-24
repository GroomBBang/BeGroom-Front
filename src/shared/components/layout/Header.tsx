'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [q, setQ] = useState('');

  return (
    <header className="w-full bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-extrabold">BeGroom</span>
          </Link>

          <Link href="/products" className="text-sm font-semibold">
            상품
          </Link>
        </div>

        {/* Search + Auth */}
        <div className="flex items-center gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="검색어를 입력하세요"
            className="hidden w-[320px] rounded-full border px-4 py-2 text-sm md:block"
          />

          <Link href="/auth?mode=login" className="text-sm hover:text-purple-700 transition-colors">
            로그인
          </Link>
          <Link
            href="/auth?mode=signup"
            className="rounded-full bg-purple-700 px-4 py-2 text-sm text-white hover:bg-purple-800 transition-colors"
          >
            회원가입
          </Link>
        </div>
      </div>

      <div className="h-px bg-zinc-100" />
    </header>
  );
}
