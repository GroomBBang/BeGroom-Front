import axiosInstance from '@/shared/apis';
import { NotificationResponseDto } from '../types/response';

export default function notificationAPI() {
  const fetchNotification = async (): Promise<NotificationResponseDto> => {
    const response = await axiosInstance.get('/noti');
    return response.data;
  };

  return {
    fetchNotification,
  };
}
