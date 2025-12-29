'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const RECENT_PRODUCTS = [
  {
    id: 1,
    name: '한우 등심',
    img: 'https://images.unsplash.com/photo-1615937651188-4b92cd87f652?auto=format&fit=crop&q=80&w=100',
  },
  {
    id: 2,
    name: '유산균',
    img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=100',
  },
  {
    id: 3,
    name: '방울토마토',
    img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=100',
  },
];

export default function QuickMenu() {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 2;

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  // 아래로 이동 (다음 상품)
  const handleNext = () => {
    if (startIndex < RECENT_PRODUCTS.length - itemsPerPage) {
      setStartIndex(startIndex + 1);
    }
  };

  return (
    // 위치 잡기: 보통 레이아웃 우측에 배치되므로 w-[80px]로 너비 고정
    <aside className="flex w-[80px] flex-col gap-2">
      {/* 1. 상단 배너 이미지 */}
      <div className="h-[120px] w-full overflow-hidden border border-gray-200 cursor-pointer">
        {/* 실제 배너 이미지가 없으므로 CSS로 유사하게 구현하거나 img 태그 사용 */}
        <div className="flex h-full w-full flex-col items-center justify-start bg-purple-50 pt-2 text-center">
          <span className="text-[10px] font-bold text-[#5f0080]">샛별·하루</span>
          <span className="text-[10px] font-bold text-[#5f0080]">배송 안내</span>
          <img
            src="https://images.unsplash.com/photo-1586769852044-692d6e3703f0?auto=format&fit=crop&q=80&w=100"
            alt="배송트럭"
            className="mt-2 h-full w-full object-cover opacity-80"
          />
        </div>
      </div>

      {/* 2. 텍스트 메뉴 링크 */}
      <div className="flex flex-col border border-gray-200 bg-white">
        <a
          href="#"
          className="border-b border-gray-100 py-2 text-center text-[11px] text-gray-700 hover:text-[#5f0080]"
        >
          컬리 고객 제도
        </a>
        <a
          href="#"
          className="border-b border-gray-100 py-2 text-center text-[11px] text-gray-700 hover:text-[#5f0080]"
        >
          컬리 큐레이터
        </a>
        <a href="#" className="py-2 text-center text-[11px] text-gray-700 hover:text-[#5f0080]">
          레시피
        </a>
      </div>

      {/* 3. 최근 본 상품 (Carousel) */}
      <div className="flex flex-col items-center border border-gray-200 bg-white pb-2 pt-3">
        <span className="mb-2 text-[10px] font-bold text-gray-900">최근 본 상품</span>

        {/* 위쪽 화살표 */}
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className="mb-1 flex h-4 w-full justify-center text-gray-400 hover:text-[#5f0080] disabled:opacity-30"
        >
          <ChevronUp size={12} />
        </button>

        {/* 상품 리스트 (overflow hidden) */}
        <div className="flex flex-col gap-1.5 overflow-hidden px-1">
          {RECENT_PRODUCTS.slice(startIndex, startIndex + itemsPerPage).map((product) => (
            <div
              key={product.id}
              className="h-[65px] w-[60px] cursor-pointer overflow-hidden border border-gray-100"
            >
              <img
                src={product.img}
                alt={product.name}
                className="h-full w-full object-cover transition-transform hover:scale-110"
              />
            </div>
          ))}
          {/* 상품이 없을 때 빈 공간 처리 */}
          {RECENT_PRODUCTS.length === 0 && (
            <div className="flex h-[130px] w-[60px] items-center justify-center text-[10px] text-gray-300">
              없음
            </div>
          )}
        </div>

        {/* 아래쪽 화살표 */}
        <button
          onClick={handleNext}
          disabled={startIndex >= RECENT_PRODUCTS.length - itemsPerPage}
          className="mt-1 flex h-4 w-full justify-center text-gray-400 hover:text-[#5f0080] disabled:opacity-30"
        >
          <ChevronDown size={12} />
        </button>
      </div>
    </aside>
  );
}
