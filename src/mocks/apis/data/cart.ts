import { getCartResponseDTO } from '@/features/cart/types/response';

export const CART_ITEMS: getCartResponseDTO = {
  items: [
    {
      cartItemId: 1,
      productDetailId: 101,

      productName: '남해 보물초 시금치',
      productDetailName: '남해 보물초 시금치 250g',
      mainImageUrl: 'https://picsum.photos/300/400?random=1',

      basePrice: 3990,
      discountedPrice: 2990,

      quantity: 2,
      stockQuantity: 120,

      isSelected: true,
      isSoldOut: false,
    },
    {
      cartItemId: 2,
      productDetailId: 102,

      productName: '무항생제 한우 국거리',
      productDetailName: '한우 국거리 300g',
      mainImageUrl: 'https://picsum.photos/300/400?random=2',

      basePrice: 15900,
      discountedPrice: 15900, // 할인 없음

      quantity: 1,
      stockQuantity: 35,

      isSelected: true,
      isSoldOut: false,
    },
    {
      cartItemId: 3,
      productDetailId: 201,

      productName: '제주 감귤',
      productDetailName: '제주 감귤 2kg',
      mainImageUrl: 'https://picsum.photos/300/400?random=3',

      basePrice: 12900,
      discountedPrice: 9900,

      quantity: 3,
      stockQuantity: 0,

      isSelected: false,
      isSoldOut: true,
    },
    {
      cartItemId: 4,
      productDetailId: 301,

      productName: '무농약 샐러드 채소',
      productDetailName: '샐러드 채소 믹스 150g',
      mainImageUrl: 'https://picsum.photos/300/400?random=4',

      basePrice: 5900,
      discountedPrice: 4900,

      quantity: 1,
      stockQuantity: 8,

      isSelected: false,
      isSoldOut: false,
    },
  ],

  // ===== 합계 정보 =====
  totalCount: 4, // 전체 아이템 수
  selectedCount: 2, // 선택된 아이템 수

  // 선택된 상품 기준 계산
  totalPrice: 239 + 0, // ❌ 아래 설명 참고
  totalDiscountPrice: 0,
  finalPrice: 21880,
};
