import { ChevronRight } from 'lucide-react';
import { ORDERS } from '../mocks/my';

export default function OrdersContent() {
  return (
    <div className="flex flex-col gap-4">
      {ORDERS.map((order) => (
        <div key={order.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="flex items-start justify-between p-5">
            <div className="flex flex-col gap-1">
              <span className="font-medium text-gray-800">주문일자: {order.date}</span>
              <span className="text-sm text-gray-400">주문번호: {order.id}</span>
            </div>
            <button className="flex items-center gap-1 rounded bg-primary-50 px-3 py-1.5 text-xs font-bold text-primary-600 transition-colors hover:bg-primary-100">
              {order.status}
              <ChevronRight size={14} />
            </button>
          </div>
          <div className="mx-5 h-px bg-gray-100"></div>
          <div className="flex gap-4 p-5">
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md border border-gray-100 bg-gray-100">
              <img
                src={order.imageUrl}
                alt={order.productName}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="mb-1 text-base font-bold text-gray-900">{order.productName}</h3>
              <p className="text-sm text-gray-500">
                {order.price.toLocaleString()}원 × {order.quantity}개
              </p>
            </div>
          </div>
          <div className="mx-5 h-px bg-gray-100"></div>
          <div className="flex items-center justify-between bg-gray-50/50 p-5">
            <span className="text-sm font-medium text-gray-600">총 결제 금액</span>
            <span className="text-xl font-bold text-gray-900">
              {order.totalAmount.toLocaleString()}원
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
