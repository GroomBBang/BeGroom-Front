'use client';

import { ArrowRight, Package, ShoppingBag, Wallet } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SellerDashboardMain() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* 페이지 타이틀 */}
        <h1 className="mb-6 text-2xl font-bold text-foreground">판매자 대시보드</h1>

        {/* 상단 요약 카드 */}
        <section className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* 총 주문 */}
          <div className="rounded-md bg-white p-6 shadow-sm">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <ShoppingBag size={20} />
            </div>
            <p className="text-2xl font-bold">1,234</p>
            <p className="mt-1 text-sm text-gray-500">총 주문</p>
          </div>

          {/* 총 상품 */}
          <div className="rounded-md bg-white p-6 shadow-sm">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
              <Package size={20} />
            </div>
            <p className="text-2xl font-bold">156</p>
            <p className="mt-1 text-sm text-gray-500">총 상품</p>
          </div>

          {/* 총 매출 */}
          <div className="rounded-md bg-white p-6 shadow-sm cursor-pointer">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100 text-yellow-600">
              <Wallet size={20} />
            </div>
            <p className="text-2xl font-bold">₩12,345,678</p>
            <p className="mt-1 text-sm text-gray-500">총 매출</p>
          </div>
        </section>

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
        <section className="rounded-md bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">최근 활동</h2>

          <ul className="divide-y divide-gray-200">
            <li className="flex items-center justify-between py-4">
              <div>
                <p className="font-medium">새로운 주문</p>
                <p className="text-sm text-gray-500">주문번호 #12345</p>
              </div>
              <span className="text-sm text-gray-400">5분 전</span>
            </li>

            <li className="flex items-center justify-between py-4">
              <div>
                <p className="font-medium">상품 재고 부족</p>
                <p className="text-sm text-gray-500">유기농 샐러드 믹스</p>
              </div>
              <span className="text-sm text-gray-400">1시간 전</span>
            </li>

            <li className="py-10 text-center text-sm text-gray-400">추가 활동 내역이 없습니다</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
