'use client';

import { FiltersStateType } from '@/features/product/hooks/useProductFilter';

export default function SearchHeader({ filtersState }: { filtersState: FiltersStateType }) {
  const { filters, setSortOption, setPage } = filtersState;

  const tabs = [
    { label: '인기순', sort: 'wishlistCount', direction: 'DESC' },
    { label: '신상품순', sort: 'createdAt', direction: 'DESC' },
    { label: '낮은 가격순', sort: 'salesPrice', direction: 'ASC' },
    { label: '높은 가격순', sort: 'salesPrice', direction: 'DESC' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm font-bold text-gray-900"></div>

        <div className="flex items-center gap-4 text-xs text-gray-400">
          {tabs.map((tab, idx) => {
            const isActive = filters.sort === tab.sort && filters.direction === tab.direction;

            return (
              <div key={tab.label} className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setSortOption(tab.sort, tab.direction);
                    setPage(0);
                  }}
                  className={
                    isActive
                      ? 'font-bold text-gray-900 cursor-pointer'
                      : 'hover:text-gray-600 cursor-pointer'
                  }
                >
                  {tab.label}
                </button>

                {idx !== tabs.length - 1 && <span className="w-px h-3 bg-gray-200" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
