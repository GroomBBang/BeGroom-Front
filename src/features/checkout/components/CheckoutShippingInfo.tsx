import { useEffect, useState } from 'react';
import { DELIVERY_MEMOS } from '../constants/deliveryMemo';
import { CheckoutFormState, DeliveryMemoKey } from '../types/model';

export default function CheckoutShippingInfo({
  memberName,
  phoneNumber,
}: {
  memberName: string;
  phoneNumber: string;
}) {
  const [form, setForm] = useState<CheckoutFormState>({
    receiver: memberName,
    phone: phoneNumber,
    addressSearch: '',
    addressDetail: '',
    memo: 'door',
  });

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      receiver: memberName ?? '',
      phone: phoneNumber ?? '',
    }));
  }, [memberName, phoneNumber]);

  const update = <K extends keyof CheckoutFormState>(key: K, value: CheckoutFormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };
  return (
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
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 text-t3 font-medium text-muted-foreground">{label}</div>
      {children}
    </div>
  );
}
