'use client';

import { productListAPI } from '@/features/product/api/productList.api';
import ProductCard from '@/features/product/components/ProductCard';
import { FiltersType, ProductCardType } from '@/features/product/types/model';
import { useEffect, useState } from 'react';
import Pagination from './Pagination';

interface Props {
  keyword?: string;
  categoryIds?: number;
  filters: FiltersType;
  setPage: (page: number) => void;
}

export default function ProductList({ keyword, categoryIds, filters, setPage }: Props) {
  const [products, setProducts] = useState<ProductCardType[]>([]);
  const [totalPages, setTotalPages] = useState(1);

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
    return <div className="py-20 text-center text-sm text-gray-400">로딩 중…</div>;
  }

  if (error) {
    return <div className="py-20 text-center text-sm text-red-500">{error}</div>;
  }

  if (products.length === 0) {
    return <div className="py-20 text-center text-sm text-gray-400">검색 결과가 없습니다.</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10">
        {products.map((product) => (
          <ProductCard key={String(product.productId)} product={product} />
        ))}
      </div>

      <div className="mt-10">
        <Pagination page={filters.page} totalPages={totalPages} onChange={setPage} />
      </div>
    </div>
  );
}
