'use client';

import { useSSE } from '@/shared/hooks/useSSE';

export default function SSEConnection() {
  useSSE();
  return null;
}
