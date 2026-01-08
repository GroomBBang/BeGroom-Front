'use client';

import { OrderList } from '@/features/dashboard/components/order/OrderList';
import { OrderSummary } from '@/features/dashboard/components/order/OrderSummary';
import { ArrowLeft, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SellerOrdersPage() {
  const router = useRouter();

  const [query, setQuery] = useState('');

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* 좌상단 뒤로가기 */}
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={16} className="text-gray-500" />
          대시보드로 돌아가기
        </button>

        {/* 타이틀 + 검색 */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">주문 관리</h1>
          </div>

          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
            <div className="flex items-center gap-2 rounded-md bg-white px-3 py-2 shadow-sm">
              <Search size={18} className="text-gray-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="주문번호 또는 상태로 검색"
                className="w-full bg-transparent text-sm text-gray-900 outline-none sm:w-[220px]"
              />
            </div>
          </div>
        </div>

        {/* 상단 요약 */}
        <OrderSummary />

        {/* 테이블 */}
        <section className="rounded-md bg-white shadow-sm">
          {/* 헤더 */}
          <div className="hidden grid-cols-10 gap-3 border-b border-gray-100 px-6 py-4 text-sm font-medium text-gray-600 md:grid">
            <div className="col-span-1 text-center">주문번호</div>
            <div className="col-span-3 text-center">주문일시</div>
            <div className="col-span-2 text-center">주문금액</div>
            <div className="col-span-2 text-center">결제방법</div>
            <div className="col-span-2 text-center">상태</div>
          </div>

          {/* 바디 */}
          <OrderList />
        </section>
      </div>
    </main>
  );
}
