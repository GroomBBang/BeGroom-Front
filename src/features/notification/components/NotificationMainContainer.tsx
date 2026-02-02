'use client';

import { useEffect } from 'react';
import { useNotification } from '../hooks/useNotification';
import NotificationList from './NotificationList';
import NotificationListLoading from './NotificationListLoading';
import NotificationMainEmptyPlaceHolder from './NotificationMainEmptyPlaceHolder';

export default function NotificationMainContainer() {
  const { items, isLoading, fetchNotificationList } = useNotification();

  useEffect(() => {
    const handleSSEReload = () => {
      fetchNotificationList();
    };

    window.addEventListener('notification-update', handleSSEReload);

    return () => {
      window.removeEventListener('notification-update', handleSSEReload);
    };
  }, [fetchNotificationList]);

  if (isLoading) {
    return <NotificationListLoading />;
  }

  return (
    <div>
      {items?.notifications?.length === 0 ? (
        <NotificationMainEmptyPlaceHolder />
      ) : (
        <NotificationList
          notifications={items?.notifications || []}
          reload={fetchNotificationList}
        />
      )}
    </div>
  );
}
