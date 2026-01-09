'use client';

import { formatKRW } from '@/shared/lib/format';
import { Package, ShoppingBag, Wallet } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchDashboardData } from '../../apis/dashboard.api';

export default function DashboardSummary() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const res = await fetchDashboardData();
      setData(res);
    })();
  }, []);

  if (!data) return <div>로딩...</div>;

  return (
    <section className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
      {/* 총 주문 */}
      <div className="rounded-md bg-white p-6 shadow-sm">
        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
          <ShoppingBag size={20} />
        </div>
        <p className="text-2xl font-bold">{data.orderCnt}</p>
        <p className="mt-1 text-sm text-gray-500">총 주문</p>
      </div>

      {/* 총 상품 */}
      <div className="rounded-md bg-white p-6 shadow-sm">
        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
          <Package size={20} />
        </div>
        <p className="text-2xl font-bold">{data.productCnt}</p>
        <p className="mt-1 text-sm text-gray-500">총 상품</p>
      </div>

      {/* 총 매출 */}
      <div className="rounded-md bg-white p-6 shadow-sm cursor-pointer">
        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100 text-yellow-600">
          <Wallet size={20} />
        </div>
        <p className="text-2xl font-bold">{formatKRW(data.salesAmount)}</p>
        <p className="mt-1 text-sm text-gray-500">총 매출</p>
      </div>
    </section>
  );
}
