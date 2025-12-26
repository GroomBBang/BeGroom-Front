'use client';

import { useSearchParams } from 'next/navigation';

import SearchBanner from '@/features/search/components/SearchBanner';
import SearchNavigation from '@/features/search/components/SearchNavigation';
import { PRODUCTS } from '@/features/search/constants/search';
import { Check, ChevronDown, ChevronUp, RefreshCw, Search, ShoppingCart } from 'lucide-react';
import React, { useState } from 'react';

// 상품 데이터

// 필터 섹션 컴포넌트 (재사용)
const FilterSection = ({
  title,
  isOpen = true,
  children,
}: {
  title: string;
  isOpen?: boolean;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(isOpen);
  return (
    <div className="border-b border-gray-100 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-2 text-sm font-bold text-gray-800"
      >
        <span>{title}</span>
        {open ? (
          <ChevronUp size={16} className="text-gray-400" />
        ) : (
          <ChevronDown size={16} className="text-gray-400" />
        )}
      </button>
      {open && <div className="mt-2">{children}</div>}
    </div>
  );
};

// 체크박스 아이템 컴포넌트
const CheckItem = ({ label, count }: { label: string; count: number }) => (
  <label className="flex items-center gap-2 py-2 cursor-pointer group">
    <div className="relative flex items-center">
      <input
        type="checkbox"
        className="peer h-5 w-5 appearance-none rounded-full border border-gray-300 checked:bg-[#5f0080] checked:border-transparent transition-colors"
      />
      <Check
        size={12}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100"
      />
    </div>
    <span className="text-sm text-gray-600 group-hover:text-gray-900">{label}</span>
    <span className="text-xs text-gray-400 font-light">{count}</span>
  </label>
);

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <div className="min-h-screen bg-white pb-20">
      <SearchNavigation search={query} />
      <SearchBanner search={query} />

      <div className="mx-auto max-w-screen-xl px-4 flex gap-10">
        {/* ================= 좌측 필터 사이드바 ================= */}
        <aside className="w-[220px] shrink-0 hidden md:block">
          <div className="flex justify-between items-center pb-4 border-b border-gray-200">
            <span className="font-bold text-sm text-gray-900">필터</span>
            <button className="flex items-center gap-1 text-[10px] text-gray-400">
              <RefreshCw size={10} />
              초기화
            </button>
          </div>

          {/* 필터 항목들 */}
          <FilterSection title="카테고리">
            <CheckItem label="생수·얼음" count={15} />
            <CheckItem label="탄산수" count={8} />
          </FilterSection>

          <FilterSection title="브랜드">
            <div className="mb-3 flex overflow-hidden rounded border border-gray-200 bg-gray-50">
              <input
                className="w-full bg-transparent px-3 py-2 text-xs outline-none"
                placeholder="브랜드명 검색"
              />
              <button className="px-2 text-gray-400">
                <Search size={14} />
              </button>
            </div>
            <div className="max-h-40 overflow-y-auto scrollbar-hide">
              <CheckItem label="가야농장" count={3} />
              <CheckItem label="갈배사이다" count={2} />
              <CheckItem label="곡물도감" count={2} />
              <CheckItem label="골든서클" count={5} />
              <CheckItem label="곰표" count={1} />
            </div>
            <button className="mt-2 w-full text-center text-xs text-gray-400 border-t border-gray-100 pt-2">
              브랜드 더보기 {'>'}
            </button>
          </FilterSection>

          <FilterSection title="가격">
            <CheckItem label="4,800원 미만" count={141} />
            <CheckItem label="4,800원 ~ 7,980원" count={148} />
            <CheckItem label="7,980원 ~ 14,900원" count={147} />
            <CheckItem label="14,900원 이상" count={146} />
          </FilterSection>

          <FilterSection title="혜택" isOpen={false}>
            <CheckItem label="할인상품" count={275} />
          </FilterSection>

          <FilterSection title="유형" isOpen={false}>
            <CheckItem label="Kurly Only" count={7} />
          </FilterSection>

          <FilterSection title="배송" isOpen={false}>
            <CheckItem label="샛별배송" count={510} />
            <CheckItem label="판매자배송" count={59} />
          </FilterSection>
        </aside>

        {/* ================= 우측 상품 리스트 영역 ================= */}
        <main className="flex-1">
          {/* 리스트 헤더 (총 개수 및 정렬) */}
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm font-bold text-gray-900">총 582건</div>
            <div className="flex gap-4 text-xs text-gray-400">
              <button className="font-bold text-gray-900">추천순</button>
              <span className="w-px h-3 bg-gray-200"></span>
              <button className="hover:text-gray-600">신상품순</button>
              <span className="w-px h-3 bg-gray-200"></span>
              <button className="hover:text-gray-600">판매량순</button>
              <span className="w-px h-3 bg-gray-200"></span>
              <button className="hover:text-gray-600">혜택순</button>
              <span className="w-px h-3 bg-gray-200"></span>
              <button className="hover:text-gray-600">낮은 가격순</button>
              <span className="w-px h-3 bg-gray-200"></span>
              <button className="hover:text-gray-600">높은 가격순</button>
            </div>
          </div>

          {/* 상품 그리드 */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                {/* 이미지 영역 */}
                <div className="relative mb-3 overflow-hidden rounded bg-gray-100 aspect-[3/4]">
                  <img
                    src={product.img}
                    alt={product.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* 담기 버튼 */}
                  <button className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 bg-white/90 py-2 text-sm font-bold text-[#5f0080] rounded transition-colors hover:bg-white shadow-sm border border-gray-100">
                    <ShoppingCart size={16} />
                    담기
                  </button>
                </div>

                {/* 텍스트 정보 */}
                <div className="flex flex-col gap-1.5">
                  <div className="text-xs text-gray-400 mb-0.5">{product.delivery}</div>
                  <h3 className="text-base text-gray-900 line-clamp-2 leading-relaxed">
                    {product.title}
                  </h3>
                  {product.desc && (
                    <p className="text-xs text-gray-400 line-clamp-1">{product.desc}</p>
                  )}

                  <div className="flex items-center gap-2 mt-1">
                    {product.discount > 0 && (
                      <span className="text-lg font-bold text-orange-500">{product.discount}%</span>
                    )}
                    <span className="text-lg font-bold text-gray-900">
                      {(product.salePrice || product.price).toLocaleString()}원
                    </span>
                    {product.discount > 0 && (
                      <span className="text-xs text-gray-400 line-through decoration-gray-300">
                        {product.price.toLocaleString()}원
                      </span>
                    )}
                  </div>

                  {product.reviews > 0 && (
                    <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                      <div className="flex items-center">
                        <svg
                          className="w-3 h-3 text-purple-200"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        <svg
                          className="w-3 h-3 text-purple-200"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        <span className="ml-1 text-[#5f0080] font-bold">999+</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
