export const getOrderStatusPill = (settlementStatus: string, paymentStatus: string) => {
  if (paymentStatus === 'REFUND') {
    return { label: '환불요청', cls: 'bg-red-50 text-red-700' };
  }

  if (settlementStatus === 'SETTELED') {
    return { label: '정산완료', cls: 'bg-emerald-50 text-emerald-700' };
  }

  return { label: '정산대기', cls: 'bg-indigo-50 text-indigo-700' };
};
