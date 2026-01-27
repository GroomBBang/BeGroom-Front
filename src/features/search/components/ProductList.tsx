'use client';

import { productListAPI } from '@/features/product/api/productList.api';
import ProductCard from '@/features/product/components/ProductCard';
import { FiltersType, ProductCardType } from '@/features/product/types/model';
import AlertModal from '@/shared/components/common/AlertModal';
import { useEffect, useState } from 'react';
import Pagination from './Pagination';
import ProductListLoading from './ProductListLoading';

interface Props {
  keyword?: string;
  categoryIds?: number;
  filters: FiltersType;
  setPage: (page: number) => void;
}

export default function ProductList({ keyword, categoryIds, filters, setPage }: Props) {
  const [products, setProducts] = useState<ProductCardType[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    async function fetchProducts() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await productListAPI.searchProducts({
          keyword,
          categoryIds,
          ...filters,
        });

        if (!alive) return;

        setProducts(data.content ?? []);
        setTotalPages(data.totalPages ?? 1);
        setTotalElements(data.totalElements ?? 0);
      } catch (e) {
        if (!alive) return;
        setError('상품을 불러오지 못했습니다.');
      } finally {
        if (!alive) return;
        setIsLoading(false);
      }
    }

    fetchProducts();

    return () => {
      alive = false;
    };
  }, [keyword, filters]);

  if (isLoading) {
    return (
      <>
        <ProductListLoading />
        <AlertModal isOpen={!!error} message={error ?? ''} onClose={() => setError(null)} />
      </>
    );
  }

  return (
    <>
      {products.length === 0 ? (
        <div className="py-20 text-center text-sm text-gray-400">검색 결과가 없습니다.</div>
      ) : (
        <div className="relative">
          <div className="absolute top-[-34px] left-0 text-sm text-gray-900 font-semibold">
            총 {totalElements}개
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10">
            {products.map((product) => (
              <ProductCard key={String(product.productId)} product={product} />
            ))}
          </div>

          <div className="mt-10">
            <Pagination page={filters.page} totalPages={totalPages} onChange={setPage} />
          </div>
        </div>
      )}

      <AlertModal isOpen={!!error} message={error ?? ''} onClose={() => setError(null)} />
    </>
  );
}
