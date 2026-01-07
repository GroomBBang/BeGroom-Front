import { useEffect, useState } from 'react';
import checkoutAPI from '../apis/checkout.api';
import { useCheckoutStore } from '../stores/useCheckoutStore';
import { orderInfoResponseDTO } from '../types/response';
import CheckoutPaymentMethod from './CheckoutPaymentMethod';
import CheckoutPriceSummary from './CheckoutPriceSummary';
import CheckoutShippingInfo from './CheckoutShippingInfo';

export default function CheckoutContainer() {
  const [orderInfo, setOrderInfo] = useState<orderInfoResponseDTO | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'POINT' | 'PG'>('POINT');
  const { fetchOrderInfo, payAndCheckout } = checkoutAPI();
  const orderId = useCheckoutStore((s) => s.orderId);
  const clearOrderId = useCheckoutStore((s) => s.clearOrderId);

  useEffect(() => {
    if (!orderId) return;
    fetchOrderInfo(orderId).then((res) => setOrderInfo(res));
  }, [orderId]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <CheckoutShippingInfo
          memberName={orderInfo?.memberName || ''}
          phoneNumber={orderInfo?.phoneNumber || ''}
        />
        <CheckoutPaymentMethod
          balance={orderInfo?.balance || 0}
          paymentMethod={paymentMethod}
          onPaymentMethodChange={setPaymentMethod}
        />
      </div>
      <CheckoutPriceSummary
        orderAmount={orderInfo?.orderAmount || 0}
        paymentMethod={paymentMethod}
        balance={orderInfo?.balance || 0}
        payAndCheckout={payAndCheckout}
        orderId={orderId}
        clearOrderId={clearOrderId}
      />
    </div>
  );
}
