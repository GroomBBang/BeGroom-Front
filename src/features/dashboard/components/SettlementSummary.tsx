'use client';

import { formatKRW } from '@/shared/lib/format';
import { BadgePercent, PiggyBank, Undo2, Wallet } from 'lucide-react';
import { useEffect, useState } from 'react';
import settlementAPI from '../apis/settlement.api';
import { DashboardSummaryDTO } from '../types/response';

export default function SettlementSummary() {
  const { fetchSettlementData } = settlementAPI();
  const [summaryData, setSummaryData] = useState<DashboardSummaryDTO | null>(null);

  useEffect(() => {
    fetchSettlementData().then((res) => {
      setSummaryData(res.result.summary);
    });
  }, []);

  if (!summaryData) return <SummarySkeleton />;

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
      <div className="rounded-md bg-white p-5 shadow-sm">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-sm bg-blue-100 text-blue-600">
          <Wallet size={20} />
        </div>
        <p className="text-sm text-gray-500">결제금액</p>
        <p className="mt-1 text-xl font-bold text-gray-900">
          {formatKRW(summaryData.totalPaymentAmount)}
        </p>
      </div>

      <div className="rounded-md bg-white p-5 shadow-sm">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600">
          <Undo2 size={20} />
        </div>
        <p className="text-sm text-gray-500">환불금액</p>
        <p className="mt-1 text-xl font-bold text-gray-900">
          {formatKRW(summaryData.totalRefundAmount)}
        </p>
      </div>

      <div className="rounded-md bg-white p-5 shadow-sm">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
          <BadgePercent size={20} />
        </div>
        <p className="text-sm text-gray-500">수수료</p>
        <p className="mt-1 text-xl font-bold text-gray-900">
          {formatKRW(summaryData.totalFeeAmount)}
        </p>
      </div>

      <div className="rounded-md bg-white p-5 shadow-sm">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
          <PiggyBank size={20} />
        </div>
        <p className="text-sm text-gray-500">정산금액</p>
        <p className="mt-1 text-xl font-bold text-gray-900">
          {formatKRW(summaryData.totalSettlementAmount)}
        </p>
      </div>
    </section>
  );
}

function SummarySkeleton() {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
      {Array.from({ length: 4 }).map((_, idx) => (
        <div key={idx} className="rounded-md bg-white p-5 shadow-sm">
          <div className="mb-3 h-10 w-10 animate-pulse rounded-sm bg-gray-200" />
          <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
          <div className="mt-2 h-7 w-28 animate-pulse rounded bg-gray-200" />
        </div>
      ))}
    </section>
  );
}
