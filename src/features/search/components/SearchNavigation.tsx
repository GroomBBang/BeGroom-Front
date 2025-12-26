'use client';

import { useState } from 'react';

import { NAV_LINKS } from '@/features/search/constants/search';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import Categorybar from './Categorybar';

interface Props {
  search: string;
}

export default function SearchNavigation({ search }: Props) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
      <div className="mx-auto flex h-[50px] max-w-screen-xl items-center justify-center px-4 relative">
        {/* 1. 좌측: 카테고리 버튼 */}
        <div className="absolute top-1 left-8 z-50">
          <button
            className="group flex items-center gap-3 py-2 text-gray-900 transition-colors hover:text-[#5f0080]"
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          >
            <Menu size={24} strokeWidth={2} />
            <span className="text-base font-bold">카테고리</span>
          </button>

          {isCategoryOpen && (
            <div className="absolute top-full left-0 z-50 pt-2">
              <Categorybar />
            </div>
          )}
        </div>

        {/* 2. 중앙: 메인 네비게이션 링크 */}
        <nav className="hidden md:flex">
          <ul className="flex items-center gap-8 lg:gap-12">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`text-base font-semibold text-gray-900 transition-colors hover:text-[#5f0080] ${link.href === `/products?q=${search}` ? 'text-[#5f0080]' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* 3. 우측: 배송 안내 뱃지 */}
        <div />
      </div>
    </div>
  );
}
