// src/app/cart/page.tsx
'use client';

import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import CartContainer from '@/features/cart/components/CartContainer';
import { useModalStore } from '@/shared/stores/useModalStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CartPage() {
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();
  const { onAlertModal } = useModalStore();

  useEffect(() => {
    if (!isLoggedIn) {
      onAlertModal('해당 기능은 로그인 후 이용해주세요.', () => router.replace('/auth?mode=login'));
    }
  }, [isLoggedIn, onAlertModal, router]);

  if (!isLoggedIn) return null;

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-foreground">장바구니</h1>

      <CartContainer />
    </div>
  );
}
