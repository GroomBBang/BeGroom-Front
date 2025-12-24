'use client';

import { Bell, Check, Gift, Truck } from 'lucide-react';
import { useState } from 'react';

// 1. 타입 정의 (나중에 API 응답 타입으로 대체)
type NotificationType = 'delivery' | 'coupon' | 'event' | 'system';

interface NotificationItem {
  id: number;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
}

// 2. Mock Data (이미지에 있는 내용 그대로 구성)
const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 1,
    type: 'delivery',
    title: '주문이 배송 시작되었습니다',
    description: '주문하신 상품이 배송을 시작했습니다. 새벽 7시 전에 도착 예정입니다.',
    time: '30분 전',
    isRead: false,
  },
  {
    id: 2,
    type: 'coupon',
    title: '🎁 신규 쿠폰이 발급되었습니다',
    description: '첫 구매 고객을 위한 10% 할인 쿠폰이 발급되었습니다.',
    time: '2시간 전',
    isRead: false,
  },
  {
    id: 3,
    type: 'event',
    title: '크리스마스 특별 프로모션 안내',
    description: '12월 23일부터 25일까지 전 상품 최대 50% 할인 행사를 진행합니다.',
    time: '5시간 전',
    isRead: true,
  },
  {
    id: 4,
    type: 'system',
    title: '배송지 정보 업데이트 안내',
    description: '더 나은 서비스를 위해 배송지 정보를 업데이트해주세요.',
    time: '1일 전',
    isRead: true,
  },
];

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
          <div className="rounded-full bg-blue-100 p-3 text-blue-600">
            <Truck size={24} />
          </div>
        );
      case 'coupon':
        return (
          <div className="rounded-full bg-purple-100 p-3 text-purple-600">
            <Gift size={24} />
          </div>
        );
      case 'event':
        return (
          <div className="rounded-full bg-green-100 p-3 text-green-600">
            <Bell size={24} />
          </div>
        );
      case 'system':
      default:
        return <div className="rounded-full bg-gray-100 p-3 text-gray-600"></div>;
    }
  };

  return (
    <div className="mx-auto min-h-screen max-w-screen-md bg-white px-5 py-8">
      {/* 헤더 영역 */}
      <header className="mb-6 flex items-end justify-between">
        <h1 className="text-3xl font-bold text-gray-900">알림</h1>
        <button
          onClick={handleMarkAllRead}
          className="flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-gray-800"
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
            className={`relative flex gap-4 rounded-2xl border border-gray-100 p-5 transition-all ${item.isRead ? 'bg-white' : 'bg-purple-50/30'} cursor-pointer hover:border-gray-200 hover:shadow-sm`}
          >
            {/* 왼쪽 아이콘 */}
            <div className="shrink-0">{renderIcon(item.type)}</div>

            {/* 컨텐츠 */}
            <div className="flex flex-1 flex-col justify-center">
              <div className="flex items-start justify-between">
                <h3
                  className={`mb-1 text-base ${item.isRead ? 'font-medium text-gray-800' : 'font-bold text-black'}`}
                >
                  {item.title}
                </h3>

                {/* 읽지 않음 표시 (보라색 점) */}
                {!item.isRead && (
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-purple-600"></span>
                )}
              </div>
              <p className="mb-2 line-clamp-2 text-sm leading-relaxed text-gray-500">
                {item.description}
              </p>
              <span className="text-xs font-light text-gray-400">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
