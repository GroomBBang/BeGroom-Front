'use client';

import { useEffect, useState } from 'react';

export default function MSWProvider({ children }: { children: React.ReactNode }) {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
        const { worker } = await import('../mocks/browser');
        await worker.start({
          onUnhandledRequest: 'bypass',
        });
        setMswReady(true);
      } else {
        setMswReady(true);
      }
    };

    init();
  }, []);

  if (!mswReady) return null;

  return <>{children}</>;
}
