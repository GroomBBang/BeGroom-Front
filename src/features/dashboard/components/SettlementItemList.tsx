'use client';

import Badge from '@/shared/components/common/Badge';
import Spinner from '@/shared/components/common/Spinner';
import { formatKRW } from '@/shared/lib/format';
import { ContactRound } from 'lucide-react';
import { useEffect, useState } from 'react';
import settlementAPI from '../apis/settlement.api';
import { DashboardSettlementProductDTO } from '../types/response';

const settlementStatusBadgeMap: Record<
  DashboardSettlementProductDTO['settlementStatus'],
  { label: string; color: 'emerald' | 'blue' | 'red' }
> = {
  SETTLED: { label: '정산완료', color: 'emerald' },
  PENDING: { label: '정산대기', color: 'blue' },
  FAILED: { label: '정산실패', color: 'red' },
};

export default function SettlementItemList() {
  const { fetchSettlementProductData } = settlementAPI();

  const [products, setProducts] = useState<DashboardSettlementProductDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSettlementProductData().then((res) => {
      setProducts(res.result);
      setIsLoading(false);
    });
  }, []);

  return (
    <section className="rounded-md bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">건별 정산 내역</h2>
        <p className="mt-1 text-sm text-gray-500">
          건별 정산은 <span className="font-medium text-gray-900">결제·환불·수수료·정산</span> 금액
          기준으로 표시됩니다.
        </p>
      </div>

      {/* ===== 로딩 상태 ===== */}
      {isLoading && (
        <div className="flex min-h-[220px] items-center justify-center">
          <Spinner size="md" />
        </div>
      )}

      {/* ===== 데이터 없음 ===== */}
      {!isLoading && products.length === 0 && (
        <div className="flex min-h-[220px] items-center justify-center text-sm text-gray-500">
          건별 정산 데이터가 없습니다.
        </div>
      )}

      {/* ===== 데이터 있음 ===== */}
      {!isLoading && products.length > 0 && (
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
            {products
              .slice()
              .sort((a, b) => (a.paidAt < b.paidAt ? 1 : -1))
              .map((r) => {
                const badge = settlementStatusBadgeMap[r.settlementStatus];

                return (
                  <li key={r.id} className="py-4">
                    {/* 모바일 */}
                    <div className="flex flex-col gap-2 md:hidden">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{r.id}</p>
                          <p className="mt-1 text-xs text-gray-500">
                            {new Date(r.paidAt).toLocaleString('ko-KR')}
                          </p>
                        </div>
                        <Badge label={badge.label} color={badge.color} />
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
                          <p className="mt-1 font-semibold text-gray-900">
                            {formatKRW(r.feeAmount)}
                          </p>
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
                      <div className="col-span-3 flex justify-center items-center gap-4">
                        <ContactRound size={20} />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{r.id}</p>
                          <p className="mt-1 text-xs text-gray-500">
                            {new Date(r.paidAt).toLocaleString('ko-KR')}
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
                      <div className="col-span-2 flex justify-center">
                        <Badge label={badge.label} color={badge.color} />
                      </div>
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
