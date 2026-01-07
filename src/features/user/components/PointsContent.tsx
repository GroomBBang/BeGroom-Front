'use client';

import Spinner from '@/shared/components/common/Spinner';
import { AlertCircle } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import myAPI from '../apis/my.api';
import { TransactionDto } from '../types/response';
import MyCurrentPoint from './MyCurrentPoint';
import MyPointHistory from './MyPointHistory';

export default function PointsContent() {
  const { fetchMyPoints } = myAPI();
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<TransactionDto[]>([]);
  const [page, setPage] = useState(0);
  const [isLast, setIsLast] = useState(false);

  const loadTransactions = useCallback(async (pageNum: number) => {
    try {
      setIsLoading(true);
      const response = await fetchMyPoints(pageNum, 10);
      const { wallet, transactions: txPage } = response.result;

      setBalance(wallet.balance);
      setIsLast(txPage.last);

      if (pageNum === 0) {
        setTransactions(txPage.content);
      } else {
        setTransactions((prev) => [...prev, ...txPage.content]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTransactions(0);
  }, [loadTransactions]);

  const handleLoadMore = () => {
    if (!isLast) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadTransactions(nextPage);
    }
  };

  useEffect(() => {
    const channel = new BroadcastChannel('charge_channel');

    channel.onmessage = (event) => {
      if (event.data === 'CASH_CHARGE_SUCCESS') {
        console.log('CASH_CHARGE_SUCCESS');
        loadTransactions(0);
        toast.success('캐시 충전이 완료되었습니다.');
      }
    };

    return () => {
      channel.close();
    };
  }, [loadTransactions]);

  return (
    <div className="flex flex-col gap-6">
      <MyCurrentPoint balance={balance || 0} />

      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 p-5">
          <h3 className="font-bold text-gray-900">충전/사용 내역</h3>
        </div>

        {isLoading ? (
          <div className="flex h-[200px] flex-col items-center justify-center gap-4">
            <Spinner size="lg" />
            <p className="text-sm text-gray-500">거래 이력을 불러오는 중입니다...</p>
          </div>
        ) : transactions !== undefined && transactions.length > 0 ? (
          <>
            <MyPointHistory transactions={transactions} />
            {!isLast && !isLoading && (
              <button
                onClick={handleLoadMore}
                className="mt-6 w-full rounded-xl bg-gray-100 py-4 font-medium text-gray-600 hover:bg-gray-200"
              >
                더 보기
              </button>
            )}
          </>
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
