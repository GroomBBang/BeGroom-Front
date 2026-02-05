'use client';

import { productListAPI, SearchProductsParams } from '@/features/product/api/productList.api';
import { ProductCardType } from '@/features/product/types/model';
import { useEffect, useState } from 'react';

export function useProductSearch(params: SearchProductsParams) {
  const [data, setData] = useState<ProductCardType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);

      try {
        const result = await productListAPI.searchProducts(params);
        setData(result.content);
      } catch (error) {
        console.error('상품 조회 실패:');
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [params]);

  return { data, isLoading };
}
