'use client';

import CouponsContent from '@/features/user/components/CouponsContent';
import MySidebar, { MenuType } from '@/features/user/components/MySidebar';
import OrdersContent from '@/features/user/components/OrdersContent';
import PointsContent from '@/features/user/components/PointsContent';
import ProfileContent from '@/features/user/components/ProfileContent';
import WishlistContent from '@/features/user/components/WishlistContent';
import { useState } from 'react';

export default function MyPage() {
  const [activeMenu, setActiveMenu] = useState<MenuType>('wishlist');

  const renderContent = () => {
    switch (activeMenu) {
      case 'orders':
        return <OrdersContent />;
      case 'coupons':
        return <CouponsContent />;
      case 'profile':
        return <ProfileContent />;
      case 'wishlist':
        return <WishlistContent />;
      case 'points':
        return <PointsContent />;
      default:
        return <OrdersContent />;
    }
  };

  const getActiveLabel = () => {
    switch (activeMenu) {
      case 'orders':
        return '주문 내역';
      case 'coupons':
        return '쿠폰';
      case 'profile':
        return '회원정보';
      case 'wishlist':
        return '위시리스트';
      case 'points':
        return '적립금';
      default:
        return '';
    }
  };

  return (
    <div className="mx-auto min-h-screen max-w-screen-xl bg-background px-5 py-10">
      <h1 className="mb-8 text-t8 font-bold text-gray-900">마이페이지</h1>

      <div className="flex flex-col gap-8 md:flex-row">
        <MySidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />

        <main className="flex-1">
          <h2 className="mb-4 text-t6 font-bold text-gray-900">{getActiveLabel()}</h2>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
