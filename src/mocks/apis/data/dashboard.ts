import { DashboardPeriodType, SettlementStatus } from '@/features/dashboard/types/response';

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

export const DASHBOARD_PERIOD_DATA: Record<
  DashboardPeriodType,
  {
    result: Array<{
      period: string;
      orderCnt: number;
      totalSalesAmount: number;
      totalFeeAmount: number;
      settlementAmount: number;
      status: SettlementStatus;
    }>;
    statusCode: number;
    message: string;
  }
> = {
  DAILY: {
    result: [
      {
        period: '2025-12-28',
        orderCnt: 6,
        totalSalesAmount: 128000,
        totalFeeAmount: 11900,
        settlementAmount: 107100,
        status: 'PENDING',
      },
      {
        period: '2025-12-24',
        orderCnt: 2,
        totalSalesAmount: 54000,
        totalFeeAmount: 5400,
        settlementAmount: 48600,
        status: 'PENDING',
      },
    ],
    statusCode: 200,
    message: '요청이 성공적으로 처리되었습니다.',
  },

  WEEKLY: {
    result: [
      {
        period: '2025-W52',
        orderCnt: 18,
        totalSalesAmount: 310000,
        totalFeeAmount: 29800,
        settlementAmount: 268200,
        status: 'SETTLED',
      },
      {
        period: '2025-W51',
        orderCnt: 9,
        totalSalesAmount: 175000,
        totalFeeAmount: 17500,
        settlementAmount: 157500,
        status: 'SETTLED',
      },
    ],
    statusCode: 200,
    message: '요청이 성공적으로 처리되었습니다.',
  },

  MONTHLY: {
    result: [
      {
        period: '2025-12',
        orderCnt: 62,
        totalSalesAmount: 1320000,
        totalFeeAmount: 126600,
        settlementAmount: 1139400,
        status: 'PENDING',
      },
      {
        period: '2025-11',
        orderCnt: 48,
        totalSalesAmount: 980000,
        totalFeeAmount: 96800,
        settlementAmount: 871200,
        status: 'SETTLED',
      },
    ],
    statusCode: 200,
    message: '요청이 성공적으로 처리되었습니다.',
  },

  YEARLY: {
    result: [
      {
        period: '2025',
        orderCnt: 520,
        totalSalesAmount: 11500000,
        totalFeeAmount: 1129000,
        settlementAmount: 10161000,
        status: 'PENDING',
      },
    ],
    statusCode: 200,
    message: '요청이 성공적으로 처리되었습니다.',
  },
};
