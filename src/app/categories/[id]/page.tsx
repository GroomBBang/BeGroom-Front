'use client';

import { useProductFilters } from '@/features/product/hooks/useProductFilter';
import FilterSidebar from '@/features/search/components/FilterSidebar';
import ProductList from '@/features/search/components/ProductList';
import SearchHeader from '@/features/search/components/SearchHeader';
import SubCategorybar from '@/features/search/components/SubCategorybar';
import { CATEGORIES } from '@/features/search/constants/search';
import { use } from 'react';

export default function SearchPage({ params }: { params: Promise<{ id: string }> }) {
  const categoryId = use(params).id;
  console.log(categoryId);
  console.log(Number(categoryId));

  const filtersState = useProductFilters();

  // 중분류 id = 대분류 id(3자리) + 중분류 3자리
  const currentCategory = CATEGORIES.find(
    (c) => c.id === (categoryId.length === 6 ? categoryId.slice(0, 3) : categoryId),
  );

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-12">
      <div className="pb-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900">{currentCategory?.label}</h1>
      </div>

      <SubCategorybar
        subCategories={currentCategory?.subcategories || []}
        categoryId={categoryId}
      />

      <div className="mx-auto max-w-screen-xl flex gap-10">
        <FilterSidebar filtersState={filtersState} />

        <main className="flex-1">
          <SearchHeader filtersState={filtersState} />
          <ProductList
            categoryIds={Number(categoryId)}
            filters={filtersState.filters}
            setPage={filtersState.setPage}
          />
        </main>
      </div>
    </div>
  );
}
