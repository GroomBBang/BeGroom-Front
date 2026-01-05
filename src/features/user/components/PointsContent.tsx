'use client';

import Spinner from '@/shared/components/common/Spinner';
import { AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import myAPI from '../apis/my.api';
import { MyPointsResponseDTO } from '../types/response';
import MyCurrentPoint from './MyCurrentPoint';
import MyPointHistory from './MyPointHistory';

export default function PointsContent() {
  const { fetchMyPoints } = myAPI();
  const [data, setData] = useState<MyPointsResponseDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isChargeModalOpen, setIsChargeModalOpen] = useState(false);

  useEffect(() => {
    fetchMyPoints().then((response) => {
      setData(response.result);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      if (event.data === 'CASH_CHARGE_SUCCESS') {
        fetchMyPoints().then((response) => {
          setData(response.result);
        });
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [fetchMyPoints]);

  return (
    <div className="flex flex-col gap-6">
      <MyCurrentPoint balance={data?.wallet.balance || 0} />

      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 p-5">
          <h3 className="font-bold text-gray-900">충전/사용 내역</h3>
        </div>

        {isLoading ? (
          <div className="flex h-[200px] flex-col items-center justify-center gap-4">
            <Spinner size="lg" />
            <p className="text-sm text-gray-500">거래 이력을 불러오는 중입니다...</p>
          </div>
        ) : data?.transactions?.length !== undefined && data?.transactions.length > 0 ? (
          <MyPointHistory transactions={data.transactions} />
        ) : (
          <div className="flex h-[200px] flex-col items-center justify-center text-gray-400">
            <AlertCircle size={40} className="mb-2 text-gray-300" strokeWidth={1.5} />
            <p className="text-sm">캐시 내역이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
