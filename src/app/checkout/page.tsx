// src/app/checkout/page.tsx
'use client';

import { useCart } from '@/features/cart/hooks/useCart';
import { formatWon } from '@/shared/lib/format';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

/* ======================
   Types
====================== */

type DeliveryMemoKey = 'door' | 'security' | 'call' | 'custom';

type Coupon = {
  id: string;
  label: string;
  discountAmount?: number; // 정액
  discountRate?: number; // 정률(0~100)
};

type CheckoutFormState = {
  receiver: string;
  phone: string;
  addressSearch: string;
  addressDetail: string;
  memo: DeliveryMemoKey;
  couponId?: string;
  paymentMethod: 'tosspay';
};

/* ======================
   Mock Data
====================== */

const DELIVERY_MEMOS = [
  { key: 'door', label: '문 앞에 놓아주세요' },
  { key: 'security', label: '경비실에 맡겨주세요' },
  { key: 'call', label: '도착 전 연락주세요' },
  { key: 'custom', label: '직접 입력(추후)' },
] as const;

const COUPONS: Coupon[] = [
  { id: 'c1', label: '쿠폰 없음' },
  { id: 'c2', label: '5,000원 할인 쿠폰', discountAmount: 5000 },
  { id: 'c3', label: '10% 할인 쿠폰', discountRate: 10 },
];

/* ======================
   Utils
====================== */

function clampDiscount(discount: number, base: number) {
  return Math.max(0, Math.min(discount, base));
}

/* ======================
   Page
====================== */

export default function CheckoutPage() {
  const router = useRouter();
  const { totals, removeSelected } = useCart();

  /* ----------------------
     Form State
  ---------------------- */
  const [form, setForm] = useState<CheckoutFormState>({
    receiver: '김고객',
    phone: '010-1234-5678',
    addressSearch: '',
    addressDetail: '',
    memo: 'door',
    couponId: COUPONS[0]?.id,
    paymentMethod: 'tosspay',
  });

  const update = <K extends keyof CheckoutFormState>(key: K, value: CheckoutFormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  /* ----------------------
     Coupon / Price 계산
  ---------------------- */
  const selectedCoupon = useMemo(
    () => COUPONS.find((c) => c.id === form.couponId),
    [form.couponId],
  );

  const discount = useMemo(() => {
    if (!selectedCoupon) return 0;
    if (selectedCoupon.discountAmount)
      return clampDiscount(selectedCoupon.discountAmount, totals.subtotal);
    if (selectedCoupon.discountRate) {
      return clampDiscount(
        Math.floor((totals.subtotal * selectedCoupon.discountRate) / 100),
        totals.subtotal,
      );
    }
    return 0;
  }, [selectedCoupon, totals.subtotal]);

  const payable = useMemo(() => {
    const nextSubtotal = Math.max(0, totals.subtotal - discount);
    return nextSubtotal + totals.shipping;
  }, [totals.subtotal, totals.shipping, discount]);

  const canPay = useMemo(() => {
    return form.receiver.trim().length > 0 && form.phone.trim().length > 0;
  }, [form.receiver, form.phone]);

  const disabled = totals.subtotal === 0 || !canPay;

  /* ----------------------
     결제(임시): 성공 처리
  ---------------------- */
  const onPay = () => {
    if (disabled) return;
    removeSelected(); // 임시: 선택된 상품 결제 후 장바구니에서 제거
    router.push('/checkout/success'); // ✅ 이 경로로 이동하려면 success 페이지도 만들어야 함
  };

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-foreground">주문/결제</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
        {/* ======================
            LEFT: 입력 영역
        ====================== */}
        <div className="space-y-6">
          {/* ----------------------
              배송 정보
          ---------------------- */}
          <section className="rounded-md border border-border bg-background p-6">
            <h2 className="mb-5 text-t6 font-bold text-foreground">배송 정보</h2>

            <div className="space-y-4">
              <Field label="받는 사람">
                <input
                  value={form.receiver}
                  onChange={(e) => update('receiver', e.target.value)}
                  className="h-11 w-full rounded-sm border border-border bg-background px-4 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary-200"
                  placeholder="이름을 입력하세요"
                />
              </Field>

              <Field label="휴대폰 번호">
                <input
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  className="h-11 w-full rounded-sm border border-border bg-background px-4 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary-200"
                  placeholder="010-0000-0000"
                />
              </Field>

              <Field label="주소">
                <div className="flex gap-3">
                  <input
                    value={form.addressSearch}
                    onChange={(e) => update('addressSearch', e.target.value)}
                    className="h-11 flex-1 rounded-sm border border-border bg-background px-4 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary-200"
                    placeholder="주소 검색"
                  />
                  <button
                    type="button"
                    className="h-11 rounded-sm border border-border bg-background px-4 text-sm font-semibold text-foreground hover:bg-muted cursor-pointer"
                  >
                    검색
                  </button>
                </div>

                <input
                  value={form.addressDetail}
                  onChange={(e) => update('addressDetail', e.target.value)}
                  className="mt-3 h-11 w-full rounded-sm border border-border bg-background px-4 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary-200"
                  placeholder="상세 주소"
                />
              </Field>

              <Field label="배송 메모">
                <select
                  value={form.memo}
                  onChange={(e) => update('memo', e.target.value as DeliveryMemoKey)}
                  className="h-11 w-full rounded-sm border border-border bg-background px-4 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary-200"
                >
                  {DELIVERY_MEMOS.map((m) => (
                    <option key={m.key} value={m.key}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </section>

          {/* ----------------------
              결제 수단
          ---------------------- */}
          <section className="flex flex-col gap-4 rounded-md border border-border bg-background p-6">
            <h2 className="text-t6 font-bold text-foreground">결제 수단</h2>

            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3 rounded-sm border border-border bg-background p-4">
                <input
                  type="radio"
                  checked={form.paymentMethod === 'tosspay'}
                  onChange={() => update('paymentMethod', 'tosspay')}
                  className="h-4 w-4"
                />
                <span className="text-sm font-semibold text-foreground">토스페이</span>
              </label>

              <label className="flex items-center gap-3 rounded-sm border border-border bg-background p-4">
                <input
                  type="radio"
                  checked={form.paymentMethod === 'tosspay'}
                  onChange={() => update('paymentMethod', 'tosspay')}
                  className="h-4 w-4"
                />
                <span className="text-sm font-semibold text-foreground">결재</span>
              </label>
            </div>
          </section>
        </div>

        {/* ======================
            RIGHT: 결제 요약 영역
        ====================== */}
        <aside className="h-fit rounded-md border border-border bg-background p-6">
          <h2 className="mb-5 text-t6 font-bold text-foreground">결제 금액</h2>

          <div className="space-y-3 text-sm">
            <Row label="상품 금액" value={formatWon(totals.subtotal)} />
            <Row label="배송비" value={formatWon(totals.shipping)} />
            {discount > 0 && <Row label="쿠폰 할인" value={`- ${formatWon(discount)}`} />}
          </div>

          <div className="my-5 h-px bg-border" />

          <div className="flex items-end justify-between">
            <div className="text-sm font-bold text-foreground">최종 결제 금액</div>
            <div className="text-2xl font-extrabold text-foreground">{formatWon(payable)}</div>
          </div>

          <button
            type="button"
            onClick={onPay}
            disabled={disabled}
            className={[
              'mt-5 h-12 w-full rounded-sm text-sm font-bold text-white transition-colors cursor-pointer',
              disabled
                ? 'bg-primary-300 cursor-not-allowed'
                : 'bg-primary-700 hover:bg-primary-800',
            ].join(' ')}
          >
            결제하기
          </button>

          <p className="mt-3 text-center text-[11px] leading-relaxed text-muted-foreground">
            주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.
          </p>
        </aside>
      </div>
    </div>
  );
}

/* ======================
   Small UI helpers
====================== */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 text-t3 font-medium text-muted-foreground">{label}</div>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-muted-foreground">{label}</div>
      <div className="font-semibold text-foreground">{value}</div>
    </div>
  );
}
