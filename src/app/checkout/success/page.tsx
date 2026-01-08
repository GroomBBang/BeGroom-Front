// src/app/checkout/success/page.tsx
'use client';

import { Check } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-screen-xl items-center justify-center bg-background px-5 py-10">
      <div className="text-center">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-green-500/15">
          <Check className="h-10 w-10 text-green-500" />
        </div>

        <h1 className="mt-8 text-2xl font-extrabold text-foreground">주문이 완료되었습니다!</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          주문하신 상품은 새벽 7시 전에 배송될 예정입니다.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/my"
            className="inline-flex items-center justify-center h-11 rounded-sm border border-border bg-background px-5 text-sm font-bold text-foreground hover:bg-muted"
          >
            주문 내역 확인
          </Link>

          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-sm bg-primary-700 px-5 text-sm font-bold text-white hover:bg-primary-800"
          >
            쇼핑 계속하기
          </Link>
        </div>
      </div>
    </div>
  );
}
