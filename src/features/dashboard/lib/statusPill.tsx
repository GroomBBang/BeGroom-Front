export const getOrderStatusPill = (settlementStatus: string, paymentStatus: string) => {
  if (settlementStatus === null) {
    settlementStatus = 'SETTLED';
  }

  if (paymentStatus === 'REFUNDED') {
    return { label: '환불완료', cls: 'bg-red-50 text-red-700' };
  }

  if (settlementStatus === 'SETTLED') {
    return { label: '정산완료', cls: 'bg-emerald-50 text-emerald-700' };
  }

  return { label: '정산대기', cls: 'bg-indigo-50 text-indigo-700' };
};
