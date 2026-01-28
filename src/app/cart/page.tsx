// src/app/cart/page.tsx
'use client';

import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import CartContainer from '@/features/cart/components/CartContainer';
import AlertModal from '@/shared/components/common/AlertModal';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();

  if (!isLoggedIn) {
    return (
      <div className="mx-auto min-h-screen max-w-6xl px-4 py-10">
        <h1 className="mb-6 text-2xl font-bold text-foreground">장바구니</h1>

        <AlertModal
          isOpen={true}
          message="해당 기능은 로그인 후 이용해주세요."
          onClose={() => {
            router.replace('/auth?mode=login');
          }}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-foreground">장바구니</h1>

      <CartContainer />
    </div>
  );
}
