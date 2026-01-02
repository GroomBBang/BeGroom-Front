'use client';

import Badge from '@/shared/components/common/Badge';
import Spinner from '@/shared/components/common/Spinner';
import { formatKRW } from '@/shared/lib/format';
import { useEffect, useState } from 'react';
import settlementAPI from '../apis/settlement.api';
import { DashboardPeriodType } from '../types/response';

type PeriodRow = {
  period: string;
  orderCnt: number;
  totalSalesAmount: number;
  totalFeeAmount: number;
  settlementAmount: number;
  status: 'SETTLED' | 'PENDING' | 'FAILED';
};

const statusMap = {
  SETTLED: { label: '정산완료', color: 'emerald' },
  PENDING: { label: '정산대기', color: 'blue' },
  FAILED: { label: '정산실패', color: 'red' },
} as const;

export default function SettlementPeriodSection() {
  const { fetchSettlementPeriodData } = settlementAPI();

  const [type, setType] = useState<DashboardPeriodType>('DAILY');
  const [rows, setRows] = useState<PeriodRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    fetchSettlementPeriodData(type).then((res) => {
      setRows(res.result);
      setIsLoading(false);
    });
  }, [type]);

  return (
    <section className="rounded-md bg-white p-6 shadow-sm">
      {/* 헤더 */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">기간별 정산 내역</h2>
          <p className="mt-1 text-sm text-gray-500">
            기간별 정산 데이터를 단위별로 확인할 수 있습니다.
          </p>
        </div>

        <div className="flex gap-2">
          {(['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'] as DashboardPeriodType[]).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`rounded-sm px-4 py-2 text-sm font-medium ${
                type === t
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-700 shadow-sm hover:bg-gray-50'
              }`}
            >
              {t === 'DAILY' ? '일간' : t === 'WEEKLY' ? '주간' : t === 'MONTHLY' ? '월간' : '년간'}
            </button>
          ))}
        </div>
      </div>

      {/* 로딩 */}
      {isLoading && (
        <div className="flex min-h-[220px] items-center justify-center">
          <Spinner />
        </div>
      )}

      {/* 데이터 없음 */}
      {!isLoading && rows.length === 0 && (
        <div className="flex min-h-[220px] items-center justify-center text-sm text-gray-500">
          정산 데이터가 없습니다.
        </div>
      )}

      {/* 데이터 */}
      {!isLoading && rows.length > 0 && (
        <>
          <div className="hidden grid-cols-6 gap-3 border-b pb-3 text-sm font-medium text-gray-600 md:grid">
            <div className="text-center">기간</div>
            <div className="text-center">주문건수</div>
            <div className="text-center">총매출</div>
            <div className="text-center">수수료</div>
            <div className="text-center">정산금액</div>
            <div className="text-center">상태</div>
          </div>

          <ul className="divide-y">
            {rows.map((r) => {
              const badge = statusMap[r.status];

              return (
                <li key={r.period} className="grid grid-cols-6 items-center py-4 text-sm">
                  <div className="text-center">{r.period}</div>
                  <div className="text-center">{r.orderCnt}</div>
                  <div className="text-center">{formatKRW(r.totalSalesAmount)}</div>
                  <div className="text-center">{formatKRW(r.totalFeeAmount)}</div>
                  <div className="text-center font-semibold">{formatKRW(r.settlementAmount)}</div>
                  <div className="flex justify-center">
                    <Badge label={badge.label} color={badge.color} />
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </section>
  );
}
