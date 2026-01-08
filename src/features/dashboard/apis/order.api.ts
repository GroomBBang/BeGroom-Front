import http from '@/shared/apis/http';
import { FetchOrderInfoDataDTO, FetchOrderListDataDTO } from '../types/response';

export const fetchOrderInfoData = async () => {
  const response = await http.get<FetchOrderInfoDataDTO>('/seller/dashboard/order/info');
  return response.result;
};

export const fetchOrderListData = async ({ page }: { page: number }) => {
  const response = await http.get<FetchOrderListDataDTO>('/seller/dashboard/order/list', {
    params: { page },
  });
  return { content: response.result.content, totalPages: response.result.totalPages };
};
