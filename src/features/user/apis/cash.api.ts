import http from '@/shared/apis/http';
import { ChargeCashtDTO, FetchWalletDTO } from '../types/response';

export default function cashAPI() {
  const fetchBalance = async () => {
    const response = await http.get<FetchWalletDTO>('/wallet/balance');
    return response;
  };

  const chargeCash = async (amount: number) => {
    const response = await http.post<ChargeCashtDTO>('/point-charges', {
      amount,
    });
    return response;
  };

  return {
    fetchBalance,
    chargeCash,
  };
}
