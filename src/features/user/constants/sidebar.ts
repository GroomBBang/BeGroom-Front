import { Coins, CreditCard, Heart, Package, User } from 'lucide-react';

export const menus = [
  { id: 'profile', label: '회원정보', icon: User },
  { id: 'orders', label: '주문 내역', icon: Package },
  { id: 'points', label: '적립금', icon: Coins },
  { id: 'wishlist', label: '위시리스트', icon: Heart },
  { id: 'coupons', label: '쿠폰', icon: CreditCard },
];
