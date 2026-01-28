import { useRecentProducts } from '@/features/user/hooks/useRecentProducts';
import { useEffect, useState } from 'react';
import productAPI from '../api/product.api';
import { ProductType } from '../types/model';

export function useProductDetail(id: string) {
  const [product, setProduct] = useState<ProductType>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { addProduct } = useRecentProducts();
  const { fetchProduct } = productAPI();

  // 상품 조회
  useEffect(() => {
    fetchProduct(id)
      .then((product) => {
        if (!product) {
          setError('상품을 찾을 수 없습니다.');
          return;
        }
        setProduct(product);
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, [id]);

  // 최근 본 상품 추가
  useEffect(() => {
    if (product) {
      addProduct({
        id: Number(product.productId),
        thumb: product.mainImageUrl,
        time: Date.now(),
      });
    }
  }, [product]);

  // 에러 초기화
  const clearError = () => setError(null);

  return {
    product,
    isLoading,
    error,
    clearError,
  };
}
