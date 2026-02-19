'use client';

import { useProductFilters } from '@/features/product/hooks/useProductFilter';
import FilterSidebar from './FilterSidebar';
import ProductList from './ProductList';
import SearchHeader from './SearchHeader';

export default function PopularListContainer() {
  const filtersState = useProductFilters();

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-12">
      <div className="pb-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900">실시간 인기 상품</h1>
      </div>

      <div className="mx-auto max-w-screen-xl flex gap-10">
        <FilterSidebar filtersState={filtersState} />

        <main className="flex-1">
          <SearchHeader filtersState={filtersState} />
          <ProductList filters={filtersState.filters} setPage={filtersState.setPage} />
        </main>
      </div>
    </div>
  );
}
