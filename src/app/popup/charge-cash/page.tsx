'use client';

import cashAPI from '@/features/user/apis/cash.api';
import { CHARGE_OPTIONS } from '@/features/user/constants/cash';
import NumberFlow from '@number-flow/react';
import { useEffect, useState } from 'react';

export default function CashChargePopupContent() {
  const { fetchBalance, chargeCash } = cashAPI();
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);

  useEffect(() => {
    const fetchCashPopup = async () => {
      try {
        const response = await fetchBalance();
        setCurrentBalance(response.result.balance);
      } catch {}
    };

    fetchCashPopup();
  }, []);

  const handleAddAmount = (amount: number) => {
    setSelectedAmount((prev) => prev + amount);
  };

  const handleReset = () => {
    setSelectedAmount(0);
  };

  const handleChargeClick = async () => {
    if (selectedAmount <= 0) return;

    try {
      await chargeCash(selectedAmount);

      alert(`${selectedAmount.toLocaleString()}원 충전이 완료되었습니다.`);

      if (window.opener && !window.opener.closed) {
        window.opener.postMessage('CASH_CHARGE_SUCCESS', window.location.origin);
      }

      window.close();
    } catch (error) {
      alert('충전에 실패했습니다.');
    }

    setSelectedAmount(0);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-5 flex flex-col">
      <header className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">캐시 충전</h1>
      </header>

      <div className="bg-gray-50 rounded-lg p-4 mb-6 flex justify-between items-center border border-gray-200">
        <span className="text-gray-600 font-medium">보유 캐시</span>
        <div className="text-lg font-bold text-gray-900">
          <NumberFlow value={currentBalance} format={{ useGrouping: true }} />
          <span> 원</span>
        </div>
      </div>

      <main className="flex-grow">
        <p className="text-gray-600 mb-3 font-medium">충전 금액 선택</p>

        <div className="grid grid-cols-2 gap-2 mb-6">
          {CHARGE_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAddAmount(option.value)}
              className={`
                py-3 px-2 rounded-lg border font-medium transition-all
                ${'bg-white border-gray-200 text-gray-900 hover:bg-gray-50 hover:border-primary-500 hover:text-primary-700 active:bg-primary-50'}
              `}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-5">
          <div className="flex justify-between items-end mb-2">
            <span className="text-gray-900 font-bold text-lg">총 충전 금액</span>
            <div className="flex items-center gap-3">
              {selectedAmount > 0 && (
                <button
                  onClick={handleReset}
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  초기화
                </button>
              )}
              <span className="text-2xl font-bold text-primary-600">
                {selectedAmount.toLocaleString()}{' '}
                <span className="text-base text-gray-900 font-medium">원</span>
              </span>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-6 flex gap-3">
        <button
          onClick={() => window.close()}
          className="flex-1 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          취소
        </button>
        <button
          onClick={handleChargeClick}
          disabled={selectedAmount === 0}
          className={`
            flex-1 py-3 rounded-lg font-bold text-white transition-colors
            ${
              selectedAmount > 0
                ? 'bg-primary-500 hover:bg-primary-600 shadow-md'
                : 'bg-gray-300 text-gray-50 cursor-not-allowed'
            }
          `}
        >
          충전하기
        </button>
      </footer>
    </div>
  );
}
