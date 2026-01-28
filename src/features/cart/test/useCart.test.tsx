'use client';

const push = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: push,
  }),
}));

const fetchCart = jest.fn().mockResolvedValue({
  groupItems: [
    {
      items: [{ cartItemId: 1, quantity: 1, stockQuantity: 2, isSelected: true }],
    },
  ],
});

const updateCartItemQty = jest.fn();
const removeCartItem = jest.fn();
const removeSelectedItems = jest.fn();
const createOrder = jest.fn();
const setOrderId = jest.fn();

jest.mock('../apis/cart.api', () => ({
  __esModule: true,
  default: () => ({
    fetchCart: fetchCart,
    removeCartItem: removeCartItem,
    updateCartItemQty: updateCartItemQty,
    selectCartItem: jest.fn(),
    deselectAllCartItems: jest.fn(),
    removeSelectedItems: removeSelectedItems,
    handleClickOrder: jest.fn(),
  }),
}));

jest.mock('../../checkout/apis/checkout.api', () => ({
  __esModule: true,
  default: () => ({
    createOrder: createOrder,
  }),
}));

jest.mock('../../checkout/stores/useCheckoutStore', () => ({
  __esModule: true,
  useCheckoutStore: (selector: any) => selector({ orderId: null, setOrderId }),
}));
import { act, renderHook, waitFor } from '@testing-library/react';
import { useCart } from '../hooks/useCart';

beforeEach(() => {
  fetchCart.mockClear();
  updateCartItemQty.mockClear();
});

describe('useCart 테스트', () => {
  test('1. 훅을 실행되면 장바구니 데이터를 불러오고 응답값을 저장한다.', async () => {
    const { result } = renderHook(() => useCart());

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(fetchCart).toHaveBeenCalledTimes(1);
    expect(result.current.items).toHaveLength(1);
  });

  describe('상품 수량 변경', () => {
    test('1. 상품 수량 변경 요청이 성공하면 장바구니 데이터를 업데이트한다.', async () => {
      const { result } = renderHook(() => useCart());

      await waitFor(() => expect(result.current.isLoading).toBe(false));
      await act(async () => {
        await result.current.updateQty(1, 2, 2);
      });

      expect(updateCartItemQty).toHaveBeenCalled();
      expect(result.current.items[0].quantity).toBe(2);
    });

    test('2. 상품 수량 변경 요청이 재고 부족으로 실패하면 에러 문구를 반환한다.', async () => {
      const { result } = renderHook(() => useCart());

      await waitFor(() => expect(result.current.isLoading).toBe(false));
      await act(async () => {
        await result.current.updateQty(1, 3, 2);
      });

      expect(updateCartItemQty).not.toHaveBeenCalled();
      expect(result.current.error).toBe('선택하신 상품의 재고가 부족합니다.');
    });

    test('3. 상품 수량 변경 요청이 1보다 적으면 데이터를 업데이트하지 않는다.', async () => {
      const { result } = renderHook(() => useCart());

      await waitFor(() => expect(result.current.isLoading).toBe(false));
      await act(async () => {
        await result.current.updateQty(1, 0, 2);
      });

      expect(updateCartItemQty).not.toHaveBeenCalled();
      expect(result.current.items[0].quantity).toBe(1);
    });

    test('4. 상품 수량 변경 요청이 실패하면 에러 문구를 반환한다.', async () => {
      const { result } = renderHook(() => useCart());
      updateCartItemQty.mockRejectedValue(new Error('상품 수량 변경에 실패했습니다.'));

      await waitFor(() => expect(result.current.isLoading).toBe(false));
      await act(async () => {
        await result.current.updateQty(1, 2, 2);
      });

      expect(updateCartItemQty).toHaveBeenCalled();
      expect(result.current.error).toBe('상품 수량 변경에 실패했습니다.');
    });
  });

  describe('개별 상품 삭제', () => {
    test('1. 개별 상품 삭제 요청이 성공하면 장바구니 데이터를 업데이트한다.', async () => {
      const { result } = renderHook(() => useCart());

      await waitFor(() => expect(result.current.isLoading).toBe(false));
      await act(async () => {
        await result.current.removeItem(1);
      });

      expect(removeCartItem).toHaveBeenCalled();
      expect(result.current.items).toHaveLength(0);
    });

    test('2. 개별 상품 삭제 요청이 실패하면 에러 문구를 반환한다.', async () => {
      const { result } = renderHook(() => useCart());
      removeCartItem.mockRejectedValue(new Error('상품 삭제에 실패했습니다.'));

      await waitFor(() => expect(result.current.isLoading).toBe(false));
      await act(async () => {
        await result.current.removeItem(1);
      });

      expect(removeCartItem).toHaveBeenCalled();
      expect(result.current.items).toHaveLength(1);
      expect(result.current.error).toBe('상품 삭제에 실패했습니다.');
    });
  });

  describe('선택 상품 삭제', () => {
    test('1. 선택 상품 삭제 요청이 성공하면 장바구니 데이터를 업데이트한다.', async () => {
      const { result } = renderHook(() => useCart());

      await waitFor(() => expect(result.current.isLoading).toBe(false));
      await act(async () => {
        await result.current.removeSelected();
      });

      expect(removeSelectedItems).toHaveBeenCalled();
      expect(result.current.items).toHaveLength(0);
    });

    test('2. 선택 상품 삭제 요청이 실패하면 에러 문구를 반환한다.', async () => {
      const { result } = renderHook(() => useCart());
      removeSelectedItems.mockRejectedValue(new Error('상품 삭제에 실패했습니다.'));

      await waitFor(() => expect(result.current.isLoading).toBe(false));
      await act(async () => {
        await result.current.removeSelected();
      });

      expect(removeSelectedItems).toHaveBeenCalled();
      expect(result.current.items).toHaveLength(1);
      expect(result.current.error).toBe('상품 삭제에 실패했습니다.');
    });
  });

  describe('주문하기 버튼 클릭', () => {
    test('1. 주문하기 요청이 성공하면 응답 값을 전역 상태로 저장 및 페이지 이동', async () => {
      const { result } = renderHook(() => useCart());
      createOrder.mockResolvedValue({
        orderId: 1,
      });

      await waitFor(() => expect(result.current.isLoading).toBe(false));
      await act(async () => {
        await result.current.handleClickOrder();
      });

      expect(createOrder).toHaveBeenCalled();
      expect(setOrderId).toHaveBeenCalledWith(1);
      expect(push).toHaveBeenCalledWith('/checkout');
    });

    test('2. 주문하기 요청이 실패하면 에러 문구를 반환한다.', async () => {
      const { result } = renderHook(() => useCart());
      createOrder.mockRejectedValue(new Error('주문하기 요청이 실패했습니다.'));

      await waitFor(() => expect(result.current.isLoading).toBe(false));
      await act(async () => {
        await result.current.handleClickOrder();
      });

      expect(createOrder).toHaveBeenCalled();
      expect(result.current.error).toBe('주문하기 요청이 실패했습니다.');
    });
  });
});
