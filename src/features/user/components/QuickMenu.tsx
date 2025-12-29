'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useRecentProducts } from '../hooks/useRecentProducts';

export default function QuickMenu() {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 2;

  const { items } = useRecentProducts();

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleNext = () => {
    if (startIndex < items.length - itemsPerPage) {
      setStartIndex(startIndex + 1);
    }
  };

  return (
    <aside className="flex w-[80px] flex-col gap-2">
      <div className="w-full h-[50px] overflow-hidden border border-gray-200 cursor-pointer">
        <div className="flex h-full w-full flex-col items-center justify-start bg-purple-50 pt-2 text-center">
          <span className="text-[10px] font-bold text-[#5f0080]">샛별·하루</span>
          <span className="text-[10px] font-bold text-[#5f0080]">배송 안내</span>
        </div>
      </div>

      <div className="flex flex-col border border-gray-200 bg-white">
        <a
          href="#"
          className="border-b border-gray-100 py-2 text-center text-[11px] text-gray-700 hover:text-[#5f0080]"
        >
          컬리 큐레이터
        </a>
      </div>

      <div className="flex flex-col items-center border border-gray-200 bg-white pb-2 pt-3">
        <span className="mb-2 text-[10px] font-bold text-gray-900">최근 본 상품</span>

        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className="mb-1 flex h-4 w-full justify-center text-gray-800 hover:text-primary-500 disabled:opacity-30"
        >
          <ChevronUp size={12} />
        </button>

        <div className="flex flex-col gap-1.5 overflow-hidden px-1">
          {items.slice(startIndex, startIndex + itemsPerPage).map((product) => (
            <div
              key={product.id}
              className="h-[65px] w-[60px] cursor-pointer overflow-hidden border border-gray-100"
            >
              <Image
                src={product.thumb}
                alt={''}
                className="h-full w-full object-cover transition-transform hover:scale-110"
                width={60}
                height={65}
              />
            </div>
          ))}
          {items.length === 0 && (
            <div className="flex h-[130px] w-[60px] items-center justify-center text-[10px] text-gray-300">
              없음
            </div>
          )}
        </div>

        <button
          onClick={handleNext}
          disabled={startIndex >= items.length - itemsPerPage}
          className="mt-1 flex h-4 w-full justify-center text-gray-800 hover:text-primary-500 disabled:opacity-30"
        >
          <ChevronDown size={12} />
        </button>
      </div>
    </aside>
  );
}
