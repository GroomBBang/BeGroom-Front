'use client';

import { AlertCircle, Coins } from 'lucide-react';

// ERD 기반 Mock Data
const WALLET = {
  id: 1,
  balance: 5600, // 현재 잔액
};

const TRANSACTIONS = [
  {
    id: 103,
    tx_type: 'PAYMENT', // 사용
    amount: -3400,
    balance_after: 5600,
    reference_type: 'ORDER',
    reference_id: 2001,
    created_at: '2025. 12. 28.',
    description: '[주문] 프리미엄 과일 모음 구매 사용',
  },
  {
    id: 102,
    tx_type: 'CHARGE', // 적립
    amount: 5000,
    balance_after: 9000,
    reference_type: 'EVENT',
    reference_id: 101,
    created_at: '2025. 12. 24.',
    description: '[이벤트] 신규 가입 축하 적립금',
  },
  {
    id: 101,
    tx_type: 'CHARGE', // 적립
    amount: 4000,
    balance_after: 4000,
    reference_type: 'REFUND',
    reference_id: 99,
    created_at: '2025. 12. 20.',
    description: '[환불] 주문 취소 환불 적립',
  },
];

export default function PointsContent() {
  return (
    <div className="flex flex-col gap-6">
      {/* 1. 상단 현재 잔액 카드 */}
      <div className="flex flex-col items-center justify-center rounded-xl border border-primary-100 bg-purple-50 p-8">
        <div className="mb-2 flex items-center gap-2 text-primary-800">
          <Coins size={20} />
          <span className="font-bold">현재 보유 적립금</span>
        </div>
        <div className="text-4xl font-bold text-primary-600">
          {WALLET.balance.toLocaleString()}원
        </div>
        <p className="mt-4 text-xs text-gray-500">
          적립금은 유효기간 내에만 사용 가능하며,
          <br className="md:hidden" /> 만료된 적립금은 자동 소멸됩니다.
        </p>
      </div>

      {/* 2. 적립/사용 내역 리스트 */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 p-5">
          <h3 className="font-bold text-gray-900">적립/사용 내역</h3>
        </div>

        {TRANSACTIONS.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {TRANSACTIONS.map((tx) => {
              const isPositive = tx.amount > 0;

              return (
                <div
                  key={tx.id}
                  className="flex flex-col justify-between gap-4 p-5 md:flex-row md:items-center"
                >
                  {/* 왼쪽: 날짜 및 내용 */}
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-400">{tx.created_at}</span>
                    <span className="font-medium text-gray-900">{tx.description}</span>
                    <span className="text-xs text-gray-500">
                      {tx.tx_type === 'CHARGE'
                        ? '적립'
                        : tx.tx_type === 'PAYMENT'
                          ? '사용'
                          : '환불'}
                    </span>
                  </div>

                  {/* 오른쪽: 금액 및 잔액 */}
                  <div className="flex flex-col items-end gap-1">
                    <span
                      className={`text-lg font-bold ${isPositive ? 'text-primary-600' : 'text-gray-900'}`}
                    >
                      {isPositive ? '+' : ''}
                      {tx.amount.toLocaleString()}원
                    </span>
                    <span className="text-xs text-gray-400">
                      잔액 {tx.balance_after.toLocaleString()}원
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* 내역 없을 때 Empty State */
          <div className="flex h-[200px] flex-col items-center justify-center text-gray-400">
            <AlertCircle size={40} className="mb-2 text-gray-300" strokeWidth={1.5} />
            <p className="text-sm">적립금 내역이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
