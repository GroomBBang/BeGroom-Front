'use client';

import { ProductCardType } from '@/features/product/types/model';
import { productSearchPresets } from '../../constants/fetchProductsPrestets';
import { useProductSearch } from '../../hooks/useFetchProducts';
import PopularProductCard from './PopularProductCard';

export default function PopularProductsSection() {
  const { data, isLoading } = useProductSearch(productSearchPresets.homePopular);

  if (isLoading || !data) return;

  return (
    <aside className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight">실시간 인기 제품</h2>
        <a className="text-sm text-gray-500 hover:text-gray-800" href="#">
          전체보기
        </a>
      </div>

      <div className="flex flex-col gap-2">
        {data.map((product: ProductCardType, idx) => (
          <PopularProductCard key={String(product.productId)} product={product} rank={idx + 1} />
        ))}
      </div>

      <div className="flex items-center justify-center px-6">
        <button
          type="button"
          className="w-full rounded-full border px-4 py-3 text-sm font-semibold hover:bg-gray-100 cursor-pointer"
        >
          인기 상품 전체보기
        </button>
      </div>
    </aside>
  );
}
