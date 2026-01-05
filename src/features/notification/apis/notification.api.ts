import http from '@/shared/apis/http';
import { NotificationResponseDto } from '../types/response';

export default function notificationAPI() {
  const fetchNotification = async (): Promise<NotificationResponseDto> => {
    const response = await http.get<NotificationResponseDto>('/noti');
    return response.result;
  };

  return {
    fetchNotification,
  };
}
