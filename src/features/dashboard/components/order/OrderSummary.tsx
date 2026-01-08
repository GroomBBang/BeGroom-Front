import { Clock3, Undo2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchOrderInfoData } from '../../apis/order.api';

export const OrderSummary = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const res = await fetchOrderInfoData();
      setData(res);
    })();
  }, []);

  if (!data) return <div>로딩...</div>;

  return (
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
        <p className="mt-1 text-2xl font-bold text-gray-900">{data.refundCnt}건</p>
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
        <p className="mt-1 text-2xl font-bold text-gray-900">{data.unsettledCnt}건</p>
        <p className="mt-2 text-xs text-gray-500">정산 완료 전 주문</p>
      </div>
    </section>
  );
};
