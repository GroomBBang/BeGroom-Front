import axiosInstance from '@/shared/apis';
import {
  MyOrdersResponseDTO,
  MyPointsResponseDTO,
  MyProfileResponseDTO,
  MyWishResponseDTO,
} from '../types/response';

export default function myAPI() {
  const fetchMyProfile = async (): Promise<MyProfileResponseDTO> => {
    const response = await axiosInstance.get('/my/profile');
    return response.data;
  };

  const fetchMyPoints = async (): Promise<MyPointsResponseDTO> => {
    const response = await axiosInstance.get('/my/points');
    return response.data;
  };

  const fetchMyOrders = async (): Promise<MyOrdersResponseDTO> => {
    const response = await axiosInstance.get('/my/orders');
    return response.data;
  };

  const fetchMyWish = async (): Promise<MyWishResponseDTO> => {
    const response = await axiosInstance.get('/my/wish');
    return response.data;
  };

  const fetchMyPoints = async (): Promise<MyPointsResponseDTO> => {
    const response = await axiosInstance.get('/my/points');
    return response.data;
  };

  const fetchMyOrders = async (): Promise<MyOrdersResponseDTO> => {
    const response = await axiosInstance.get('/my/orders');
    return response.data;
  };

  const fetchMyWish = async (): Promise<MyWishResponseDTO> => {
    const response = await axiosInstance.get('/my/wish');
    return response.data;
  };

  return {
    fetchMyProfile,
    fetchMyPoints,
    fetchMyOrders,
    fetchMyWish,
  };
}
