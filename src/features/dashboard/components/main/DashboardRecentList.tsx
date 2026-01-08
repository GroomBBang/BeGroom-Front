'use client';

import { useEffect, useState } from 'react';
import { fetchDashboardRecentData } from '../../apis/dashboard.api';

export default function DashboardRecentList() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const res = await fetchDashboardRecentData();
      setData(res);
    })();
  }, []);

  if (!data) return <div>로딩...</div>;

  return (
    <section className="rounded-md bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">최근 활동</h2>

      <ul className="divide-y divide-gray-200">
        <li className="flex items-center justify-between py-4">
          <div>
            <p className="font-medium">새로운 주문</p>
            <p className="text-sm text-gray-500">주문번호 #12345</p>
          </div>
          <span className="text-sm text-gray-400">5분 전</span>
        </li>

        <li className="flex items-center justify-between py-4">
          <div>
            <p className="font-medium">상품 재고 부족</p>
            <p className="text-sm text-gray-500">유기농 샐러드 믹스</p>
          </div>
          <span className="text-sm text-gray-400">1시간 전</span>
        </li>

        <li className="py-10 text-center text-sm text-gray-400">추가 활동 내역이 없습니다</li>
      </ul>
    </section>
  );
}
