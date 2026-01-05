export const USER_PROFILE = {
  email: 'user@kurly.com',
  name: '김고객',
  phoneNumber: '010-1234-5678',
  role: '회원',
  joinDate: '2025. 12. 24.',
};

export const USER_POINTS = {
  result: {
    wallet: {
      id: 1,
      balance: 5600,
    },
    transactions: [
      {
        id: 103,
        tx_type: 'PAYMENT',
        amount: -3400,
        balance_after: 5600,
        reference_type: 'ORDER',
        reference_id: 2001,
        created_at: '2025. 12. 28.',
        description: '[주문] 프리미엄 과일 모음 구매 사용',
      },
      {
        id: 102,
        tx_type: 'CHARGE',
        amount: 5000,
        balance_after: 9000,
        reference_type: 'EVENT',
        reference_id: 101,
        created_at: '2025. 12. 24.',
        description: '[이벤트] 신규 가입 축하 적립금',
      },
      {
        id: 101,
        tx_type: 'CHARGE',
        amount: 4000,
        balance_after: 4000,
        reference_type: 'REFUND',
        reference_id: 99,
        created_at: '2025. 12. 20.',
        description: '[환불] 주문 취소 환불 적립',
      },
    ],
  },
};

export const USER_ORDERS = {
  result: {
    orders: [
      {
        id: 1,
        order_number: '202512280001',
        total_amount: 10000,
        status: 'PAID',
        created_at: '2025. 12. 28.',
        imageUrl: 'https://via.placeholder.com/150',
        productName: '[주문] 프리미엄 과일 모음',
        price: 10000,
        quantity: 1,
      },
      {
        id: 2,
        order_number: '202512280002',
        total_amount: 20000,
        status: 'COMPLETED',
        created_at: '2025. 12. 28.',
        imageUrl: 'https://via.placeholder.com/150',
        productName: '[주문] 유기농 채소 세트',
        price: 10000,
        quantity: 2,
      },
    ],
  },
};

export const USER_WISHLIST = {
  wish: [
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
  ],
};
