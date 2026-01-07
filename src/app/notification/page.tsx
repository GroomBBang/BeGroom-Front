'use client';

import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import notificationAPI from '@/features/notification/apis/notification.api';
import NotificationHeader from '@/features/notification/components/NotificationHeader';
import NotificationList from '@/features/notification/components/NotificationList';
import { NotificationResponseDto } from '@/features/notification/types/response';
import { Skeleton } from '@/shared/components/common/skeleton';
import { useCallback, useEffect, useState } from 'react';

export default function NotificationPage() {
  const { setUnreadNotisCount } = useAuthStore();
  const { fetchNotification, readAllNotification } = notificationAPI();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<NotificationResponseDto | null>(null);
  const { resetNotisCount, unreadNotisCount } = useAuthStore();

  const refreshData = useCallback(async () => {
    try {
      const response = await fetchNotification();
      setData(response.result);
      setUnreadNotisCount(response.result.unreadCount);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleMarkAllRead = () => {
    readAllNotification().then(() => {
      resetNotisCount();
      refreshData();
    });
  };

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  useEffect(() => {
    const handleSSEReload = () => {
      refreshData();
    };

    window.addEventListener('notification-update', handleSSEReload);

    return () => {
      window.removeEventListener('notification-update', handleSSEReload);
    };
  }, [refreshData]);

  return (
    <div className="mx-auto min-h-screen max-w-screen-md bg-background px-5 py-8">
      <NotificationHeader
        handleMarkAllRead={handleMarkAllRead}
        isUnreadNoticeExist={unreadNotisCount > 0}
      />

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-[130px]" />
          ))}
        </div>
      ) : (
        <NotificationList notifications={data?.notifications || []} reload={refreshData} />
      )}
    </div>
  );
}
