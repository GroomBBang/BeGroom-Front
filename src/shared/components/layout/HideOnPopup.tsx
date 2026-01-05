'use client';

import { usePathname } from 'next/navigation';

export default function HideOnPopup({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname?.startsWith('/popup')) {
    return null;
  }

  return <>{children}</>;
}
