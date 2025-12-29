import { Apple, Fish, Gift, Leaf, PartyPopper, Shirt, Wine } from 'lucide-react';

export const CATEGORIES = [
  {
    id: 'newyear',
    label: '새해설선물',
    icon: Gift,
    isNew: true,
    subcategories: ['추천 특가', '사전예약', '가격대별', '카테고리', '큐레이션'],
  },
  {
    id: 'festa',
    label: '리빙컬리페스타',
    icon: PartyPopper,
    isNew: true,
    subcategories: [
      '2025 어워즈',
      '컬리 단독',
      '올해의 브랜드',
      '클리어런스',
      '카테고리 랭킹',
      '푸드 브랜드관',
      '쿠폰 적용 상품',
    ],
  },
  {
    id: 'veg',
    label: '채소',
    icon: Leaf,
    subcategories: [
      '친환경',
      '제철과일',
      '국산과일',
      '수입과일',
      '간편과일',
      '냉동·건과일',
      '견과류',
      '쌀·잡곡',
    ],
  },
  {
    id: 'fruit',
    label: '과일·견과·쌀',
    icon: Apple,
    subcategories: [
      '친환경',
      '제철과일',
      '국산과일',
      '수입과일',
      '간편과일',
      '냉동·건과일',
      '견과류',
      '쌀·잡곡',
    ],
  },
  {
    id: 'seafood',
    label: '수산·해산·건어물',
    icon: Fish,
    subcategories: [
      '제철수산',
      '생선류',
      '굴비·반건류',
      '연어·참치',
      '회·탕류',
      '오징어·낙지·문어',
      '해산물·전복·조개류',
      '새우·게·랍스터',
      '수산가공품',
      '명란',
      '젓갈·창류',
      '간편구이',
      '김·미역·해조류',
      '멸치·황태·다시팩',
      '조미오징어·어포·쥐포',
    ],
  },

  {
    id: 'wine',
    label: '와인·위스키·데낄라',
    icon: Wine,
    isNew: true,
    subcategories: ['레드와인', '화이트와인', '스파클링와인', '위스키', '리큐르'],
  },
  {
    id: 'trad',
    label: '전통주',
    icon: Shirt,
    subcategories: ['막걸리·탁주', '증류주', '약주·청주', '과실주'],
  },
  {
    id: 'best',
    label: '베스트',
    icon: Shirt,
    subcategories: ['2025년도 베스트', '2024년도 베스트', '2023년도 베스트'],
  },
  {
    id: 'sale',
    label: '세일',
    icon: Shirt,
    subcategories: ['식품 세일', '화장품 세일'],
  },
  {
    id: 'fashion',
    label: '패션',
    icon: Shirt,
    subcategories: ['패션 상품 1', '패션 상품 2', '패션 상품 3'],
  },
  {
    id: 'home',
    label: '리빙',
    icon: Shirt,
    subcategories: ['리빙 상품 1', '리빙 상품 2', '리빙 상품 3'],
  },
  {
    id: 'new',
    label: '신상',
    icon: Shirt,
    subcategories: ['신상 상품 1', '신상 상품 2', '신상 상품 3'],
  },
  {
    id: 'special',
    label: '특가/혜택',
    icon: Shirt,
    subcategories: ['특가 상품 1', '특가 상품 2', '특가 상품 3'],
  },
];

export const SUB_CATEGORIES = [
  '생수/얼음',
  '탄산수',
  '탄산/스포츠음료',
  '과일야채음료',
  '차음료',
  '어린이음료/선물세트',
];

export const PRODUCTS = [
  {
    id: 1,
    brand: '테일러',
    title: '[테일러] 트리플 클렌즈 주스 24시간 946mL',
    desc: '세콤달콤',
    price: 12000,
    discount: 0,
    delivery: '샛별배송',
    reviews: 0,
    img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400', // 오렌지 주스 대체 이미지
  },
  {
    id: 2,
    brand: '롯데칠성',
    title: '[롯데칠성] 칠성사이다 제로 라임 (355mL X 6개)',
    desc: '톡 쏘는 청량함',
    price: 5980,
    discount: 0,
    delivery: '샛별배송',
    reviews: 0,
    img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=400', // 캔 음료 대체 이미지
  },
  {
    id: 3,
    brand: '오후의 홍차',
    title: '[오후의 홍차] 차이티 라떼 400mL',
    desc: '일본에서 온 스파이시 한 겨울 음료',
    price: 3200, // 원가
    salePrice: 2600, // 할인가
    discount: 18,
    delivery: '샛별배송',
    reviews: 43,
    img: 'https://images.unsplash.com/photo-1596910547037-846b19803115?auto=format&fit=crop&q=80&w=400', // 밀크티 대체 이미지
  },
];

export const NAV_LINKS = [
  { label: '베스트', href: '/products?main=베스트&sub=전체보기' },
  { label: '세일', href: '/products?main=세일&sub=전체보기' },
  { label: '패션', href: '/products?main=패션&sub=전체보기' },
  { label: '리빙', href: '/products?main=리빙&sub=전체보기' },
  { label: '신상', href: '/products?main=신상&sub=전체보기' },
  { label: '특가/혜택', href: '/products?main=특가/혜택&sub=전체보기' },
];
