'use client';

import { FiltersStateType } from '@/features/product/hooks/useProductFilter';
import { Check, ChevronDown, ChevronUp, RefreshCw, Search } from 'lucide-react';
import { useState } from 'react';

// 필터 섹션 컴포넌트
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

// 체크박스 아이템
const CheckItem = ({
  label,
  count,
  checked,
  onClick,
}: {
  label: string;
  count: number;
  checked?: boolean;
  onClick?: () => void;
}) => (
  <label className="flex items-center gap-2 py-2 cursor-pointer group">
    <div className="relative flex items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={onClick}
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

export default function FilterSidebar({ filtersState }: { filtersState: FiltersStateType }) {
  const { filters, toggleBrand, toggleDelivery, togglePackaging, setIncludeSoldOut, resetFilters } =
    filtersState;

  return (
    <aside className="w-[220px] shrink-0 hidden md:block">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <span className="font-bold text-sm text-gray-900">필터</span>
        <button
          onClick={resetFilters}
          className="flex items-center gap-1 text-[10px] text-gray-400"
        >
          <RefreshCw size={10} />
          초기화
        </button>
      </div>

      {/* 브랜드 */}
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
          <CheckItem
            label="가야농장"
            count={3}
            checked={filters.brandIds.includes(1)}
            onClick={() => toggleBrand(1)}
          />
          <CheckItem
            label="갈배사이다"
            count={2}
            checked={filters.brandIds.includes(2)}
            onClick={() => toggleBrand(2)}
          />
          <CheckItem
            label="곡물도감"
            count={2}
            checked={filters.brandIds.includes(3)}
            onClick={() => toggleBrand(3)}
          />
          <CheckItem
            label="골든서클"
            count={5}
            checked={filters.brandIds.includes(4)}
            onClick={() => toggleBrand(4)}
          />
          <CheckItem
            label="곰표"
            count={1}
            checked={filters.brandIds.includes(5)}
            onClick={() => toggleBrand(5)}
          />
        </div>
      </FilterSection>

      {/* 포장 타입 */}
      <FilterSection title="포장타입" isOpen={false}>
        <CheckItem
          label="상온"
          count={252}
          checked={filters.packagingTypes.includes('ROOM')}
          onClick={() => togglePackaging('ROOM')}
        />
        <CheckItem
          label="냉장"
          count={200}
          checked={filters.packagingTypes.includes('COLD')}
          onClick={() => togglePackaging('COLD')}
        />
        <CheckItem
          label="냉동"
          count={17}
          checked={filters.packagingTypes.includes('FROZEN')}
          onClick={() => togglePackaging('FROZEN')}
        />
      </FilterSection>

      {/* 배송 */}
      <FilterSection title="배송" isOpen={false}>
        <CheckItem
          label="샛별배송"
          count={510}
          checked={filters.deliveryTypes.includes('DAWN')}
          onClick={() => toggleDelivery('DAWN')}
        />
        <CheckItem
          label="판매자배송"
          count={59}
          checked={filters.deliveryTypes.includes('SELLER')}
          onClick={() => toggleDelivery('SELLER')}
        />
      </FilterSection>

      {/* 옵션 */}
      <FilterSection title="옵션" isOpen={false}>
        <CheckItem
          label="품절 상품 포함"
          count={580}
          checked={!filters.excludeSoldOut}
          onClick={() => setIncludeSoldOut(!filters.excludeSoldOut)}
        />
      </FilterSection>
    </aside>
  );
}
