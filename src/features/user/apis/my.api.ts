import axiosInstance from '@/shared/apis';
import { MyProfileResponseDTO } from '../types/response';

export default function myAPI() {
  const fetchMyProfile = async (): Promise<MyProfileResponseDTO> => {
    const response = await axiosInstance.get('/my');
    return response.data;
  };

  return {
    fetchMyProfile,
  };
}
