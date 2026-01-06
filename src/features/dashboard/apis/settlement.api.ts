import http from '@/shared/apis/http';
import {
  DashboardPeriodType,
  FetchSettlementDataDTO,
  FetchSettlementPeriodDataDTO,
  FetchSettlementProductDataDTO,
} from '../types/response';

export default function settlementAPI() {
  const fetchSettlementData = async () => {
    const response = await http.get<FetchSettlementDataDTO>('/settlement');
    return response;
  };

  const fetchSettlementProductData = async () => {
    const response = await http.get<FetchSettlementProductDataDTO>('/settlement/product');
    return response;
  };

  const fetchSettlementPeriodData = async (type: DashboardPeriodType) => {
    const response = await http.get<FetchSettlementPeriodDataDTO>('/settlement/period', {
      params: { type },
    });
    return response;
  };

  return {
    fetchSettlementData,
    fetchSettlementProductData,
    fetchSettlementPeriodData,
  };
}
