import QuickMenu from '@/features/user/components/QuickMenu';
import MSWProvider from '@/providers/MSWProvider';
import ToastProvider from '@/providers/ToastProvider';
import SSEConnection from '@/shared/components/common/SSEConnection';
import Header from '@/shared/components/layout/Header';
import type { Metadata } from 'next';
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
        <Header />
        <MSWProvider>
          <SSEConnection />
          <div className="relative">
            {children}
            <div className="fixed top-[25%] right-[30px] hidden xl:block">
              <QuickMenu />
            </div>
          </div>
        </MSWProvider>
        <ToastProvider />
      </body>
    </html>
  );
}
