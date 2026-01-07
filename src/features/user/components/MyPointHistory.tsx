import { TransactionDto } from '../types/response';

interface Props {
  transactions: TransactionDto[];
}

export default function MyPointHistory({ transactions }: Props) {
  return (
    <div className="divide-y divide-gray-100">
      {transactions.map((tx) => {
        const isPositive = tx.amount > 0;

        return (
          <div
            key={tx.id}
            className="flex flex-col justify-between gap-4 p-5 md:flex-row md:items-center"
          >
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-400">{tx.created_at}</span>
              <span className="font-medium text-gray-900">{tx.description}</span>
              <span className="text-xs text-gray-500">
                {tx.tx_type === 'CHARGE' ? '충전' : tx.tx_type === 'PAYMENT' ? '사용' : '환불'}
              </span>
            </div>

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
  );
}
