import { CommonApiDto } from '@/shared/types/response';
import { NotificationItem } from './model';

export interface NotificationResponseDto extends CommonApiDto {
  result: {
    notification: NotificationItem[];
  };
}
