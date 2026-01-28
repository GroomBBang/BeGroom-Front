// src/features/cart/stores/useCartStore.test.ts
import http from '@/shared/apis/http';
import { act } from '@testing-library/react';
import { useCartStore } from '../stores/useCartStore';

jest.mock('../../../shared/apis/http');

const httpMock = http as jest.Mocked<typeof http>;

describe('useCartStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useCartStore.setState({ cartCount: 0 });
  });

  test('초기 cartCount는 0이다', () => {
    expect(useCartStore.getState().cartCount).toBe(0);
  });

  test('setCartCount / clearCartCount 동작', () => {
    act(() => {
      useCartStore.getState().setCartCount(5);
    });
    expect(useCartStore.getState().cartCount).toBe(5);

    act(() => {
      useCartStore.getState().clearCartCount();
    });
    expect(useCartStore.getState().cartCount).toBe(0);
  });

  test('fetchCartCount는 API를 호출하고 cartCount를 갱신한다', async () => {
    httpMock.get.mockResolvedValueOnce({ result: 3 } as any);

    await act(async () => {
      await useCartStore.getState().fetchCartCount();
    });

    expect(httpMock.get).toHaveBeenCalledWith('/cart/count');
    expect(useCartStore.getState().cartCount).toBe(3);
  });

  test('fetchCartCount 응답이 없으면 0으로 세팅한다', async () => {
    httpMock.get.mockResolvedValueOnce({ result: null } as any);

    await act(async () => {
      await useCartStore.getState().fetchCartCount();
    });

    expect(useCartStore.getState().cartCount).toBe(0);
  });
});
