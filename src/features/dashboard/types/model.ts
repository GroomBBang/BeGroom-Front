export interface SettlementSummaryType {
  totalPaymentAmount: number;
  totalRefundAmount: number;
  totalFeeAmount: number;
  totalSettlementAmount: number;
}

export interface SettlementProductType {
  id: number;
  date: string;
  paymentAmount: number;
  refundAmount: number;
  feeAmount: number;
  settlementAmount: number;
  settlementStatus: 'SETTLED' | 'UNSETTLED';
}

export type SettlementPeriodType = {
  year?: number;
  month?: number;
  startDate?: string;
  endDate?: string;
  period?: string;
  totalSalesAmount: number;
  totalFeeAmount: number;
  settlementAmount: number;
};

export type OrderItemType = {
  id: number;
  createdAt: string;
  price: number;
  paymentMethod: 'POINT' | 'PG';
  settlementStatus: 'SETTLED' | 'UNSETTLED';
  paymentStatus: 'REFUND' | 'PAYMENT';
};

export type SettlementDateProps = {
  dayType: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
  period: string;
  startDate: string;
  endDate: string;
  year: number;
  month: number;
};
