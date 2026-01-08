'use client';

import Pagination from '@/features/search/components/Pagination';
import Spinner from '@/shared/components/common/Spinner';
import { formatKRW } from '@/shared/lib/format';
import { useEffect, useState } from 'react';
import settlementAPI from '../../apis/settlement.api';
import { SettlementPeriodType } from '../../types/model';
import { SettlementDate } from './SettlementDate';

export default function SettlementPeriodList() {
  const {
    fetchSettlementDailyData,
    fetchSettlementWeeklyData,
    fetchSettlementMonthlyData,
    fetchSettlementYearlyData,
  } = settlementAPI();

  const [data, setData] = useState<SettlementPeriodType[]>([]);
  const [page, setPage] = useState(0);
  const [dayType, setDayType] = useState<'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY'>('DAILY');
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (dayType === 'DAILY') {
      fetchSettlementDailyData({ page })
        .then((res) => {
          setData(res.content);
          setTotalPages(res.totalPages);
        })
        .catch(() => {
          setData([]);
          setTotalPages(0);
        })
        .finally(() => setIsLoading(false));
    } else if (dayType === 'WEEKLY') {
      fetchSettlementWeeklyData({ page })
        .then((res) => {
          setData(res.content);
          setTotalPages(res.totalPages);
        })
        .catch(() => {
          setData([]);
          setTotalPages(0);
        })
        .finally(() => setIsLoading(false));
    } else if (dayType === 'MONTHLY') {
      fetchSettlementMonthlyData({ page })
        .then((res) => {
          setData(res.content);
          setTotalPages(res.totalPages);
        })
        .catch(() => {
          setData([]);
          setTotalPages(0);
        })
        .finally(() => setIsLoading(false));
    } else if (dayType === 'YEARLY') {
      fetchSettlementYearlyData({ page })
        .then((res) => {
          setData(res.content);
          setTotalPages(res.totalPages);
        })
        .catch(() => {
          setData([]);
          setTotalPages(0);
        })
        .finally(() => setIsLoading(false));
    } else {
      setData([]);
      setTotalPages(0);
    }
    setIsLoading(false);
  }, [page, dayType]);

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
          {(['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'] as const).map((t) => (
            <button
              key={t}
              onClick={() => {
                setDayType(t);
                setPage(0);
              }}
              className={`rounded-sm px-4 py-2 text-sm font-medium cursor-pointer ${
                dayType === t
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
      {!isLoading && data.length === 0 && (
        <div className="flex min-h-[220px] items-center justify-center text-sm text-gray-500">
          정산 데이터가 없습니다.
        </div>
      )}

      {/* 데이터 */}
      {!isLoading && data.length > 0 && (
        <>
          <div className="hidden grid-cols-7 gap-3 border-b pb-3 text-sm font-medium text-gray-600 md:grid">
            <div className="col-span-2 text-center">기간</div>
            <div className="col-span-2 text-center">총매출</div>
            <div className="col-span-1 text-center">수수료</div>
            <div className="col-span-2 text-center">정산금액</div>
          </div>

          <ul className="divide-y">
            {data.map((r, idx) => {
              return (
                <li key={idx} className="grid grid-cols-7 items-center py-4 text-sm">
                  <div className="col-span-2 text-center">
                    <SettlementDate
                      dayType={dayType}
                      period={r.period || ''}
                      startDate={r.startDate || ''}
                      endDate={r.endDate || ''}
                      year={r.year || 0}
                      month={r.month || 0}
                    />
                  </div>
                  <div className="col-span-2 text-center">{formatKRW(r.totalSalesAmount)}</div>
                  <div className="col-span-1 text-center">{formatKRW(r.totalFeeAmount)}</div>
                  <div className="col-span-2 text-center font-semibold">
                    {formatKRW(r.settlementAmount)}
                  </div>
                </li>
              );
            })}
          </ul>

          <Pagination
            page={page + 1}
            totalPages={totalPages}
            onChange={(p) => setPage(p - 1)}
            className="mt-3"
          />
        </>
      )}
    </section>
  );
}
