export const DASHBOARD_DATA = {
  result: {
    summary: {
      totalPaymentAmount: 2300000,
      totalRefundAmount: 66000,
      totalFeeAmount: 223400,
      totalSettlementAmount: 2010600,
    },
    settlementByItemList: [
      {
        id: 1,
        paidAt: '2025-01-01T14:30:00',
        paymentAmount: 128000,
        refundAmount: 9000,
        feeAmount: 12800,
        settlementAmount: 107100,
        settlementStatus: 'SETTLED',
      },
    ],
  },
  statusCode: 200,
  message: '요청이 성공적으로 처리되었습니다.',
};

export const DASHBOARD_PRODUCT_DATA = {
  result: [
    {
      id: 1,
      paidAt: '2025-01-01T14:30:00',
      paymentAmount: 128000,
      refundAmount: 9000,
      feeAmount: 12800,
      settlementAmount: 107100,
      settlementStatus: 'SETTLED',
    },
  ],
  statusCode: 200,
  message: '요청이 성공적으로 처리되었습니다.',
};

export const DASHBOARD_PERIOD_DATA = {
  result: [
    {
      period: '2025-12-01',
      orderCnt: 10,
      totalSalesAmount: 500000,
      totalFeeAmount: 50000,
      settlementAmount: 450000,
      status: 'SETTLED',
    },
  ],
  statusCode: 200,
  message: '요청이 성공적으로 처리되었습니다.',
};
