import { formatDateTime } from '@/shared/lib/date';
import { ORDER_STATUS_LABEL } from '../constants/order';
import { MyOrdersResponseDTO } from '../types/response';

interface MyOrderHistoryProps {
  orders: MyOrdersResponseDTO['orders'];
  onRefundModal: (orderId: number) => void;
}

export default function MyOrderHistory({ orders, onRefundModal }: MyOrderHistoryProps) {
  return (
    <div className="flex flex-col gap-4">
      {orders?.map((order) => (
        <div
          key={order.order_number}
          className="overflow-hidden rounded-xl border border-gray-200 bg-white"
        >
          <div className="flex items-start justify-between p-5">
            <div className="flex flex-col gap-1">
              <span className="font-medium text-gray-800">
                주문일자: {formatDateTime(order.created_at)}
              </span>
              <span className="text-sm text-gray-400">주문번호: {order.order_number}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                className={`flex items-center gap-1 rounded px-3 py-1.5 text-xs font-bold transition-colors ${
                  order.status === 'CANCELED'
                    ? 'bg-red-50 text-red-600'
                    : 'bg-primary-50 text-primary-600'
                }`}
              >
                {ORDER_STATUS_LABEL[order.status] ?? order.status}
              </button>
              {order.status === 'COMPLETED' && (
                <button
                  onClick={() => onRefundModal(order.order_number)}
                  className="flex items-center gap-1 rounded bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600 transition-colors hover:bg-red-100"
                >
                  환불 요청
                </button>
              )}
            </div>
          </div>
          <div className="mx-5 h-px bg-gray-100"></div>

          {order.items.map((item) => {
            return (
              <div key={item.productName} className="flex gap-4 p-5">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md border border-gray-100 bg-gray-100">
                  <img
                    src={item.imageUrl}
                    alt={item.productName}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="mb-1 text-base font-bold text-gray-900">{item.productName}</h3>
                  <p className="text-sm text-gray-500">
                    {item.price.toLocaleString()}원 × {item.quantity}개
                  </p>
                </div>
              </div>
            );
          })}

          <div className="mx-5 h-px bg-gray-100"></div>
          <div className="flex items-center justify-between bg-gray-50/50 p-5">
            <span className="text-sm font-medium text-gray-600">총 결제 금액</span>
            <span className="text-xl font-bold text-gray-900">
              {order.total_amount.toLocaleString()}원
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
