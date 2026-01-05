export type NotificationType = 'delivery' | 'coupon' | 'event' | 'system';



export interface NotificationItem {
  id: number;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
}
