export type NotificationType = 'order' | 'coupon' | 'event' | 'system';

export interface NotificationItem {
  id: number;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  read: boolean;
}
