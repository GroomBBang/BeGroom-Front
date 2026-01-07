import { useCart } from '@/features/cart/hooks/useCart';
import { formatWon } from '@/shared/lib/format';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function CheckoutPriceSummary({
  orderAmount,
  paymentMethod,
  balance,
  payAndCheckout,
  orderId,
  clearOrderId,
}: {
  orderAmount: number;
  paymentMethod: 'POINT' | 'PG';
  balance: number;
  orderId: number | null;
  clearOrderId: () => void;
  payAndCheckout: (
    data1: { paymentMethod: 'POINT' | 'PG'; orderId: number },
    data2: { paymentMethod: 'POINT' | 'PG' },
  ) => void;
}) {
  const { totals, removeSelected } = useCart();
  const router = useRouter();

  const isPoint = paymentMethod === 'POINT';
  // 포인트 결제 시: 전액 포인트로 결제한다고 가정
  const pointUsed = isPoint ? Math.min(balance, orderAmount) : 0;
  const pointLeft = isPoint ? balance - pointUsed : balance;

  const isPointInsufficient = isPoint && balance < orderAmount;
  const disabled = totals.subtotal === 0 || isPointInsufficient;

  const onPay = async () => {
    if (disabled) return;

    if (!orderId) {
      alert('주문 정보가 없습니다. 장바구니에서 다시 주문해주세요.');
      return;
    }

    try {
      await payAndCheckout({ paymentMethod, orderId }, { paymentMethod });

      removeSelected();
      clearOrderId?.();
      router.push('/checkout/success');
    } catch (e) {
      const message = e instanceof Error ? e.message : '결제에 실패했습니다.';
      toast.error(message);
    }
  };

  return (
    <aside className="h-fit rounded-md border border-border bg-background p-6">
      <h2 className="mb-5 text-t6 font-bold text-foreground">결제 금액</h2>

      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground">상품 금액</div>
          <div className="font-semibold text-foreground">{formatWon(orderAmount)}</div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-muted-foreground">배송비</div>
          <div className="font-semibold text-foreground">{formatWon(totals.shipping)}</div>
        </div>

        {/* 포인트 결제 선택 시 노출 */}
        {isPoint && (
          <>
            <div className="my-3 h-px bg-border" />

            <div className="flex items-center justify-between">
              <div className="text-muted-foreground">보유 포인트</div>
              <div className="font-semibold text-foreground">{formatWon(balance)}</div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-muted-foreground">사용 포인트</div>
              <div className="font-semibold text-foreground">- {formatWon(orderAmount)}</div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-muted-foreground">결제 후 잔액</div>
              <div
                className={[
                  'font-semibold',
                  isPointInsufficient ? 'text-red-600' : 'text-foreground',
                ].join(' ')}
              >
                {formatWon(pointLeft)}
              </div>
            </div>

            {isPointInsufficient && (
              <p className="mt-2 text-xs text-red-600">
                포인트가 부족해 결제할 수 없습니다. 결제 수단을 일반 결제로 변경해주세요.
              </p>
            )}
          </>
        )}
      </div>

      <div className="my-3 h-px bg-border" />

      <div className="flex items-end justify-between">
        <div className="text-sm font-bold text-foreground">최종 결제 금액</div>
        <div className="text-2xl font-extrabold text-foreground">{formatWon(orderAmount)}</div>
      </div>

      <button
        type="button"
        onClick={onPay}
        disabled={disabled}
        className={[
          'mt-5 h-12 w-full rounded-sm text-sm font-bold text-white transition-colors cursor-pointer',
          disabled ? 'bg-primary-300 cursor-not-allowed' : 'bg-primary-700 hover:bg-primary-800',
        ].join(' ')}
      >
        결제하기
      </button>

      <p className="mt-3 text-center text-[11px] leading-relaxed text-muted-foreground">
        주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.
      </p>
    </aside>
  );
}
