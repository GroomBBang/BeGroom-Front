'use client';

import notificationAPI from '@/features/notification/apis/notification.api';
import NotificationHeader from '@/features/notification/components/NotificationHeader';
import NotificationList from '@/features/notification/components/NotificationList';
import { NotificationResponseDto } from '@/features/notification/types/response';
import { Skeleton } from '@/shared/components/common/skeleton';
import { useEffect, useState } from 'react';

export default function NotificationPage() {
  const { fetchNotification } = notificationAPI();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<NotificationResponseDto | null>(null);

  useEffect(() => {
    fetchNotification().then((response) => {
      setData(response);
      setIsLoading(false);
    });
  }, []);

  const handleMarkAllRead = () => {};

  return (
    <div className="mx-auto min-h-screen max-w-screen-md bg-background px-5 py-8">
      <NotificationHeader handleMarkAllRead={handleMarkAllRead} />

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-[130px]" />
          ))}
        </div>
      ) : (
        <NotificationList notifications={data?.result.notification || []} />
      )}
    </div>
  );
}
