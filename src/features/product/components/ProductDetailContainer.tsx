'use client';

import { useRecentProducts } from '@/features/user/hooks/useRecentProducts';
import { useEffect, useMemo } from 'react';
import { products } from '../mocks/product';
import ProductDetailMain from './ProductDetailMain';
import ProductDetailTab from './ProductDetailTab';
import ProductEmpty from './ProductEmpty';

export default function ProductDetailContainer({ id }: { id: string }) {
  // 최근 본 상품 추가
  const { addProduct } = useRecentProducts();

  const product = useMemo(() => products.find((p) => p.id === id), [id]);
  useEffect(() => {
    if (product) {
      addProduct({
        id: Number(product.id),
        thumb: product.imageUrls[0],
        time: Date.now(),
      });
    }
  }, [product, addProduct]);

  // 상품이 없으면 빈 화면 표시
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
