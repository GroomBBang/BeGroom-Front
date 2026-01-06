import http from '@/shared/apis/http';
import {
  MyOrdersResponseDTO,
  MyPointsResponseDTO,
  MyProfileResponseDTO,
  MyWishResponseDTO,
} from '../types/response';

export default function myAPI() {
  const fetchMyProfile = async () => {
    const response = await http.get<MyProfileResponseDTO>('/members/profile');
    return response;
  };

  const fetchMyPoints = async (page: number = 0, size: number = 10) => {
    const response = await http.get<MyPointsResponseDTO>(
      `/members/wallet?page=${page}&size=${size}`,
    );
    return response;
  };
  const fetchMyOrders = async () => {
    const response = await http.get<MyOrdersResponseDTO>('/members/orders');
    return response;
  };

  const fetchMyWish = async () => {
    const response = await http.get<MyWishResponseDTO>('/members/wish');
    return response;
  };

  return {
    fetchMyProfile,
    fetchMyPoints,
    fetchMyOrders,
    fetchMyWish,
  };
}
