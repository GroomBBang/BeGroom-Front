'use client';

import { useProductFilters } from '@/features/product/hooks/useProductFilter';
import { CATEGORIES } from '../constants/search';
import FilterSidebar from './FilterSidebar';
import ProductList from './ProductList';
import SearchHeader from './SearchHeader';
import SubCategorybar from './SubCategorybar';

export default function CategoryContainer({ categoryId }: { categoryId: string }) {
  const filtersState = useProductFilters();

  const currentCategory = CATEGORIES.find(
    (c) => c.id === categoryId || c.subcategories.some((sub) => sub.id === categoryId),
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
