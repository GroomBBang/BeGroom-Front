import {
  OrderItemType,
  SettlementPeriodType,
  SettlementProductType,
  SettlementSummaryType,
} from './model';

// settlement
export type SettlementResponseDTO = SettlementSummaryType;

export type SettlementProductRequestDTO = {
  startDate: string;
  endDate: string;
  page: number;
};

export type SettlementProductResponseDTO = {
  totalPages: number;
  content: SettlementProductType[];
};

export type SettlementPeriodResponseDTO = {
  totalPages: number;
  content: SettlementPeriodType[];
};

// Dashboard
export type FetchDashboardDataDTO = {
  orderCnt: number;
  productCnt: number;
  salesAmount: number;
};

export type FetchDashboardRecentDataDTO = {
  recentOrder: {
    orderId: number;
    amount: number;
    orderedAt: string;
  };
  recentRefund: {
    paymentId: number;
    refundAmount: number;
    refundAt: string;
  };
  recentSettlement: {
    settlementId: number;
    settlementAmount: number;
    settleAt: string;
  };
};

//order
export type FetchOrderInfoDataDTO = {
  refundCnt: number;
  unsettledCnt: number;
};

export type FetchOrderListDataDTO = {
  totalPages: number;
  content: OrderItemType[];
};
