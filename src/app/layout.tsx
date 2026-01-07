import QuickMenu from '@/features/user/components/QuickMenu';
import MSWProvider from '@/providers/MSWProvider';
import ToastProvider from '@/providers/ToastProvider';
import SSEConnection from '@/shared/components/common/SSEConnection';
import Header from '@/shared/components/layout/Header';
import HideOnPopup from '@/shared/components/layout/HideOnPopup';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'BeGroom - 구름이들의 장보기',
  description: '샛별배송으로 만나는 신선한 식재료',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'BeGroom - 구름이들의 장보기',
    description: 'BeGroom에서 신선함을 만나보세요.',
    images: ['/images/og-image.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Suspense fallback={<div>Loading...</div>}>
          <HideOnPopup>
            <Header />
          </HideOnPopup>
        </Suspense>

        <MSWProvider>
          <SSEConnection />
          <div className="relative">
            {children}
            <Suspense fallback={<div>Loading...</div>}>
              <div className="fixed top-[25%] right-[30px] hidden xl:block">
                <QuickMenu />
              </div>
            </Suspense>
          </div>
        </MSWProvider>
        <ToastProvider />
      </body>
    </html>
  );
}
