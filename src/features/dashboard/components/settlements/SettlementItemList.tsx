'use client';

import Pagination from '@/features/search/components/Pagination';
import Spinner from '@/shared/components/common/Spinner';
import { formatKRW } from '@/shared/lib/format';
import { ContactRound } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import settlementAPI from '../../apis/settlement.api';
import { getOrderStatusPill } from '../../lib/statusPill';
import { SettlementProductType } from '../../types/model';

export default function SettlementItemList() {
  const { fetchSettlementProductData } = settlementAPI();

  const [data, setData] = useState<SettlementProductType[]>([]);
  const [params, setParams] = useState({
    startDate: '',
    endDate: '',
    page: 0,
  });
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  useEffect(() => {
    setIsLoading(true);
    fetchSettlementProductData({ params })
      .then((res) => {
        setData(res.content);
        setTotalPages(res.totalPages);
      })
      .catch(() => {
        setData([]);
        setTotalPages(0);
      })
      .finally(() => setIsLoading(false));
  }, [params]);

  const onChangeStartDate = (v: string) => {
    setParams((prev) => ({
      ...prev,
      startDate: v,
      endDate: prev.endDate && prev.endDate < v ? '' : prev.endDate,
      page: 0,
    }));
  };

  const onChangeEndDate = (v: string) => {
    setParams((prev) => ({
      ...prev,
      endDate: v,
      page: 0,
    }));
  };

  const onClearDates = () => {
    setParams((prev) => ({ ...prev, startDate: '', endDate: '', page: 0 }));
  };

  return (
    <section className="rounded-md bg-white p-6 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">건별 정산 내역</h2>
          <p className="mt-1 text-sm text-gray-500">
            건별 정산은 <span className="font-medium text-gray-900">결제·환불·수수료·정산</span>{' '}
            금액 기준으로 표시됩니다.
          </p>
        </div>

        {/* 우측 상단 날짜 필터 */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:justify-end">
          <div className="flex flex-col gap-2">
            <input
              type="date"
              value={params.startDate}
              max={params.endDate || today}
              onChange={(e) => onChangeStartDate(e.target.value)}
              className="h-8 rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none focus:border-gray-300"
            />
          </div>

          <p className="text-sm font-medium text-gray-600">~</p>

          <div className="flex flex-col gap-2">
            <input
              type="date"
              value={params.endDate}
              min={params.startDate || undefined}
              max={today}
              onChange={(e) => onChangeEndDate(e.target.value)}
              className="h-8 rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none focus:border-gray-300"
            />
          </div>

          <button
            type="button"
            onClick={onClearDates}
            className="h-8 rounded-md border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            초기화
          </button>
        </div>
      </div>

      {/* 로딩중 */}
      {isLoading && (
        <div className="flex min-h-[220px] items-center justify-center">
          <Spinner size="md" />
        </div>
      )}

      {/* 데이터 없음 */}
      {!isLoading && data.length === 0 && (
        <div className="flex min-h-[220px] items-center justify-center text-sm text-gray-500">
          건별 정산 데이터가 없습니다.
        </div>
      )}

      {!isLoading && data.length > 0 && (
        <>
          {/* 헤더(데스크탑) */}
          <div className="hidden grid-cols-13 gap-3 border-b border-gray-100 pb-3 text-sm font-medium text-gray-600 md:grid">
            <div className="col-span-3 text-center">정산 ID</div>
            <div className="col-span-2 text-center">결제금액</div>
            <div className="col-span-2 text-center">환불금액</div>
            <div className="col-span-2 text-center">수수료</div>
            <div className="col-span-2 text-center">정산금액</div>
            <div className="col-span-2 text-center">상태</div>
          </div>

          <ul className="divide-y">
            {data.map((r) => {
              const { label, cls } = getOrderStatusPill(r.settlementStatus, r.paymentStatus);
              return (
                <li key={r.id} className="py-4">
                  {/* 모바일 */}
                  <div className="flex flex-col gap-2 md:hidden">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{r.id}</p>
                        <p className="mt-1 text-xs text-gray-500">
                          {new Date(r.date).toLocaleString('ko-KR')}
                        </p>
                      </div>
                      <div className="col-span-2 text-center">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${cls}`}
                        >
                          {label}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-sm">
                      <div>
                        <p className="text-xs text-gray-500">결제</p>
                        <p className="mt-1 font-semibold text-gray-900">
                          {formatKRW(r.paymentAmount)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">환불</p>
                        <p className="mt-1 font-semibold text-gray-900">
                          {formatKRW(r.refundAmount)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">수수료</p>
                        <p className="mt-1 font-semibold text-gray-900">{formatKRW(r.feeAmount)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">정산</p>
                        <p className="mt-1 font-semibold text-gray-900">
                          {formatKRW(r.settlementAmount)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 데스크탑 */}
                  <div className="hidden grid-cols-13 items-center gap-3 md:grid">
                    <div className="col-span-3 flex items-center justify-center gap-4">
                      <ContactRound size={20} />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{r.id}</p>
                        <p className="mt-1 text-xs text-gray-500">
                          {new Date(r.date).toLocaleString('ko-KR')}
                        </p>
                      </div>
                    </div>

                    <div className="col-span-2 text-center text-sm font-medium">
                      {formatKRW(r.paymentAmount)}
                    </div>
                    <div className="col-span-2 text-center text-sm font-medium">
                      {formatKRW(r.refundAmount)}
                    </div>
                    <div className="col-span-2 text-center text-sm">{formatKRW(r.feeAmount)}</div>
                    <div className="col-span-2 text-center text-sm font-semibold">
                      {formatKRW(r.settlementAmount)}
                    </div>
                    <div className="col-span-2 text-center">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${cls}`}
                      >
                        {label}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <Pagination
            page={params.page + 1}
            totalPages={totalPages}
            onChange={(p) => setParams((prev) => ({ ...prev, page: p - 1 }))}
            className="mt-3"
          />
        </>
      )}
    </section>
  );
}
