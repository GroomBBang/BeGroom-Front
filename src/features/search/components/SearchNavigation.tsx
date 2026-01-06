'use client';

import { NAV_LINKS } from '@/features/search/constants/search';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Categorybar from './Categorybar';

export default function SearchNavigation() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const [prevPath, setPrevPath] = useState(() => pathname + searchParams.toString());
  const currentPath = pathname + searchParams.toString();

  if (currentPath !== prevPath) {
    setPrevPath(currentPath);
    setIsCategoryOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="sticky top-0 z-50 w-full bg-white shadow-[0_4px_8px_rgba(0,0,0,0.07)]">
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[auto_1fr_91px] items-center px-4">
        <div ref={dropdownRef} className="relative">
          <button
            className="group flex items-center gap-3 py-2 text-gray-900 transition-colors hover:text-primary-500 cursor-pointer"
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

        <nav className="hidden md:flex justify-center">
          <ul className="flex items-center gap-8 lg:gap-12 ">
            {NAV_LINKS.map((link) => (
              <li id={link.label} key={link.label}>
                <Link
                  href={link.href}
                  className={`text-base font-semibold text-gray-900 transition-colors hover:text-primary-500`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div />
      </div>
    </div>
  );
}
