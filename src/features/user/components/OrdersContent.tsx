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
      setData(response);
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
      ) : (
        <MyOrderHistory orders={data?.orders || []} />
      )}
    </div>
  );
}
