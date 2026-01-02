import axiosInstance from '@/shared/apis';
import { CommonSuccessDto } from '@/shared/types/response';
import {
  DashboardPeriodType,
  FetchSettlementDataDTO,
  FetchSettlementPeriodDataDTO,
  FetchSettlementProductDataDTO,
} from '../types/response';

export default function settlementAPI() {
  const fetchSettlementData = async (): Promise<CommonSuccessDto<FetchSettlementDataDTO>> => {
    const response = await axiosInstance.get('/settlement');
    return response.data;
  };

  const fetchSettlementProductData = async (): Promise<
    CommonSuccessDto<FetchSettlementProductDataDTO>
  > => {
    const response = await axiosInstance.get('/settlement/product');
    return response.data;
  };

  const fetchSettlementPeriodData = async (
    type: DashboardPeriodType,
  ): Promise<CommonSuccessDto<FetchSettlementPeriodDataDTO>> => {
    const response = await axiosInstance.get('/settlement/period', {
      params: { type },
    });
    return response.data;
  };

  return {
    fetchSettlementData,
    fetchSettlementProductData,
    fetchSettlementPeriodData,
  };
}
