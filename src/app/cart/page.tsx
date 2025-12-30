// src/app/cart/page.tsx
'use client';

import CartContainer from '@/features/cart/components/CartContainer';
import CartRecommend from '@/features/cart/components/CartRecommend';

export default function CartPage() {
  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-foreground">장바구니</h1>

      <CartContainer />
      <CartRecommend />
    </div>
  );
}
