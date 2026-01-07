'use client';

import { useProductFilters } from '@/features/product/hooks/useProductFilter';
import FilterSidebar from '@/features/search/components/FilterSidebar';
import ProductList from '@/features/search/components/ProductList';
import SearchHeader from '@/features/search/components/SearchHeader';
import { useSearchParams } from 'next/navigation';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') || '';

  const filtersState = useProductFilters(keyword);

  return (
    <div className="min-h-screen bg-white ">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-12">
        <div className="pb-12 text-center">
          <h1 className="text-3xl font-medium text-gray-900">
            {<span className="font-bold text-primary-600">{keyword}</span>}에 대한 검색결과
          </h1>
        </div>

        <div className="mx-auto max-w-screen-xl px-4 flex gap-10">
          <FilterSidebar filtersState={filtersState} />

          <main className="flex-1">
            <SearchHeader filtersState={filtersState} />
            <ProductList
              keyword={keyword}
              filters={filtersState.filters}
              setPage={filtersState.setPage}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
