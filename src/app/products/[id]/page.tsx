// src/app/product/[id]/page.tsx

import ProductDetailContainer from '@/features/product/components/ProductDetailContainer';
import { use } from 'react';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return <ProductDetailContainer id={id} />;
}
