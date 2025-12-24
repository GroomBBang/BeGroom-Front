'use client';

import { INITIAL_NOTIFICATIONS } from '@/features/notification/mocks/notification';
import { NotificationItem, NotificationType } from '@/features/notification/types';
import { Bell, Check, Gift, Truck } from 'lucide-react';
import { useState } from 'react';

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // 모두 읽음 처리 핸들러
  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, isRead: true })));
  };

  // 아이콘 및 배경색 렌더링 헬퍼 함수
  const renderIcon = (type: NotificationType) => {
    switch (type) {
      case 'delivery':
        return (
          <div className="rounded-full bg-info/10 p-3 text-info">
            <Truck size={24} />
          </div>
        );
      case 'coupon':
        return (
          <div className="rounded-full bg-primary-100 p-3 text-primary-600">
            <Gift size={24} />
          </div>
        );
      case 'event':
        return (
          <div className="rounded-full bg-success/10 p-3 text-success">
            <Bell size={24} />
          </div>
        );
      case 'system':
      default:
        return <div className="rounded-full bg-gray-100 p-3 text-gray-600"></div>;
    }
  };

  return (
    <div className="mx-auto min-h-screen max-w-screen-md bg-background px-5 py-8">
      {/* 헤더 영역 */}
      <header className="mb-6 flex items-end justify-between">
        <h1 className="text-t8 font-bold text-gray-900">알림</h1>
        <button
          onClick={handleMarkAllRead}
          className="flex items-center gap-1 text-t3 text-gray-500 transition-colors hover:text-gray-800"
        >
          <Check size={14} />
          모두 읽음 표시
        </button>
      </header>

      {/* 알림 리스트 영역 */}
      <div className="flex flex-col gap-4">
        {notifications.map((item) => (
          <div
            key={item.id}
            className={`relative flex gap-4 rounded-xl border border-gray-100 p-5 transition-all ${item.isRead ? 'bg-white' : 'bg-primary-50/30'} cursor-pointer hover:border-gray-200 hover:shadow-sm`}
          >
            {/* 왼쪽 아이콘 */}
            <div className="shrink-0">{renderIcon(item.type)}</div>

            {/* 컨텐츠 */}
            <div className="flex flex-1 flex-col justify-center">
              <div className="flex items-start justify-between">
                <h3
                  className={`mb-1 text-t4 ${item.isRead ? 'font-medium text-gray-800' : 'font-bold text-black'}`}
                >
                  {item.title}
                </h3>

                {/* 읽지 않음 표시 (보라색 점) */}
                {!item.isRead && (
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary-600"></span>
                )}
              </div>
              <p className="mb-2 line-clamp-2 text-t3 leading-relaxed text-gray-500">
                {item.description}
              </p>
              <span className="text-t2 font-light text-gray-400">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
