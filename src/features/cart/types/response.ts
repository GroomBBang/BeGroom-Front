import { CartGroupItemType } from './model';

// 장바구니 조회 응답
export type getCartResponseDTO = {
  groupItems: CartGroupItemType[];

  totalCount: number;
  selectedCount: number;

  totalPrice: number;
  totalDiscountPrice: number;
  finalPrice: number;

  deliveryFee: number;
};
// 장바구니 추가 요청
export type addCartItemRequestDTO = {
  items: {
    productDetailId: number;
    quantity: number;
  }[];
};
