'use client';

import { useRecentProducts } from '@/features/user/hooks/useRecentProducts';
import { useEffect, useState } from 'react';
import productAPI from '../api/product.api';
import { Product } from '../types';
import ProductDetailLoading from './ProductDetailLoading';
import ProductDetailMain from './ProductDetailMain';
import ProductDetailTab from './ProductDetailTab';
import ProductEmpty from './ProductEmpty';

export default function ProductDetailContainer({ id }: { id: string }) {
  // 최근 본 상품 추가
  const { addProduct } = useRecentProducts();
  const { fetchProduct } = productAPI();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 상품 조회
  useEffect(() => {
    fetchProduct(id)
      .then((product) => setProduct(product))
      .finally(() => setIsLoading(false));
  }, [id]);

  // 최근 본 상품 추가
  useEffect(() => {
    if (product) {
      addProduct({
        id: Number(product.id),
        thumb: product.imageUrls[0],
        time: Date.now(),
      });
    }
  }, [product, addProduct]);

  // 로딩 중
  if (isLoading) {
    return <ProductDetailLoading />;
  }

  // 상품이 없음
  if (!product) {
    return <ProductEmpty />;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <ProductDetailMain product={product} />
      <ProductDetailTab product={product} />
    </div>
  );
}
