// src/features/product/hooks/useWishlistToggle.ts
'use client';

import { useCallback, useState } from 'react';

type Params = {
  initialLiked: boolean;
  initialCount: number;
  isLoggedIn: boolean;
  onError: (error: string) => void;
  onToggleRequest: () => Promise<unknown>;
};

export function useWishlistToggle({
  initialLiked,
  initialCount,
  isLoggedIn,
  onError,
  onToggleRequest,
}: Params) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [isPending, setIsPending] = useState(false);

  const toggle = useCallback(
    async (e?: React.MouseEvent<HTMLElement>) => {
      e?.preventDefault();
      e?.stopPropagation();

      if (!isLoggedIn) {
        onError('해당 기능은 로그인 후 이용해주세요.');
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
        onError('좋아요 중 오류가 발생하였습니다.');
      } finally {
        setIsPending(false);
      }
    },
    [isLoggedIn, onError, onToggleRequest, isPending, liked, count],
  );

  return { liked, count, toggle, isPending };
}
