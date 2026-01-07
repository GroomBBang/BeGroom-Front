import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import notificationAPI from '@/features/notification/apis/notification.api';
import { Bell, Gift, Truck } from 'lucide-react';
import { NotificationItem, NotificationType } from '../types/model';

interface Props {
  notifications: NotificationItem[];
  reload: () => void;
}

export default function NotificationList({ notifications, reload }: Props) {
  const { readNotification } = notificationAPI();
  const { decreaseNotisCount } = useAuthStore();

  const renderIcon = (type: NotificationType) => {
    switch (type) {
      case 'ORDER':
        return (
          <div className="rounded-full bg-info/10 p-3 text-info">
            <Truck size={24} />
          </div>
        );
      case 'AD':
        return (
          <div className="rounded-full bg-primary-100 p-3 text-primary-600">
            <Gift size={24} />
          </div>
        );
      case 'NOTICE':
        return (
          <div className="rounded-full bg-success/10 p-3 text-success">
            <Bell size={24} />
          </div>
        );
      default:
        return <div className="rounded-full bg-gray-100 p-3 text-gray-600"></div>;
    }
  };

  const handleNoticeClick = (noticeId: number) => {
    readNotification(noticeId).then(() => {
      decreaseNotisCount();
      reload();
    });
  };

  return (
    <div className="w-full h-full overflow-y-auto p-4 flex-col gap-4 flex">
      {notifications?.length === 0 && (
        <div className="flex flex-col items-center justify-center h-40">
          <p className="text-t3 text-gray-500">새로운 알림이 없습니다.</p>
        </div>
      )}
      {(notifications || []).map((item, index) => (
        <div
          key={item.id || index}
          onClick={item.read ? undefined : () => handleNoticeClick(item.id)}
          className={`relative flex gap-4 rounded-xl border border-gray-100 p-5 transition-all ${item.read ? 'bg-white' : 'bg-primary-50/30'} cursor-pointer hover:border-gray-200 hover:shadow-sm`}
        >
          <div className="shrink-0">{renderIcon(item.type)}</div>

          <div className="flex flex-1 flex-col justify-center">
            <div className="flex items-start justify-between">
              <h3
                className={`mb-1 text-t4 ${item.read ? 'font-medium text-gray-800' : 'font-bold text-black'}`}
              >
                {item.title}
              </h3>

              {!item.read && (
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary-600"></span>
              )}
            </div>
            <p className="mb-2 line-clamp-2 text-t3 leading-relaxed text-gray-500">
              {item.message}
            </p>
            <span className="text-t2 font-light text-gray-400">{item.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
