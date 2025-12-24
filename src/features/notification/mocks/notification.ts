import { NotificationItem } from '../types';

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
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
