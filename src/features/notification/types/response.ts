import { NotificationItem } from './model';

export interface NotificationResponseDto {
  unreadCount: number;
  notifications: NotificationItem[];
}
