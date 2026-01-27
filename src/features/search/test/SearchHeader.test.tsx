import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchHeader from '../components/SearchHeader';

describe('SearchHeader', () => {
  test('1. 정렬 옵션 선택 시 정렬을 추가하는 함수가 호출되고, 페이지가 초기화된다.', async () => {
    const user = userEvent.setup();

    const filtersState = {
      filters: {
        sort: 'productId',
        direction: 'DESC',
      },
      setSortOption: jest.fn(),
      setPage: jest.fn(),
    } as any;

    render(<SearchHeader filtersState={filtersState} />);

    await user.click(screen.getByRole('button', { name: '낮은 가격순' }));

    expect(filtersState.setSortOption).toHaveBeenCalledTimes(1);
    expect(filtersState.setSortOption).toHaveBeenCalledWith('salesPrice', 'ASC');

    expect(filtersState.setPage).toHaveBeenCalledTimes(1);
    expect(filtersState.setPage).toHaveBeenCalledWith(0);
  });

  test('2. 현재 선택된 필터는 구분이 가능하도록 스타일이 적용된다.', () => {
    const filtersState = {
      filters: {
        sort: 'wishlistCount',
        direction: 'DESC',
      },
      setSortOption: jest.fn(),
      setPage: jest.fn(),
    } as any;

    render(<SearchHeader filtersState={filtersState} />);

    const activeTab = screen.getByRole('button', { name: '인기순' });

    expect(activeTab).toHaveClass('font-bold');
    expect(activeTab).toHaveClass('text-gray-900');
  });
});
