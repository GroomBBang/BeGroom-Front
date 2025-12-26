import { Check, ChevronDown, ChevronUp, RefreshCw, Search } from 'lucide-react';
import { useState } from 'react';

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

export default function FilterSidebar() {
  return (
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
  );
}
