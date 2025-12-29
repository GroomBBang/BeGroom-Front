'use client';

import { ArrowLeft, Clock3, CreditCard, Package, Search, Undo2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

type OrderStatus =
  | '결제완료'
  | '배송중'
  | '배송완료'
  | '환불요청'
  | '환불완료'
  | '정산대기'
  | '정산완료';

type OrderRow = {
  id: string; // 주문번호
  orderedAt: string; // 주문일시
  amount: number; // 주문금액
  paymentMethod: '카드' | '간편결제' | '계좌이체';
  status: OrderStatus;
};

function formatKRW(v: number) {
  return `₩${v.toLocaleString('ko-KR')}`;
}

function statusPill(status: OrderStatus) {
  const cls =
    status === '배송완료'
      ? 'bg-emerald-50 text-emerald-700'
      : status === '배송중'
        ? 'bg-indigo-50 text-indigo-700'
        : status === '결제완료'
          ? 'bg-gray-100 text-gray-700'
          : status === '환불요청'
            ? 'bg-amber-50 text-amber-700'
            : status === '환불완료'
              ? 'bg-red-50 text-red-700'
              : status === '정산대기'
                ? 'bg-blue-50 text-blue-700'
                : 'bg-purple-50 text-purple-700';

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${cls}`}>
      {status}
    </span>
  );
}

export default function SellerOrdersPage() {
  const router = useRouter();

  const rows: OrderRow[] = useMemo(
    () => [
      {
        id: 'OD-20241228-12345',
        orderedAt: '2024-12-28 11:10',
        amount: 128000,
        paymentMethod: '카드',
        status: '정산대기',
      },
      {
        id: 'OD-20241224-12312',
        orderedAt: '2024-12-24 18:40',
        amount: 54000,
        paymentMethod: '간편결제',
        status: '배송완료',
      },
      {
        id: 'OD-20241222-12201',
        orderedAt: '2024-12-22 09:20',
        amount: 33000,
        paymentMethod: '계좌이체',
        status: '환불요청',
      },
      {
        id: 'OD-20241219-12088',
        orderedAt: '2024-12-19 15:05',
        amount: 210000,
        paymentMethod: '카드',
        status: '정산완료',
      },
      {
        id: 'OD-20241216-11902',
        orderedAt: '2024-12-16 13:32',
        amount: 76000,
        paymentMethod: '간편결제',
        status: '환불완료',
      },
    ],
    [],
  );

  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return rows;
    const q = query.trim().toLowerCase();
    return rows.filter((r) => r.id.toLowerCase().includes(q) || r.status.toLowerCase().includes(q));
  }, [rows, query]);

  // ✅ 상단 요약(환불 수, 정산대기)
  const summary = useMemo(() => {
    const refundCount = rows.filter(
      (r) => r.status === '환불요청' || r.status === '환불완료',
    ).length;
    const settlementPendingCount = rows.filter((r) => r.status === '정산대기').length;
    return { refundCount, settlementPendingCount };
  }, [rows]);

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

        {/* ✅ 상단 요약(디자인엔 없지만 추가) */}
        <section className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* 환불 수 */}
          <div className="rounded-md bg-white p-6 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600">
                <Undo2 size={20} />
              </div>
              <span className="text-xs text-gray-400">최근 주문 기준</span>
            </div>
            <p className="text-sm text-gray-500">환불 수</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {summary.refundCount.toLocaleString('ko-KR')}건
            </p>
            <p className="mt-2 text-xs text-gray-500">환불요청/환불완료 포함</p>
          </div>

          {/* 정산대기 */}
          <div className="rounded-md bg-white p-6 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                <Clock3 size={20} />
              </div>
              <span className="text-xs text-gray-400">지급 전</span>
            </div>
            <p className="text-sm text-gray-500">정산대기</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {summary.settlementPendingCount.toLocaleString('ko-KR')}건
            </p>
            <p className="mt-2 text-xs text-gray-500">정산 완료 전 주문</p>
          </div>
        </section>

        {/* 테이블 */}
        <section className="rounded-md bg-white shadow-sm">
          {/* 헤더 */}
          <div className="hidden grid-cols-12 gap-3 border-b border-gray-100 px-6 py-4 text-sm font-medium text-gray-600 md:grid">
            <div className="col-span-3">주문번호</div>
            <div className="col-span-3">주문일시</div>
            <div className="col-span-2 text-right">주문금액</div>
            <div className="col-span-2">결제방법</div>
            <div className="col-span-2">상태</div>
          </div>

          {/* 바디 */}
          <ul className="divide-y">
            {filtered.map((r) => (
              <li key={r.id} className="px-6 py-4">
                {/* 모바일 */}
                <div className="flex flex-col gap-2 md:hidden">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{r.id}</p>
                      <p className="mt-1 text-xs text-gray-500">{r.orderedAt}</p>
                    </div>
                    {statusPill(r.status)}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="rounded-md bg-gray-50 p-3">
                      <p className="text-xs text-gray-500">주문금액</p>
                      <p className="mt-1 font-semibold text-gray-900">{formatKRW(r.amount)}</p>
                    </div>
                    <div className="rounded-md bg-gray-50 p-3">
                      <p className="text-xs text-gray-500">결제방법</p>
                      <p className="mt-1 font-semibold text-gray-900">{r.paymentMethod}</p>
                    </div>
                  </div>
                </div>

                {/* 데스크탑 */}
                <div className="hidden grid-cols-12 items-center gap-3 md:grid">
                  <div className="col-span-3">
                    <div className="flex items-center gap-2">
                      <Package size={18} className="text-gray-400" />
                      <p className="text-sm font-semibold text-gray-900">{r.id}</p>
                    </div>
                  </div>

                  <div className="col-span-3 text-sm text-gray-700">{r.orderedAt}</div>

                  <div className="col-span-2 text-right text-sm font-semibold text-gray-900">
                    {formatKRW(r.amount)}
                  </div>

                  <div className="col-span-2">
                    <div className="inline-flex items-center gap-2 text-sm text-gray-700">
                      <CreditCard size={16} className="text-gray-400" />
                      {r.paymentMethod}
                    </div>
                  </div>

                  <div className="col-span-2">{statusPill(r.status)}</div>
                </div>
              </li>
            ))}
          </ul>

          {filtered.length === 0 && (
            <div className="flex min-h-[220px] items-center justify-center px-6 py-10 text-sm text-gray-500">
              주문 내역이 없습니다
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
