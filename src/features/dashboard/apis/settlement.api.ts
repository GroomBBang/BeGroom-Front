import http from '@/shared/apis/http';
import {
  SettlementPeriodResponseDTO,
  SettlementProductRequestDTO,
  SettlementProductResponseDTO,
  SettlementResponseDTO,
} from '../types/response';

export default function settlementAPI() {
  const fetchSettlementData = async () => {
    const response = await http.get<SettlementResponseDTO>('/settlement');
    return response.result;
  };

  const fetchSettlementProductData = async ({
    params,
  }: {
    params: SettlementProductRequestDTO;
  }) => {
    const response = await http.get<SettlementProductResponseDTO>('/settlement/product', {
      params,
    });
    return response.result;
  };

  const fetchSettlementDailyData = async ({ page }: { page: number }) => {
    const response = await http.get<SettlementPeriodResponseDTO>('/settlement/period/daily', {
      params: { page },
    });

    return response.result;
  };

  const fetchSettlementMonthlyData = async ({ page }: { page: number }) => {
    const response = await http.get<SettlementPeriodResponseDTO>('/settlement/period/monthly', {
      params: { page },
    });

    return response.result;
  };

  const fetchSettlementYearlyData = async ({ page }: { page: number }) => {
    const response = await http.get<SettlementPeriodResponseDTO>('/settlement/period/yearly', {
      params: { page },
    });

    return response.result;
  };

  const fetchSettlementWeeklyData = async ({ page }: { page: number }) => {
    const response = await http.get<SettlementPeriodResponseDTO>('/settlement/period/weekly', {
      params: { page },
    });

    return response.result;
  };

  const downloadSettlementInCSV = async () => {
    const response = await http.get('/settlement/csv', {
      responseType: 'blob',
    });
    return response;
  };

  return {
    fetchSettlementData,
    fetchSettlementProductData,
    fetchSettlementDailyData,
    fetchSettlementMonthlyData,
    fetchSettlementYearlyData,
    fetchSettlementWeeklyData,
    downloadSettlementInCSV,
  };
}
