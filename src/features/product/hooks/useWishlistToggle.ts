// src/features/product/hooks/useWishlistToggle.ts
'use client';

import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { useModalStore } from '@/shared/stores/useModalStore';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

type Params = {
  initialLiked: boolean;
  initialCount: number;
  onToggleRequest: () => Promise<unknown>;
};

export function useWishlistToggle({ initialLiked, initialCount, onToggleRequest }: Params) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [isPending, setIsPending] = useState(false);
  const { onAlertModal } = useModalStore();
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();

  const toggle = useCallback(
    async (e?: React.MouseEvent<HTMLElement>) => {
      e?.preventDefault();
      e?.stopPropagation();

      if (!isLoggedIn) {
        onAlertModal('해당 기능은 로그인 후 이용해주세요.', () => router.push('/auth?mode=login'));
        return;
      }
      if (isPending) return;

      const prevLiked = liked;
      const prevCount = count;

      const nextLiked = !prevLiked;
      const nextCount = prevCount + (nextLiked ? 1 : -1);

      setLiked(nextLiked);
      setCount(nextCount);
      setIsPending(true);

      try {
        await onToggleRequest();
      } catch {
        setLiked(prevLiked);
        setCount(prevCount);
        onAlertModal('좋아요 중 오류가 발생하였습니다.');
      } finally {
        setIsPending(false);
      }
    },
    [isLoggedIn, onToggleRequest, isPending, liked, count],
  );

  return { liked, count, toggle, isPending };
}
