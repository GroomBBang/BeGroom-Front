// @ts-nocheck
import type { ProductDetailResponseDTO } from '@/features/product/types/response';

export const PRODUCTS: ProductDetailResponseDTO[] = [
  {
    productId: 1,
    productNo: 5000069,
    brand: '비구름',
    name: '[바름팜] 친환경 감자 600g',
    shortDescription: '안심하고 즐기는 파근파근함',
    salesPrice: 3990,
    discountedPrice: 2990,
    discountRate: 8,
    expirationDate: '농산물로 별도의 소비기한은 없으나 가급적 빨리 섭취를 권장합니다.',
    guides: ['신선식품의 특성상 상품의 3% 내외의 중량에 차이가 발생할 수 있습니다.'],
    productDetail: '<div>상품 상세 내용...</div>',
    productNotice:
      '[{"notices":[{"title":"품목 또는 명칭","description":"상품설명 및 상품이미지 참조"}]}]',
    mainImageUrl: 'https://images.unsplash.com/photo-1524594227084-1a3b44d9b1f5',
    detailImageUrls: [
      'https://images.unsplash.com/photo-1542838132-92c53300491e',
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    ],
    isSoldOut: false,
    productStatus: 'SALE',
    details: [
      {
        productDetailId: 11,
        name: '친환경 감자 600g',
        basePrice: 3990,
        discountedPrice: 2990,
        quantity: 999,
        isAvailable: true,
      },
    ],
  },

  {
    productId: 2,
    productNo: 5000070,
    brand: '비구름',
    name: '[Kurly Only] 저지방 우유 1L',
    shortDescription: '부담 없이 즐기는 고소함',
    salesPrice: 3900,
    discountedPrice: 3200,
    discountRate: 18,
    expirationDate: '제조일로부터 10일 (냉장보관)',
    guides: ['개봉 후에는 가급적 빠르게 섭취해 주세요.'],
    productDetail: '<div>우유 상세 내용...</div>',
    productNotice:
      '[{"notices":[{"title":"원재료명","description":"상품설명 및 상품이미지 참조"}]}]',
    mainImageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150',
    detailImageUrls: [
      'https://images.unsplash.com/photo-1550583724-b2692b85b150',
      'https://images.unsplash.com/photo-1608198093002-ad4e005484ec',
    ],
    isSoldOut: false,
    productStatus: 'SALE',
    details: [
      {
        productDetailId: 21,
        name: '저지방 우유 1L',
        basePrice: 3900,
        discountedPrice: 3200,
        quantity: 120,
        isAvailable: true,
      },
    ],
  },
  {
    productId: 3,
    productNo: 5000071,
    brand: '슬로우클로젯',
    name: '[슬로우클로젯] 베이직 후디 3 Colors',
    shortDescription: '사계절 활용 가능한 데일리 후디',
    salesPrice: 275000,
    discountedPrice: 198000,
    discountRate: 28,
    expirationDate: '의류 상품으로 별도의 소비기한은 없습니다.',
    guides: [
      '세탁 시 뒤집어서 단독 세탁을 권장합니다.',
      '건조기 사용 시 수축이 발생할 수 있습니다.',
    ],
    productDetail: '<div>베이직 후디 상세 설명...</div>',
    productNotice:
      '[{"notices":[{"title":"소재","description":"면 100%"},{"title":"제조국","description":"KOREA"}]}]',
    mainImageUrl: 'https://images.unsplash.com/photo-1520975922284-9a21b3f3f6c1',
    detailImageUrls: [
      'https://images.unsplash.com/photo-1520975922284-9a21b3f3f6c1',
      'https://images.unsplash.com/photo-1520974735194-6c5c7cdd1d32',
      'https://images.unsplash.com/photo-1520975698519-59c8c4f4e1b4',
    ],
    isSoldOut: false,
    productStatus: 'SALE',
    details: [
      {
        productDetailId: 31,
        name: '베이직 후디 (Beige / Free)',
        basePrice: 275000,
        discountedPrice: 198000,
        quantity: 50,
        isAvailable: true,
      },
      {
        productDetailId: 32,
        name: '베이직 후디 (Black / Free)',
        basePrice: 275000,
        discountedPrice: 198000,
        quantity: 80,
        isAvailable: true,
      },
      {
        productDetailId: 33,
        name: '베이직 후디 (Gray / Free)',
        basePrice: 275000,
        discountedPrice: 198000,
        quantity: 0,
        isAvailable: false, // ❗ 품절 옵션 테스트용
      },
    ],
  },
];
