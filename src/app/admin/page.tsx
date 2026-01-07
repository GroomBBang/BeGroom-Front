'use client';

import notificationApi from '@/features/notification/apis/notification.api';
import { ArrowRight } from 'lucide-react';

export default function SellerDashboardMain() {
  const { sendServiceInspectionNoti } = notificationApi();

  const onClickServiceInspectionNoti = () => {
    sendServiceInspectionNoti({
      startTime: '2026.01.01 00:00',
      endTime: '2026.01.01 05:00',
    });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="mb-6 text-2xl font-bold text-foreground">관리자 대시보드</h1>

        <section className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <button
            onClick={onClickServiceInspectionNoti}
            className="flex min-h-[140px] flex-col items-start gap-2 rounded-md bg-white p-6 shadow-sm transition hover:shadow-md cursor-pointer"
          >
            <h2 className="text-lg font-semibold">서비스 점검 알림 전송</h2>
            <p className="mb-2text-sm text-gray-500">서비스 점검 알림을 전송합니다.</p>

            <span className="ml-auto mt-auto text-gray-500">
              <ArrowRight size={28} />
            </span>
          </button>
        </section>
      </div>
    </main>
  );
}
