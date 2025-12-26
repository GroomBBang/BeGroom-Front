'use client';

import { CATEGORIES } from '@/features/search/constants/search';
import { useState } from 'react';

export default function Categorybar() {
  // 현재 마우스가 올라간 카테고리 ID 상태 (기본값: 과일)
  const [activeCategoryId, setActiveCategoryId] = useState<string>('fruit');

  // 현재 선택된 카테고리 데이터 찾기
  const activeCategory = CATEGORIES.find((c) => c.id === activeCategoryId);

  return (
    <div className="flex h-[600px] w-[400px] overflow-hidden rounded-lg border border-gray-100 bg-white shadow-lg">
      {/* 1. 좌측 메인 카테고리 리스트 */}
      <ul className="w-1/2 overflow-y-auto bg-white py-2 scrollbar-hide">
        {CATEGORIES.map((category) => {
          const isActive = activeCategoryId === category.id;
          const Icon = category.icon;

          return (
            <li
              key={category.id}
              onMouseEnter={() => setActiveCategoryId(category.id)} // 마우스 올리면 우측 내용 변경
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

              {/* N 뱃지 (신규) */}
              {category.isNew && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  N
                </span>
              )}
            </li>
          );
        })}
      </ul>

      {/* 2. 우측 서브 카테고리 리스트 */}
      <div className="w-1/2 overflow-y-auto bg-gray-50 px-4 py-4">
        <ul className="flex flex-col gap-1">
          {activeCategory?.subcategories.map((sub, index) => (
            <li
              key={index}
              className="cursor-pointer rounded px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:text-[#5f0080] hover:underline"
            >
              {sub}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
