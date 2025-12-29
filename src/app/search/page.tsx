'use client';

import FilterSidebar from '@/features/search/components/FilterSidebar';
import ProductCard from '@/features/search/components/ProductCard';
import SearchHeader from '@/features/search/components/SearchHeader';
import SearchNavigation from '@/features/search/components/SearchNavigation';
import { PRODUCTS } from '@/features/search/constants/search';
import { useSearchParams } from 'next/navigation';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <div className="min-h-screen bg-white pb-20">
      <SearchNavigation />

      <div className="px-[150px]">
        <div className="py-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900">{query}</h1>
        </div>

        <div className="mx-auto max-w-screen-xl px-4 flex gap-10">
          <FilterSidebar />

          <main className="flex-1">
            <SearchHeader />

            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10">
              {PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
