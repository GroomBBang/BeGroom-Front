import { Skeleton } from '@/shared/components/common/skeleton';
import { useEffect, useState } from 'react';
import myAPI from '../apis/my.api';
import { MyOrdersResponseDTO } from '../types/response';
import MyOrderHistory from './MyOrderHistory';

export default function OrdersContent() {
  const { fetchMyOrders } = myAPI();
  const [data, setData] = useState<MyOrdersResponseDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMyOrders().then((response) => {
      setData(response.result);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {isLoading ? (
        <div className="flex flex-col gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-[280px]" />
          ))}
        </div>
      ) : data?.orders.length === 0 ? (
        <div className="p-5">
          <div className="flex h-[200px] flex-col items-center justify-center gap-4">
            <p className="text-lg text-gray-500">주문 내역이 없습니다.</p>
          </div>
        </div>
      ) : (
        <MyOrderHistory orders={data?.orders || []} />
      )}
    </div>
  );
}
