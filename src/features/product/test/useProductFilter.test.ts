import { act, renderHook } from '@testing-library/react';
import { useProductFilters } from '../hooks/useProductFilter';

const pushMock = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
  usePathname: () => '/search',
  useSearchParams: jest.fn(),
}));

jest.mock('../lib/format', () => ({
  objectToQuery: jest.fn(() => 'brandIds=1'),
  queryToObject: jest.fn(() => ({
    brandIds: [],
    deliveryTypes: [],
    packagingTypes: [],
    excludeSoldOut: false,
    page: 0,
    size: 30,
    sort: 'wishlistCount',
    direction: 'DESC',
  })),
}));

describe('useProductFilters', () => {
  test('toggleBrand 시 필터에 추가되고 URL이 변경된다', () => {
    const { result } = renderHook(() => useProductFilters());

    act(() => {
      result.current.toggleBrand(1);
    });

    expect(result.current.filters.brandIds).toContain(1);
    expect(pushMock).toHaveBeenCalled();
  });

  test('setPage 시 page가 변경되고 URL이 변경된다', () => {
    const { result } = renderHook(() => useProductFilters());

    act(() => {
      result.current.setPage(3);
    });

    expect(result.current.filters.page).toBe(3);
    expect(pushMock).toHaveBeenCalled();
  });

  test('resetFilters 시 기본값으로 초기화된다', () => {
    const { result } = renderHook(() => useProductFilters());

    act(() => {
      result.current.toggleBrand(1);
    });

    act(() => {
      result.current.resetFilters();
    });

    expect(result.current.filters.brandIds).toEqual([]);
    expect(result.current.filters.page).toBe(0);
    expect(pushMock).toHaveBeenCalled();
  });
});
