'use client';

import notificationAPI from '@/features/notification/apis/notification.api';
import NotificationHeader from '@/features/notification/components/NotificationHeader';
import NotificationMainContainer from '@/features/notification/components/NotificationMainContainer';
import { useEffect } from 'react';

export default function NotificationPage() {
  const { fetchNotification } = notificationAPI();

  useEffect(() => {
    const handleSSEReload = () => {
      fetchNotification();
    };

    window.addEventListener('notification-update', handleSSEReload);

    return () => {
      window.removeEventListener('notification-update', handleSSEReload);
    };
  }, [fetchNotification]);

  return (
    <div className="mx-auto min-h-screen max-w-screen-md bg-background px-5 py-8">
      <NotificationHeader />
      <NotificationMainContainer />
    </div>
  );
}
