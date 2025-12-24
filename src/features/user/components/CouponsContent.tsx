import { COUPONS } from '../mocks/my';

export default function CouponsContent() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {COUPONS.map((coupon) => (
        <div
          key={coupon.id}
          className="flex flex-col justify-between rounded-xl border border-primary-100 bg-white p-6 shadow-sm transition-all hover:border-primary-300 hover:shadow-md"
        >
          <div>
            <h3 className="mb-2 font-medium text-gray-900">{coupon.title}</h3>
            <div className="mb-6 text-3xl font-bold text-primary-600">{coupon.amount}</div>
          </div>
          <div className="flex flex-col gap-1 text-sm text-gray-400">
            <span>최소 주문금액: {coupon.minOrder}</span>
            <span>{coupon.expiry}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
