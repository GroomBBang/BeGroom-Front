'use client';

import { ChevronRight, CreditCard, Heart, Package, User, X } from 'lucide-react';
import { useState } from 'react';

// ==========================================
// 1. 하위 컴포넌트 정의
// ==========================================

// [1-1] 주문 내역 컴포넌트
const OrdersContent = () => {
  const ORDERS = [
    {
      id: '1766481175331',
      date: '2025. 12. 23.',
      productName: '프리미엄 과일 모음',
      price: 29900,
      quantity: 1,
      shippingFee: 3000,
      totalAmount: 32900,
      status: '주문 확인',
      imageUrl:
        'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=200',
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {ORDERS.map((order) => (
        <div key={order.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="flex items-start justify-between p-5">
            <div className="flex flex-col gap-1">
              <span className="font-medium text-gray-800">주문일자: {order.date}</span>
              <span className="text-sm text-gray-400">주문번호: {order.id}</span>
            </div>
            <button className="flex items-center gap-1 rounded bg-primary-50 px-3 py-1.5 text-xs font-bold text-primary-600 transition-colors hover:bg-primary-100">
              {order.status}
              <ChevronRight size={14} />
            </button>
          </div>
          <div className="mx-5 h-px bg-gray-100"></div>
          <div className="flex gap-4 p-5">
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md border border-gray-100 bg-gray-100">
              <img
                src={order.imageUrl}
                alt={order.productName}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="mb-1 text-base font-bold text-gray-900">{order.productName}</h3>
              <p className="text-sm text-gray-500">
                {order.price.toLocaleString()}원 × {order.quantity}개
              </p>
            </div>
          </div>
          <div className="mx-5 h-px bg-gray-100"></div>
          <div className="flex items-center justify-between bg-gray-50/50 p-5">
            <span className="text-sm font-medium text-gray-600">총 결제 금액</span>
            <span className="text-xl font-bold text-gray-900">
              {order.totalAmount.toLocaleString()}원
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

// [1-2] 쿠폰함 컴포넌트
const CouponsContent = () => {
  const COUPONS = [
    {
      id: 1,
      title: '신규 가입 축하 쿠폰',
      amount: '5,000원',
      minOrder: '30,000원',
      expiry: '2026. 1. 23.까지',
    },
    {
      id: 2,
      title: '전 상품 10% 할인',
      amount: '10%',
      minOrder: '50,000원',
      expiry: '2026. 1. 8.까지',
    },
    {
      id: 3,
      title: '프리미엄 회원 특별 쿠폰',
      amount: '15,000원',
      minOrder: '100,000원',
      expiry: '2025. 12. 31.까지',
    },
    {
      id: 4,
      title: '주말 특가 20% 할인',
      amount: '20%',
      minOrder: '40,000원',
      expiry: '2025. 12. 27.까지',
    },
    {
      id: 5,
      title: '첫 구매 감사 쿠폰',
      amount: '3,000원',
      minOrder: '20,000원',
      expiry: '2026. 2. 22.까지',
    },
    {
      id: 6,
      title: 'VIP 전용 30% 할인',
      amount: '30%',
      minOrder: '150,000원',
      expiry: '2025. 12. 22.까지',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {COUPONS.map((coupon) => (
        <div
          key={coupon.id}
          className="flex flex-col justify-between rounded-xl border border-primary-100 bg-white p-6 shadow-sm transition-all hover:border-primary-300 hover:shadow-md"
        >
          <div>
            <h3 className="mb-2 font-medium text-gray-900">{coupon.title}</h3>
            <div className="mb-6 text-3xl font-bold text-primary-600">{coupon.amount}</div>
          </div>
          <div className="flex flex-col gap-1 text-sm text-gray-400">
            <span>최소 주문금액: {coupon.minOrder}</span>
            <span>{coupon.expiry}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

// [1-3] 회원정보 컴포넌트
const ProfileContent = () => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 md:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-500">이메일</label>
          <div className="w-full rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-gray-900">
            user@kurly.com
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-500">이름</label>
          <div className="w-full rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-gray-900">
            김고객
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-500">휴대폰 번호</label>
          <div className="w-full rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-gray-900">
            010-1234-5678
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-500">회원 등급</label>
          <div className="w-full rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-gray-900">
            일반 회원
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-500">가입일</label>
          <div className="w-full rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-gray-900">
            2025. 12. 24.
          </div>
        </div>
      </div>
    </div>
  );
};

// [1-4] 위시리스트 컴포넌트 (✨ 업데이트됨)
const WishlistContent = () => {
  const WISHLIST_ITEMS = [
    {
      id: 1,
      category: '과일',
      name: '프리미엄 과일 모음',
      price: 29900,
      description: '달콤한 제철 과일 모음',
      likes: 0,
      imageUrl:
        'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 2,
      category: '채소',
      name: '방울토마토 500g',
      price: 6900,
      description: '달콤한 방울토마토',
      likes: 0,
      imageUrl:
        'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=400',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {WISHLIST_ITEMS.map((item) => (
        <div
          key={item.id}
          className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-md"
        >
          {/* 이미지 영역 */}
          <div className="relative h-48 bg-gray-100">
            <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
            {/* 닫기 버튼 */}
            <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-500 backdrop-blur-sm transition-colors hover:bg-white hover:text-gray-900">
              <X size={18} />
            </button>
          </div>

          {/* 텍스트 영역 */}
          <div className="p-5">
            <span className="mb-1 block text-sm text-gray-500">{item.category}</span>
            <h3 className="mb-2 text-lg font-bold text-gray-900">{item.name}</h3>
            <div className="mb-2 text-2xl font-bold text-primary-600">
              {item.price.toLocaleString()}원
            </div>
            <p className="mb-4 text-sm text-gray-500">{item.description}</p>

            {/* 찜 영역 */}
            <div className="flex items-center gap-1 text-sm font-medium text-primary-600">
              <Heart size={16} className="fill-primary-600" />
              <span>{item.likes}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ==========================================
// 2. 메인 페이지 컴포넌트
// ==========================================

type MenuType = 'orders' | 'coupons' | 'profile' | 'wishlist';

export default function MyPage() {
  // 개발 확인용 기본값: wishlist로 변경
  const [activeMenu, setActiveMenu] = useState<MenuType>('wishlist');

  const menus = [
    { id: 'orders', label: '주문 내역', icon: Package },
    { id: 'coupons', label: '쿠폰', icon: CreditCard },
    { id: 'profile', label: '회원정보', icon: User },
    { id: 'wishlist', label: '위시리스트', icon: Heart },
  ];

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
      default:
        return <OrdersContent />;
    }
  };

  const activeLabel = menus.find((m) => m.id === activeMenu)?.label;

  return (
    <div className="mx-auto min-h-screen max-w-screen-xl bg-background px-5 py-10">
      <h1 className="mb-8 text-t8 font-bold text-gray-900">마이페이지</h1>

      <div className="flex flex-col gap-8 md:flex-row">
        {/* 사이드바 */}
        <aside className="w-full flex-shrink-0 md:w-[250px]">
          <div className="h-fit rounded-xl border border-gray-200 bg-white p-6">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-800 text-t5 font-medium text-white">
                김
              </div>
              <div className="overflow-hidden">
                <div className="truncate font-bold text-gray-900">김고객</div>
                <div className="truncate text-t3 text-gray-500">user@kurly.com</div>
              </div>
            </div>
            <div className="my-4 h-px bg-gray-100"></div>
            <nav className="flex flex-col gap-1">
              {menus.map((menu) => {
                const Icon = menu.icon;
                const isActive = activeMenu === menu.id;
                return (
                  <button
                    key={menu.id}
                    onClick={() => setActiveMenu(menu.id as MenuType)}
                    className={`
                      flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-t3 transition-colors
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

        {/* 컨텐츠 영역 */}
        <main className="flex-1">
          <h2 className="mb-4 text-t6 font-bold text-gray-900">{activeLabel}</h2>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
