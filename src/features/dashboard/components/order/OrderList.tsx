'use client';

import Pagination from '@/features/search/components/Pagination';
import { formatKRW } from '@/shared/lib/format';
import { CreditCard, Package } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchOrderListData } from '../../apis/order.api';
import { getOrderStatusPill } from '../../lib/statusPill';
import { OrderItemType } from '../../types/model';

export const OrderList = () => {
  const [data, setData] = useState<OrderItemType[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    (async () => {
      const res = await fetchOrderListData({ page });
      setData(res.content);
      setTotalPages(res.totalPages);
    })();
  }, [page]);

  if (data.length === 0) {
    return (
      <div className="flex min-h-[220px] items-center justify-center text-sm text-gray-500">
        주문 내역이 없습니다
      </div>
    );
  }

  return (
    <>
      <ul className="divide-y">
        {data.map((r) => {
          const { label, cls } = getOrderStatusPill(r.settlementStatus, r.paymentStatus);

          return (
            <li key={r.id} className="px-6 py-4">
              {/* 데스크탑 */}
              <div className="hidden grid-cols-10 items-center gap-3 md:grid">
                <div className="col-span-1 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Package size={18} className="text-gray-400" />
                    <p className="text-sm font-semibold">{r.id}</p>
                  </div>
                </div>

                <div className="col-span-3 text-center text-sm text-gray-700">
                  {r.createdAt.replace('T', ' ').split('.')[0]}
                </div>

                <div className="col-span-2 text-center text-sm font-semibold">
                  {formatKRW(r.price)}
                </div>

                <div className="col-span-2 text-center">
                  <div className="inline-flex items-center gap-2 text-sm">
                    <CreditCard size={16} className="text-gray-400" />
                    {r.paymentMethod}
                  </div>
                </div>

                <div className="col-span-2 text-center">
                  <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${cls}`}>
                    {label}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <Pagination
        page={page + 1}
        totalPages={totalPages}
        onChange={(p) => setPage(p - 1)}
        className="mt-6"
      />
    </>
  );
};
