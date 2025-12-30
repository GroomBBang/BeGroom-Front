import axiosInstance from '@/shared/apis';
import { NotificationItem } from '../types/model';

export default function notificationAPI() {
  const fetchNotification = async (): Promise<NotificationItem[]> => {
    const response = await axiosInstance.get('/noti');
    return response.data;
  };

  return {
    fetchNotification,
  };
}
