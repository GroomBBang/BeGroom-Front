'use client';

import settlementAPI from '@/features/dashboard/apis/settlement.api';
import SellerSettlementContainer from '@/features/dashboard/components/settlements/SettlementContainer';
import SettlementSummary from '@/features/dashboard/components/settlements/SettlementSummary';
import { ArrowLeft, Download } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SellerSettlementPageV2() {
  const router = useRouter();
  const { downloadSettlementInCSV } = settlementAPI();

  const handleDownloadSettlementInCSV = async () => {
    const response = await downloadSettlementInCSV();
    // @ts-ignore
    const blob = new Blob([response], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'daily_settlement_all.csv');

    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
  };

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

        {/* 상단 헤더: 제목 + CSV */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">정산 관리</h1>
          </div>

          <button
            type="button"
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-sm border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-50"
            onClick={handleDownloadSettlementInCSV}
          >
            <Download size={18} className="text-gray-500" />
            일별 정산 내역 CSV 내보내기
          </button>
        </div>
        <div className="space-y-6">
          {/* 상단 요약 */}
          <SettlementSummary />

          {/* 컨테이너 */}
          <SellerSettlementContainer />
        </div>

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
