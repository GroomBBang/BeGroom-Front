'use client';

import { Search } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { useRouter } from 'next/navigation';

export default function Header() {
  const [q, setQ] = useState('');
  const router = useRouter();

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!q.trim()) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <header className="w-full bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-extrabold text-foreground">BeGroom</span>
          </Link>

          <Link
            href="/products?q=베스트"
            className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            상품
          </Link>
        </div>

        {/* Search + Auth */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
              placeholder="검색어를 입력하세요"
              className="
                hidden w-[320px] rounded-full
                border border-border
                bg-input-background
                pl-4 pr-10 py-2 text-sm
                text-foreground
                placeholder:text-muted-foreground
                outline-none
                focus:ring-2 focus:ring-primary-300
                md:block
              "
            />
            <button
              onClick={() => handleSearch()}
              className="absolute right-3 hidden text-muted-foreground hover:text-foreground md:block"
            >
              <Search size={20} />
            </button>
          </div>

          <Link
            href="/search"
            className="block md:hidden text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <Search size={20} />
          </Link>

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
