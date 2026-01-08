'use client';

import { CATEGORIES } from '@/features/search/constants/search';
import Link from 'next/link';
import { useState } from 'react';

export default function Categorybar() {
  const [activeCategoryId, setActiveCategoryId] = useState<string>('newYear');
  const activeCategory = CATEGORIES.find((c) => c.id === activeCategoryId);

  return (
    <div className="flex h-[600px] w-[400px] overflow-hidden rounded-lg border border-gray-100 bg-white shadow-lg">
      <ul className="w-1/2 overflow-y-auto bg-white py-2 scrollbar-hide">
        {CATEGORIES.map((category) => {
          const isActive = activeCategoryId === category.id;
          const Icon = category.icon;

          return (
            <Link
              key={category.id}
              href={{
                pathname: `/categories/${category.id}`,
                query: { sort: 'wishlistCount', direction: 'DESC', page: 0, size: 30 },
              }}
              onMouseEnter={() => setActiveCategoryId(category.id)}
              className={`
                    flex cursor-pointer items-center gap-3 px-4 py-3.5 transition-colors
                    ${isActive ? 'bg-purple-50 text-[#5f0080]' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                  `}
            >
              <Icon
                size={20}
                strokeWidth={1.5}
                className={isActive ? 'text-[#5f0080]' : 'text-gray-400'}
              />
              <span className={`text-sm ${isActive ? 'font-bold' : 'font-medium'}`}>
                {category.label}
              </span>
            </Link>
          );
        })}
      </ul>

      <div className="w-1/2 overflow-y-auto bg-gray-50 px-4 py-4">
        <ul className="flex flex-col gap-1">
          {activeCategory?.subcategories.map((sub, index) => (
            <li
              key={index}
              className="cursor-pointer rounded px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:text-primary-500 hover:underline"
            >
              <Link
                href={{
                  pathname: `/categories/${sub.id}`,
                  query: { sort: 'wishlistCount', direction: 'DESC', page: 0, size: 30 },
                }}
                className="block w-full cursor-pointer rounded px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:text-[#5f0080] hover:underline"
              >
                {sub.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
