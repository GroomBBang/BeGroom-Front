export type SettlementStatus = 'SETTLED' | 'PENDING' | 'FAILED';

export interface DashboardSummaryDTO {
  totalPaymentAmount: number;
  totalRefundAmount: number;
  totalFeeAmount: number;
  totalSettlementAmount: number;
}

export interface DashboardSettlementProductDTO {
  id: number;
  paidAt: string;
  paymentAmount: number;
  refundAmount: number;
  feeAmount: number;
  settlementAmount: number;
  settlementStatus: SettlementStatus;
}

export interface DashboardResultDTO {
  summary: DashboardSummaryDTO;
  settlementByItemList: DashboardSettlementProductDTO[];
}

export type FetchSettlementDataDTO = DashboardResultDTO;

export type FetchSettlementProductDataDTO = DashboardSettlementProductDTO[];

export type DashboardPeriodType = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';

export interface DashboardPeriodItemDTO {
  period: string;
  orderCnt: number;
  totalSalesAmount: number;
  totalFeeAmount: number;
  settlementAmount: number;
  status: SettlementStatus;
}

export type FetchSettlementPeriodDataDTO = DashboardPeriodItemDTO[];
