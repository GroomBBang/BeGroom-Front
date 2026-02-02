'use client';

import { useProductDetail } from '../hooks/useProductDetail';
import ProductDetailLoading from './ProductDetailLoading';
import ProductDetailMain from './ProductDetailMain';
import ProductDetailTab from './ProductDetailTab';
import ProductEmpty from './ProductEmpty';

export default function ProductDetailContainer({ id }: { id: string }) {
  const { product, isLoading } = useProductDetail(id);

  // 로딩 중
  if (isLoading) {
    return <ProductDetailLoading />;
  }

  // 상품 없음
  if (!product) {
    return <ProductEmpty />;
  }

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-10">
        <ProductDetailMain product={product} />
        <ProductDetailTab product={product} />
      </div>
    </>
  );
}
