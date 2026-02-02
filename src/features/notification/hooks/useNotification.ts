'use client';

import notificationAPI from '@/features/notification/apis/notification.api';
import { useModalStore } from '@/shared/stores/useModalStore';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { NotificationResponseDto } from '../types/response';

export function useNotification() {
  const [items, setItems] = useState<NotificationResponseDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { onAlertModal } = useModalStore();

  const api = useMemo(() => notificationAPI(), []);

  const refetch = useCallback(async () => {
    try {
      setIsLoading(true);

      const data = await api.fetchNotification();
      setItems(data.result);
    } catch (e) {
      onAlertModal('알림 내역 조회에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [api]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const readNotification = async (id: number) => {
    try {
      await api.readNotification(id);
    } catch (e) {
      onAlertModal('알림 읽음 표시에 실패했습니다.');
    }
  };

  const readAllNotification = async () => {
    try {
      await api.readAllNotification();
    } catch (e) {
      onAlertModal('전체 알림 읽음 표시에 실패했습니다.');
    }
  };

  const fetchNotificationList = async () => {
    try {
      const response = await api.fetchNotification();
      setItems(response.result);
    } catch (e) {
      onAlertModal('알림 내역 조회에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    items,
    isLoading,
    fetchNotificationList,
    readNotification,
    readAllNotification,
  };
}
