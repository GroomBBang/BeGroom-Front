'use client';

import { Box, CreditCard, Heart, Package, User } from 'lucide-react';
import { useState } from 'react';

// 메뉴 타입 정의
type MenuType = 'orders' | 'coupons' | 'profile' | 'wishlist';

export default function MyPage() {
  const [activeMenu, setActiveMenu] = useState<MenuType>('orders');

  // 메뉴 리스트 데이터
  const menus = [
    { id: 'orders', label: '주문 내역', icon: Package },
    { id: 'coupons', label: '쿠폰', icon: CreditCard },
    { id: 'profile', label: '회원정보', icon: User },
    { id: 'wishlist', label: '위시리스트', icon: Heart },
  ];

  return (
    <div className="mx-auto min-h-screen max-w-screen-xl bg-background px-5 py-10">
      {/* 페이지 타이틀 */}
      <h1 className="mb-8 text-t8 font-bold text-gray-900">마이페이지</h1>

      <div className="flex flex-col gap-8 md:flex-row">
        {/* 1. 좌측 사이드바 영역 */}
        <aside className="w-full flex-shrink-0 md:w-[250px]">
          <div className="h-fit rounded-xl border border-gray-200 p-6">
            {/* 프로필 섹션 */}
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-800 text-t5 font-medium text-white">
                김
              </div>
              <div className="overflow-hidden">
                <div className="truncate font-bold text-gray-900">김고객</div>
                <div className="truncate text-t3 text-gray-500">user@kurly.com</div>
              </div>
            </div>

            {/* 구분선 */}
            <div className="my-4 h-px bg-gray-100"></div>

            {/* 네비게이션 메뉴 */}
            <nav className="flex flex-col gap-1">
              {menus.map((menu) => {
                const Icon = menu.icon;
                const isActive = activeMenu === menu.id;

                return (
                  <button
                    key={menu.id}
                    onClick={() => setActiveMenu(menu.id as MenuType)}
                    className={`
                      flex items-center gap-3 rounded-lg px-4 py-3 text-t3 transition-colors
                      ${
                        isActive
                          ? 'bg-primary-50 font-medium text-primary-700'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    <Icon size={18} />
                    {menu.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* 2. 우측 컨텐츠 영역 */}
        <main className="flex-1">
          {/* 섹션 헤더 */}
          <h2 className="mb-4 text-t6 font-bold text-gray-900">주문 내역</h2>

          {/* 빈 상태 (Empty State) 표시 */}
          <div className="flex h-[300px] flex-col items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-400">
            <Box size={48} strokeWidth={1} className="mb-4 text-gray-300" />
            <p className="text-t3 font-medium text-gray-400">주문 내역이 없습니다</p>
          </div>
        </main>
      </div>
    </div>
  );
}
