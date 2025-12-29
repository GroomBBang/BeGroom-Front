'use client';

import QuickMenu from '@/features/search/components/QuickMenu';
import ToastProvider from '@/providers/ToastProvider';
import Header from '@/shared/components/layout/Header';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Header />
        <div className="relative">
          {children}
          <div className="fixed top-[25%] right-[30px] hidden xl:block">
            <QuickMenu />
          </div>
        </div>
        <ToastProvider />
      </body>
    </html>
  );
}
