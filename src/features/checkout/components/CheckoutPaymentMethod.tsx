import { formatWon } from '@/shared/lib/format';

export default function CheckoutPaymentMethod({
  balance,
  paymentMethod,
  onPaymentMethodChange,
}: {
  balance: number;
  paymentMethod: 'POINT' | 'PG';
  onPaymentMethodChange: (method: 'POINT' | 'PG') => void;
}) {
  return (
    <section className="rounded-md border border-border bg-background p-6 flex flex-col gap-3">
      <h2 className="text-t6 font-bold text-foreground">결제 수단</h2>

      <label className="flex items-center gap-3 rounded-sm border border-border bg-background p-4 cursor-pointer">
        <input
          type="radio"
          checked={paymentMethod === 'POINT'}
          onChange={() => onPaymentMethodChange('POINT')}
          className="h-4 w-4"
        />
        <div className="flex w-full items-center justify-between">
          <span className="text-sm font-semibold text-foreground">구름 페이</span>
          <span className="text-xs text-muted-foreground text-gray-500">
            잔액: {formatWon(balance)}
          </span>
        </div>
      </label>

      <label className="flex items-center gap-3 rounded-sm border border-border bg-background p-4 cursor-pointer">
        <input
          type="radio"
          checked={paymentMethod === 'PG'}
          onChange={() => onPaymentMethodChange('PG')}
          className="h-4 w-4"
        />
        <span className="text-sm font-semibold text-foreground">일반 결제</span>
      </label>
    </section>
  );
}
