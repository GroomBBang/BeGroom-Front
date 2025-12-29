'use client';

import {
  ArrowLeft,
  BadgePercent,
  Download,
  Layers,
  List,
  PiggyBank,
  ReceiptText,
  Undo2,
  Wallet,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

type MainView = 'ITEM' | 'PERIOD';
type Granularity = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';

type ItemSettlementRow = {
  id: string;
  createdAt: string; // 최신순
  paymentAmount: number; // 결제금액
  refundAmount: number; // 환불금액
  feeRate: number; // 0.1
  feeAmount: number;
  settlementAmount: number;
  status: '정산대기' | '정산중' | '정산완료' | '보류';
};

type PeriodSettlementRow = {
  id: string;
  periodLabel: string; // 2024-12-28 / 2024-W50 / 2024-12 / 2024
  orderCount: number;
  grossSales: number; // 총매출(=결제 기준, 예시)
  refundAmount: number;
  feeRate: number;
  feeAmount: number;
  settlementAmount: number;
  status: '정산대기' | '정산중' | '정산완료' | '보류';
};

function formatKRW(v: number) {
  return `₩${v.toLocaleString('ko-KR')}`;
}

function pad2(n: number) {
  return String(n).padStart(2, '0');
}
function formatDate(d: Date) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

// ISO week(월요일 시작) 범위
function getISOWeekRange(year: number, week: number) {
  const jan4 = new Date(year, 0, 4);
  const day = jan4.getDay() || 7; // 일요일이면 7
  const mondayOfWeek1 = new Date(jan4);
  mondayOfWeek1.setDate(jan4.getDate() - (day - 1));

  const start = new Date(mondayOfWeek1);
  start.setDate(mondayOfWeek1.getDate() + (week - 1) * 7);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  return { start, end };
}

function displayPeriodLabel(periodLabel: string) {
  // 2024-W50 형태면 날짜 범위로 변환
  const m = periodLabel.match(/^(\d{4})-W(\d{1,2})$/);
  if (!m) return periodLabel;

  const year = Number(m[1]);
  const week = Number(m[2]);
  const { start, end } = getISOWeekRange(year, week);
  return `${formatDate(start)} ~ ${formatDate(end)}`;
}

export default function SellerSettlementPageV2() {
  // 대분류(건별/기간별)
  const [view, setView] = useState<MainView>('PERIOD');

  // 기간별 하위(버튼은 표 하단에)
  const [granularity, setGranularity] = useState<Granularity>('MONTHLY');

  // === 더미 데이터 ===
  const itemRows: ItemSettlementRow[] = useMemo(
    () => [
      {
        id: 'IT-20241228-0012',
        createdAt: '2024-12-28T11:10:00',
        paymentAmount: 128000,
        refundAmount: 9000,
        feeRate: 0.1,
        feeAmount: 11900,
        settlementAmount: 107100,
        status: '정산대기',
      },
      {
        id: 'IT-20241224-0011',
        createdAt: '2024-12-24T18:40:00',
        paymentAmount: 54000,
        refundAmount: 0,
        feeRate: 0.1,
        feeAmount: 5400,
        settlementAmount: 48600,
        status: '정산중',
      },
      {
        id: 'IT-20241220-0010',
        createdAt: '2024-12-20T09:20:00',
        paymentAmount: 33000,
        refundAmount: 33000,
        feeRate: 0.1,
        feeAmount: 0,
        settlementAmount: 0,
        status: '정산완료',
      },
    ],
    [],
  );

  const periodRowsByGranularity: Record<Granularity, PeriodSettlementRow[]> = useMemo(
    () => ({
      DAILY: [
        {
          id: 'PD-2024-12-28',
          periodLabel: '2024-12-28',
          orderCount: 6,
          grossSales: 128000,
          refundAmount: 9000,
          feeRate: 0.1,
          feeAmount: 11900,
          settlementAmount: 107100,
          status: '정산대기',
        },
        {
          id: 'PD-2024-12-24',
          periodLabel: '2024-12-24',
          orderCount: 2,
          grossSales: 54000,
          refundAmount: 0,
          feeRate: 0.1,
          feeAmount: 5400,
          settlementAmount: 48600,
          status: '정산중',
        },
      ],
      WEEKLY: [
        {
          id: 'PW-2024-W50',
          periodLabel: '2024-W50',
          orderCount: 18,
          grossSales: 310000,
          refundAmount: 12000,
          feeRate: 0.1,
          feeAmount: 29800,
          settlementAmount: 268200,
          status: '정산완료',
        },
        {
          id: 'PW-2024-W49',
          periodLabel: '2024-W49',
          orderCount: 9,
          grossSales: 175000,
          refundAmount: 0,
          feeRate: 0.1,
          feeAmount: 17500,
          settlementAmount: 157500,
          status: '정산완료',
        },
      ],
      MONTHLY: [
        {
          id: 'PM-2024-12',
          periodLabel: '2024-12',
          orderCount: 62,
          grossSales: 1320000,
          refundAmount: 54000,
          feeRate: 0.1,
          feeAmount: 126600,
          settlementAmount: 1139400,
          status: '정산중',
        },
        {
          id: 'PM-2024-11',
          periodLabel: '2024-11',
          orderCount: 48,
          grossSales: 980000,
          refundAmount: 12000,
          feeRate: 0.1,
          feeAmount: 96800,
          settlementAmount: 871200,
          status: '정산완료',
        },
      ],
      YEARLY: [
        {
          id: 'PY-2024',
          periodLabel: '2024',
          orderCount: 520,
          grossSales: 11500000,
          refundAmount: 210000,
          feeRate: 0.1,
          feeAmount: 1129000,
          settlementAmount: 10161000,
          status: '정산중',
        },
      ],
    }),
    [],
  );

  const periodRows = periodRowsByGranularity[granularity];

  // === 상단 요약: 전체 기간 고정 ===
  const summaryAllTime = useMemo(() => {
    // 실제로는 백엔드에서 전체 기간 집계 내려주는 게 정석
    // 여기서는 periodRows + itemRows를 섞지 않고, period 전체(월별 데이터) 기준처럼 보이게 더미 집계
    const base = periodRowsByGranularity.MONTHLY;
    const payment = base.reduce((acc, r) => acc + r.grossSales, 0);
    const refund = base.reduce((acc, r) => acc + r.refundAmount, 0);
    const fee = base.reduce((acc, r) => acc + r.feeAmount, 0);
    const settlement = base.reduce((acc, r) => acc + r.settlementAmount, 0);
    const feeRate = base.length ? base[0].feeRate : 0.1;
    return { payment, refund, fee, settlement, feeRate };
  }, [periodRowsByGranularity]);

  const statusPill = (status: string) => {
    const cls =
      status === '정산완료'
        ? 'bg-emerald-50 text-emerald-700'
        : status === '정산중'
          ? 'bg-blue-50 text-blue-700'
          : status === '보류'
            ? 'bg-red-50 text-red-700'
            : 'bg-gray-100 text-gray-700';
    return (
      <span
        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${cls}`}
      >
        {status}
      </span>
    );
  };

  const granularityButtons: { key: Granularity; label: string }[] = [
    { key: 'DAILY', label: '일간' },
    { key: 'WEEKLY', label: '주간' },
    { key: 'MONTHLY', label: '월간' },
    { key: 'YEARLY', label: '년간' },
  ];

  const router = useRouter();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className=" mx-auto max-w-6xl px-4 py-10">
        {/* 좌상단 뒤로가기 */}
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={16} className="text-gray-500" />
          대시보드로 돌아가기
        </button>
        {/* 상단: 전체 기간 고정 헤더 */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">정산 관리</h1>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-sm border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-50 cursor-pointer"
            onClick={() => {
              // TODO: CSV 다운로드(현재 화면 기준)
            }}
          >
            <Download size={18} className="text-gray-500 " />
            CSV 내보내기
          </button>
        </div>

        {/* 상단 요약 카드(전체 기간) */}
        <section className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="rounded-md bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-sm bg-blue-100 text-blue-600">
              <Wallet size={20} />
            </div>
            <p className="text-sm text-gray-500">결제금액</p>
            <p className="mt-1 text-xl font-bold text-gray-900">
              {formatKRW(summaryAllTime.payment)}
            </p>
          </div>

          <div className="rounded-md bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600">
              <Undo2 size={20} />
            </div>
            <p className="text-sm text-gray-500">환불금액</p>
            <p className="mt-1 text-xl font-bold text-gray-900">
              {formatKRW(summaryAllTime.refund)}
            </p>
          </div>

          <div className="rounded-md bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
              <BadgePercent size={20} />
            </div>
            <p className="text-sm text-gray-500">
              수수료 · {(summaryAllTime.feeRate * 100).toFixed(0)}%
            </p>
            <p className="mt-1 text-xl font-bold text-gray-900">{formatKRW(summaryAllTime.fee)}</p>
          </div>

          <div className="rounded-md bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
              <PiggyBank size={20} />
            </div>
            <p className="text-sm text-gray-500">정산금액</p>
            <p className="mt-1 text-xl font-bold text-gray-900">
              {formatKRW(summaryAllTime.settlement)}
            </p>
          </div>
        </section>

        {/* 대분류: 건별 / 기간별 */}
        <div className="mb-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setView('ITEM')}
            className={[
              'inline-flex items-center gap-2 rounded-sm px-4 py-2 text-sm font-medium transition cursor-pointer',
              view === 'ITEM'
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-700 shadow-sm hover:bg-gray-50',
            ].join(' ')}
          >
            <List size={16} />
            건별 정산
          </button>

          <button
            type="button"
            onClick={() => setView('PERIOD')}
            className={[
              'inline-flex items-center gap-2 rounded-sm px-4 py-2 text-sm font-medium transition cursor-pointer',
              view === 'PERIOD'
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-700 shadow-sm hover:bg-gray-50',
            ].join(' ')}
          >
            <Layers size={16} />
            기간별 정산
          </button>
        </div>

        {/* ===== 건별 정산 ===== */}
        {view === 'ITEM' && (
          <section className="rounded-md bg-white p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">건별 정산 내역</h2>
              <p className="mt-1 text-sm text-gray-500">
                건별은 <span className="font-medium text-gray-900">주문건수/총매출 컬럼 없이</span>{' '}
                정산 금액 중심으로 표시합니다.
              </p>
            </div>

            {/* 헤더(데스크탑) */}
            <div className="hidden grid-cols-12 gap-3 border-b border-gray-100 pb-3 text-sm font-medium text-gray-600 md:grid">
              <div className="col-span-4">정산 ID</div>
              <div className="col-span-2 text-right">결제금액</div>
              <div className="col-span-2 text-right">환불금액</div>
              <div className="col-span-2 text-right">정산금액</div>
              <div className="col-span-2 text-right">상태</div>
            </div>

            <ul className="divide-y">
              {itemRows
                .slice()
                .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
                .map((r) => (
                  <li key={r.id} className="py-4">
                    {/* 모바일 */}
                    <div className="flex flex-col gap-2 md:hidden">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{r.id}</p>
                          <p className="mt-1 text-xs text-gray-500">
                            {new Date(r.createdAt).toLocaleString('ko-KR')}
                          </p>
                        </div>
                        {statusPill(r.status)}
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="rounded-md bg-gray-50 p-3">
                          <p className="text-xs text-gray-500">결제</p>
                          <p className="mt-1 font-semibold text-gray-900">
                            {formatKRW(r.paymentAmount)}
                          </p>
                        </div>
                        <div className="rounded-md bg-gray-50 p-3">
                          <p className="text-xs text-gray-500">환불</p>
                          <p className="mt-1 font-semibold text-gray-900">
                            {formatKRW(r.refundAmount)}
                          </p>
                        </div>
                        <div className="rounded-md bg-gray-50 p-3">
                          <p className="text-xs text-gray-500">정산</p>
                          <p className="mt-1 font-semibold text-gray-900">
                            {formatKRW(r.settlementAmount)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 데스크탑 */}
                    <div className="hidden grid-cols-12 items-center gap-3 md:grid">
                      <div className="col-span-4">
                        <div className="flex items-center gap-2">
                          <ReceiptText size={18} className="text-gray-400" />
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{r.id}</p>
                            <p className="mt-1 text-xs text-gray-500">
                              {new Date(r.createdAt).toLocaleString('ko-KR')}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2 text-right text-sm font-medium text-gray-900">
                        {formatKRW(r.paymentAmount)}
                      </div>
                      <div className="col-span-2 text-right text-sm font-medium text-gray-900">
                        {formatKRW(r.refundAmount)}
                      </div>
                      <div className="col-span-2 text-right text-sm font-semibold text-gray-900">
                        {formatKRW(r.settlementAmount)}
                      </div>
                      <div className="col-span-2 flex justify-end">{statusPill(r.status)}</div>
                    </div>
                  </li>
                ))}
            </ul>

            {itemRows.length === 0 && (
              <div className="flex min-h-[220px] items-center justify-center text-sm text-gray-500">
                건별 정산 데이터가 없습니다.
              </div>
            )}
          </section>
        )}

        {view === 'PERIOD' && (
          <section className="rounded-md bg-white p-6 shadow-sm">
            {/* ✅ 헤더: 좌측 제목/설명 + 우측 버튼 */}
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">기간별 정산 내역</h2>
                <p className="mt-1 text-sm text-gray-500">
                  기간별은 기간/주문건수/총매출 같은 요약 컬럼이 포함됩니다.
                </p>
              </div>

              {/* ✅ 버튼을 우측 상단으로 */}
              <div className="flex flex-wrap gap-2 sm:justify-end">
                {granularityButtons.map((b) => {
                  const active = b.key === granularity;
                  return (
                    <button
                      key={b.key}
                      type="button"
                      onClick={() => setGranularity(b.key)}
                      className={[
                        'rounded-sm px-4 py-2 text-sm font-medium transition cursor-pointer',
                        active
                          ? 'bg-gray-900 text-white'
                          : 'bg-white text-gray-700 shadow-sm hover:bg-gray-50',
                      ].join(' ')}
                    >
                      {b.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 헤더(데스크탑) */}
            <div className="hidden grid-cols-12 gap-3 border-b border-gray-100 pb-3 text-sm font-medium text-gray-600 md:grid">
              <div className="col-span-3">기간</div>
              <div className="col-span-2 text-right">주문건수</div>
              <div className="col-span-2 text-right">총매출</div>
              <div className="col-span-2 text-right">수수료</div>
              <div className="col-span-2 text-right">정산금액</div>
              <div className="col-span-1 text-right">상태</div>
            </div>

            <ul className="divide-y">
              {periodRows.map((r) => (
                <li key={r.id} className="py-4">
                  {/* 모바일 */}
                  <div className="flex flex-col gap-2 md:hidden">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {displayPeriodLabel(r.periodLabel)}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          주문 {r.orderCount.toLocaleString('ko-KR')}건 · 총매출{' '}
                          {formatKRW(r.grossSales)}
                        </p>
                      </div>
                      {statusPill(r.status)}
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="rounded-md bg-gray-50 p-3">
                        <p className="text-xs text-gray-500">수수료</p>
                        <p className="mt-1 font-semibold text-gray-900">{formatKRW(r.feeAmount)}</p>
                      </div>
                      <div className="rounded-md bg-gray-50 p-3">
                        <p className="text-xs text-gray-500">정산금액</p>
                        <p className="mt-1 font-semibold text-gray-900">
                          {formatKRW(r.settlementAmount)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 데스크탑 */}
                  <div className="hidden grid-cols-12 items-center gap-3 md:grid">
                    <div className="col-span-3 text-sm font-medium text-gray-900">
                      {displayPeriodLabel(r.periodLabel)}
                    </div>
                    <div className="col-span-2 text-right text-sm text-gray-900">
                      {r.orderCount.toLocaleString('ko-KR')}
                    </div>
                    <div className="col-span-2 text-right text-sm font-medium text-gray-900">
                      {formatKRW(r.grossSales)}
                    </div>
                    <div className="col-span-2 text-right text-sm text-gray-900">
                      {formatKRW(r.feeAmount)}
                    </div>
                    <div className="col-span-2 text-right text-sm font-semibold text-gray-900">
                      {formatKRW(r.settlementAmount)}
                    </div>
                    <div className="col-span-1 flex justify-end">{statusPill(r.status)}</div>
                  </div>
                </li>
              ))}
            </ul>

            {periodRows.length === 0 && (
              <div className="flex min-h-[220px] items-center justify-center text-sm text-gray-500">
                선택한 기간 단위의 정산 데이터가 없습니다.
              </div>
            )}
          </section>
        )}

        {/* 안내 */}
        <section className="mt-8 rounded-md border border-blue-100 bg-blue-50 p-6">
          <h3 className="text-base font-semibold text-gray-900">정산 안내</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-700">
            <li>• 상단 요약은 전체 기간 고정 집계입니다.</li>
            <li>• 건별 정산: 정산 금액 중심(주문건수/총매출 컬럼 없음)</li>
            <li>• 기간별 정산: 기간/주문건수/총매출 등 요약 컬럼 포함</li>
            <li>• 정산금액 계산 예: (총매출 - 환불) - 수수료</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
