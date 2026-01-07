// src/app/checkout/page.tsx
'use client';

import CheckoutContainer from '@/features/checkout/components/CheckoutContainer';

export default function CheckoutPage() {
  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-foreground">주문/결제</h1>

      <CheckoutContainer />
    </div>
  );
}
