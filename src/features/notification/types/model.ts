export type NotificationType = 'ORDER' | 'AD' | 'NOTICE' | 'SYSTEM';

export interface NotificationItem {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}
