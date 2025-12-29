'use client';

import { Bell, ChevronDown, Search, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const AUTH_KEY = 'begroom_auth_v1';

type AuthState = { isLoggedIn: false } | { isLoggedIn: true; name: string };

function readAuth(): AuthState {
  if (typeof window === 'undefined') return { isLoggedIn: false };
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? (JSON.parse(raw) as AuthState) : { isLoggedIn: false };
  } catch {
    return { isLoggedIn: false };
  }
}

function writeAuth(next: AuthState) {
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(next));
  } catch {}
}

export default function Header() {
  const [q, setQ] = useState('');
  const [auth, setAuth] = useState<AuthState>({ isLoggedIn: false });

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!q.trim()) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  useEffect(() => {
    setAuth(readAuth());
  }, []);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  const handleLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    const next: AuthState = { isLoggedIn: true, name: '정윤석' };
    writeAuth(next);
    setAuth(next);
  };

  const handleLogout = () => {
    const next: AuthState = { isLoggedIn: false };
    writeAuth(next);
    setAuth(next);
    setOpen(false);
  };

  return (
    <header className="w-full bg-background">
      {/* Top utility bar */}
      <div className="mx-auto flex h-10 max-w-6xl items-center justify-end px-4 text-xs">
        {!auth.isLoggedIn ? (
          <>
            <Link
              href="/auth?mode=login"
              onClick={handleLogin}
              className="text-muted-foreground hover:text-foreground"
            >
              로그인
            </Link>
            <span className="mx-2 text-muted-foreground">|</span>
            <Link href="/auth?mode=signup" className="text-primary-600 hover:text-primary-700">
              회원가입
            </Link>
          </>
        ) : (
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary-700"
              aria-haspopup="menu"
              aria-expanded={open}
            >
              <span>{auth.name} 님</span>
              <ChevronDown size={16} className="text-muted-foreground" />
            </button>

            {open && (
              <div
                role="menu"
                className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-lg border border-border bg-background shadow-md"
              >
                <Link
                  href="/my"
                  className="block px-4 py-2 text-sm text-foreground hover:bg-muted"
                  onClick={() => setOpen(false)}
                >
                  마이페이지
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted"
                >
                  로그아웃
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main header */}
      <div className="border-b border-border">
        <div className="mx-auto grid h-20 max-w-6xl grid-cols-[auto_1fr_auto] items-center px-4">
          {/* Left */}
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-extrabold text-primary-600">
              BeGroom
            </Link>

            <Link
              href={{
                pathname: '/products',
                query: { main: '베스트', sub: '전체보기' },
              }}
              className="text-sm font-semibold text-foreground hover:text-primary-600"
            >
              상품
            </Link>
          </div>

          {/* Center search (md 이상) */}
          <div className="hidden justify-center md:flex">
            <form onSubmit={handleSearch} className="relative w-[520px] max-w-[70vw]">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="검색어를 입력해주세요"
                className="
                  w-full rounded-md
                  border border-primary-300
                  bg-background
                  px-4 py-3 pr-12 text-sm
                  text-foreground
                  placeholder:text-muted-foreground
                  outline-none
                  focus:ring-2 focus:ring-primary-200
                "
              />
              <button
                type="button"
                onClick={() => handleSearch()}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-600 hover:text-primary-700"
              >
                <Search size={20} />
              </button>
            </form>
          </div>

          {/* Right icons (모바일/데스크탑 동일) */}
          <div className="flex items-center justify-end gap-2">
            {/* Notification */}
            <Link
              href="/notification"
              aria-label="알림"
              className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-muted"
            >
              <Bell size={22} />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              aria-label="장바구니"
              className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-muted"
            >
              <ShoppingCart size={22} />
              <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary-600 px-1 text-[11px] font-bold text-white">
                1
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
