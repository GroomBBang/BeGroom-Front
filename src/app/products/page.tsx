'use client';

import FilterSidebar from '@/features/search/components/FilterSidebar';
import SearchNavigation from '@/features/search/components/SearchNavigation';
import { ShoppingCart } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

// ==========================================
// 1. Mock Data (스크린샷 기반)
// ==========================================

// 상단 서브 카테고리
const SUB_CATEGORIES = [
  '전체보기',
  '생수/얼음',
  '탄산수',
  '탄산/스포츠음료',
  '과일야채음료',
  '차음료',
  '어린이음료/선물세트',
];

// 상품 데이터
const PRODUCTS = [
  {
    id: 1,
    brand: '테일러',
    title: '[테일러] 트리플 클렌즈 주스 24시간 946mL',
    desc: '세콤달콤',
    price: 12000,
    discount: 0,
    delivery: '샛별배송',
    reviews: 0,
    img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400', // 오렌지 주스 대체 이미지
  },
  {
    id: 2,
    brand: '롯데칠성',
    title: '[롯데칠성] 칠성사이다 제로 라임 (355mL X 6개)',
    desc: '톡 쏘는 청량함',
    price: 5980,
    discount: 0,
    delivery: '샛별배송',
    reviews: 0,
    img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=400', // 캔 음료 대체 이미지
  },
  {
    id: 3,
    brand: '오후의 홍차',
    title: '[오후의 홍차] 차이티 라떼 400mL',
    desc: '일본에서 온 스파이시 한 겨울 음료',
    price: 3200, // 원가
    salePrice: 2600, // 할인가
    discount: 18,
    delivery: '샛별배송',
    reviews: 43,
    img: 'https://images.unsplash.com/photo-1596910547037-846b19803115?auto=format&fit=crop&q=80&w=400', // 밀크티 대체 이미지
  },
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <div className="min-h-screen bg-white pb-20">
      <SearchNavigation search={query} />

      <div className="py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900">생수·음료</h1>
      </div>

      <div className="mx-auto max-w-screen-xl px-4 mb-10">
        <div className="w-full border border-gray-200 p-6 flex flex-wrap gap-x-8 gap-y-4 justify-center items-center bg-white">
          {SUB_CATEGORIES.map((cat, idx) => (
            <button
              key={idx}
              className={`text-sm hover:text-[#5f0080] hover:font-bold ${idx === 0 ? 'text-[#5f0080] font-bold' : 'text-gray-600'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl px-4 flex gap-10">
        <FilterSidebar />

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
