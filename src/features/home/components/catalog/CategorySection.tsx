// components/home/CategoryItemSection.tsx
'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { productSearchPresets } from '../../constants/fetchProductsPrestets';
import { useProductSearch } from '../../hooks/useFetchProducts';
import { CategoryType } from '../../types/model';
import CategoryFeaturedSection from './CategoryFeaturedSection';
import CategoryProductList from './CategoryProductList';
import CategorySectionSkeleton from './CategorySectionSkeleton';

export default function CategorySection({ category }: { category: CategoryType }) {
  const searchParams = useMemo(
    () => ({
      ...productSearchPresets.homeCategoryCommon,
      categoryIds: Number(category.id),
    }),
    [category.id],
  );

  const { data: products, isLoading } = useProductSearch(searchParams);

  const featuredProducts = products.slice(0, 6);
  const restProducts = products.slice(6);

  if (isLoading) return <CategorySectionSkeleton />;
  if (!products) return null;

  return (
    <div
      className="flex gap-4 h-[500px] border-t border-t-primary-100 border-t-[3px]
  border-b border-b-gray-300 border-b-[1px]"
    >
      {/* 좌측 영역 */}
      <div className="w-[200px] flex flex-col gap-6 py-3 pl-5">
        <div>
          <h3 className="text-xl font-bold text-primary-300">{category.label}</h3>
          <Link
            href={`/categories/${category.id}`}
            className="text-xs text-gray-500 cursor-pointer"
          >
            바로가기
          </Link>
        </div>
        <div className="flex gap-2 flex-wrap align-start justify-start">
          {category.subcategories.map((subCategory) => (
            <Link key={subCategory.id} prefetch={false} href={`/categories/${subCategory.id}`}>
              <div className="w-fit flex items-center gap-1 text-xs border border-gray-200 px-2 py-1 rounded-full">
                <p className="shrink-0">#</p>
                <p className="truncate">{subCategory.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 중간 영역 */}
      <CategoryFeaturedSection products={featuredProducts} />

      {/* 우측 영역 */}
      <div className="flex-1 overflow-hidden">
        <CategoryProductList products={restProducts} />
      </div>
    </div>
  );
}
