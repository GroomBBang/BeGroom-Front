'use client';

import AlertModal from '@/shared/components/common/AlertModal';
import { useProductDetail } from '../hooks/useProductDetail';
import ProductDetailLoading from './ProductDetailLoading';
import ProductDetailMain from './ProductDetailMain';
import ProductDetailTab from './ProductDetailTab';
import ProductEmpty from './ProductEmpty';

export default function ProductDetailContainer({ id }: { id: string }) {
  const { product, isLoading, error, clearError } = useProductDetail(id);

  // 로딩 중
  if (isLoading) {
    return <ProductDetailLoading />;
  }

  // 상품 없음
  if (!product) {
    return (
      <>
        <ProductEmpty />

        <AlertModal
          isOpen={!!error}
          message={error || '상품 조회 중 오류가 발생했습니다.'}
          onClose={clearError}
        />
      </>
    );
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
