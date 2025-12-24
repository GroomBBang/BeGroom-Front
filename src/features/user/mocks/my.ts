export const WISHLIST_ITEMS = [
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

export const ORDERS = [
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

export const COUPONS = [
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

export const USER_PROFILE = {
  email: 'user@kurly.com',
  name: '김고객',
  phoneNumber: '010-1234-5678',
  grade: '일반 회원',
  joinDate: '2025. 12. 24.',
};
