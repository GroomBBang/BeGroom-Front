import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { Check } from 'lucide-react';
import notificationAPI from '../apis/notification.api';

export default function NotificationHeader() {
  const { unreadNotisCount, resetNotisCount } = useAuthStore();
  const { readAllNotification } = notificationAPI();

  const handleMarkAllRead = async () => {
    try {
      await readAllNotification();
      resetNotisCount();
      window.dispatchEvent(new Event('notification-update'));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="mb-6 flex items-end justify-between">
      <h1 className="text-t8 font-bold text-gray-900">알림</h1>
      <button
        onClick={handleMarkAllRead}
        disabled={!unreadNotisCount}
        className={`flex items-center gap-1 text-t3 text-gray-500 transition-colors ${unreadNotisCount ? 'hover:text-gray-800' : ''} `}
      >
        <Check size={14} />
        모두 읽음 표시
      </button>
    </header>
  );
}
