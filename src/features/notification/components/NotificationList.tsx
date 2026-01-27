import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import notificationAPI from '@/features/notification/apis/notification.api';
import { NotificationItem } from '../types/model';
import NotificationListItem from './NotificationListItem';

interface Props {
  notifications: NotificationItem[];
  reload: () => void;
}

export default function NotificationList({ notifications, reload }: Props) {
  const { readNotification } = notificationAPI();
  const { decreaseNotisCount } = useAuthStore();

  const handleNoticeClick = (noticeId: number) => {
    readNotification(noticeId).then(() => {
      decreaseNotisCount(1);
      reload();
    });
  };

  return (
    <div className="w-full h-full overflow-y-auto p-4 flex-col gap-4 flex">
      {(notifications || []).map((item, index) => (
        <NotificationListItem
          key={item.id || index}
          item={item}
          index={index}
          handleNoticeClick={handleNoticeClick}
        />
      ))}
    </div>
  );
}
