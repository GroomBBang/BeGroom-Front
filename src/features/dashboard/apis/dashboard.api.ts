import http from '@/shared/apis/http';
import { FetchDashboardDataDTO, FetchDashboardRecentDataDTO } from '../types/response';

export const fetchDashboardData = async () => {
  const response = await http.get<FetchDashboardDataDTO>('/seller/dashboard');
  return response.result;
};

export const fetchDashboardRecentData = async () => {
  const response = await http.get<FetchDashboardRecentDataDTO>('/seller/dashboard/recent');
  return response.result;
};
