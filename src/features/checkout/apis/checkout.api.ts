import http from '@/shared/apis/http';
import {
  checkoutRequestDTO,
  checkoutResponseDTO,
  createOrderRequestDTO,
  createOrderResponseDTO,
  orderInfoResponseDTO,
  paymentsRequestDTO,
  paymentsResponseDTO,
} from '../types/response';

export default function checkoutAPI() {
  const createOrder = async (data: createOrderRequestDTO) => {
    const response = await http.post<createOrderResponseDTO>('/orders', data);
    return response.result;
  };

  const fetchOrderInfo = async (orderId: number) => {
    const response = await http.get<orderInfoResponseDTO>(`/orders/${orderId}/info`);
    return response.result;
  };

  const requestPayment = async (data: paymentsRequestDTO) => {
    const response = await http.post<paymentsResponseDTO>('/payments', data);
    return response.result;
  };

  const checkoutPayment = async (paymentId: number, data: checkoutRequestDTO) => {
    const response = await http.post<checkoutResponseDTO>(`/payments/${paymentId}/checkout`, data);
    return response.result;
  };

  const payAndCheckout = async (
    paymentRequest: paymentsRequestDTO,
    checkoutRequest: checkoutRequestDTO,
  ) => {
    const paymentsRes = await requestPayment(paymentRequest);

    const paymentId = paymentsRes.paymentId;
    if (!paymentId) {
      throw new Error('결제 생성에 실패했습니다.');
    }

    return checkoutPayment(paymentId, checkoutRequest);
  };

  return {
    createOrder,
    fetchOrderInfo,
    payAndCheckout,
  };
}
