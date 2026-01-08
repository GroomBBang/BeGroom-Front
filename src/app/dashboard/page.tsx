'use client';

import DashboardRecentList from '@/features/dashboard/components/main/DashboardRecentList';
import DashboardSummary from '@/features/dashboard/components/main/DashboardSummary';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SellerDashboardMain() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* 페이지 타이틀 */}
        <h1 className="mb-6 text-2xl font-bold text-foreground">판매자 대시보드</h1>

        {/* 상단 요약 카드 */}
        <DashboardSummary />

        {/* 중단 관리 카드 영역 */}
        <section className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* 주문 관리 */}
          <button
            onClick={() => router.push('/dashboard/orders')}
            className="flex min-h-[140px] flex-col items-start gap-2 rounded-md bg-white p-6 shadow-sm transition hover:shadow-md cursor-pointer"
          >
            <h2 className="text-lg font-semibold">주문 관리</h2>
            <p className="mb-2text-sm text-gray-500">주문 조회 및 상태 관리</p>

            {/* 네비게이션 화살표 */}
            <span className="ml-auto mt-auto text-gray-500">
              <ArrowRight size={28} />
            </span>
          </button>

          {/* 정산 관리 */}
          <button
            onClick={() => router.push('/dashboard/settlements')}
            className="flex min-h-[140px] flex-col items-start gap-2 rounded-md bg-white p-6 shadow-sm transition hover:shadow-md cursor-pointer"
          >
            <h2 className="text-lg font-semibold">정산 관리</h2>
            <p className="mb-2 text-sm text-gray-500">판매 정산 및 집계</p>

            {/* 네비게이션 화살표 */}
            <span className="ml-auto mt-auto text-gray-500">
              <ArrowRight size={28} />
            </span>
          </button>
        </section>

        {/* 최근 활동 */}
        <DashboardRecentList />
      </div>
    </main>
  );
}
