import http from '@/shared/apis/http';
import { sendServiceInspectionNotiRequestDto } from '../types/request';
import { NotificationResponseDto } from '../types/response';

export default function notificationAPI() {
  const fetchNotification = async () => {
    const response = await http.get<NotificationResponseDto>('/noti');
    return response;
  };

  const readNotification = async (noticeId: number) => {
    const response = await http.patch(`/noti/${noticeId}`);
    return response;
  };

  const readAllNotification = async () => {
    const response = await http.patch(`/noti/all`);
    return response;
  };

  const sendServiceInspectionNoti = async (data: sendServiceInspectionNotiRequestDto) => {
    const response = await http.post(`/noti/send/inspect`, data);
    return response;
  };

  return {
    fetchNotification,
    readNotification,
    readAllNotification,
    sendServiceInspectionNoti,
  };
}
