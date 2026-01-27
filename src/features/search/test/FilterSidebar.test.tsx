import FilterSidebar from '@/features/search/components/FilterSidebar';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('FilterSidebar', () => {
  test('카테고리 옵션 선택 시 필터를 추가하는 함수가 호출된다.', async () => {
    const user = userEvent.setup();

    const filtersState = {
      filters: {
        brandIds: [],
        packagingTypes: [],
        deliveryTypes: [],
        excludeSoldOut: true,
      },
      toggleBrand: jest.fn(),
      toggleDelivery: jest.fn(),
      togglePackaging: jest.fn(),
      setIncludeSoldOut: jest.fn(),
      resetFilters: jest.fn(),
    } as any;

    render(<FilterSidebar filtersState={filtersState} />);

    await user.click(screen.getByText('가야농장'));

    expect(filtersState.toggleBrand).toHaveBeenCalledTimes(1);
    expect(filtersState.toggleBrand).toHaveBeenCalledWith(1);
  });

  test('1. 포장타입 옵션 선택 시 필터를 추가하는 함수가 호출된다.', async () => {
    const user = userEvent.setup();

    const filtersState = {
      filters: {
        brandIds: [],
        packagingTypes: [],
        deliveryTypes: [],
        excludeSoldOut: true,
      },
      toggleBrand: jest.fn(),
      toggleDelivery: jest.fn(),
      togglePackaging: jest.fn(),
      setIncludeSoldOut: jest.fn(),
      resetFilters: jest.fn(),
    } as any;

    render(<FilterSidebar filtersState={filtersState} />);

    await user.click(screen.getByRole('button', { name: '포장타입' }));

    await user.click(screen.getByText('냉장'));
    expect(filtersState.togglePackaging).toHaveBeenCalledTimes(1);
    expect(filtersState.togglePackaging).toHaveBeenCalledWith('COLD');

    await user.click(screen.getByText('상온'));
    expect(filtersState.togglePackaging).toHaveBeenCalledTimes(2);
    expect(filtersState.togglePackaging).toHaveBeenCalledWith('ROOM');

    await user.click(screen.getByText('냉동'));
    expect(filtersState.togglePackaging).toHaveBeenCalledTimes(3);
    expect(filtersState.togglePackaging).toHaveBeenCalledWith('FROZEN');
  });

  test('2. 배송 옵션 선택 시 필터를 추가하는 함수가 호출된다.', async () => {
    const user = userEvent.setup();

    const filtersState = {
      filters: {
        brandIds: [],
        packagingTypes: [],
        deliveryTypes: [],
        excludeSoldOut: true,
      },
      toggleBrand: jest.fn(),
      toggleDelivery: jest.fn(),
      togglePackaging: jest.fn(),
      setIncludeSoldOut: jest.fn(),
      resetFilters: jest.fn(),
    } as any;

    render(<FilterSidebar filtersState={filtersState} />);

    await user.click(screen.getByRole('button', { name: '배송' }));

    await user.click(screen.getByText('샛별배송'));
    expect(filtersState.toggleDelivery).toHaveBeenCalledTimes(1);
    expect(filtersState.toggleDelivery).toHaveBeenCalledWith('DAWN');

    await user.click(screen.getByText('판매자배송'));
    expect(filtersState.toggleDelivery).toHaveBeenCalledTimes(2);
    expect(filtersState.toggleDelivery).toHaveBeenCalledWith('SELLER');
  });

  test('3. 초기화 버튼 클릭 시 필터를 초기화하는 함수가 호출된다', async () => {
    const user = userEvent.setup();

    const filtersState = {
      filters: {
        brandIds: [],
        packagingTypes: [],
        deliveryTypes: [],
        excludeSoldOut: true,
      },
      toggleBrand: jest.fn(),
      toggleDelivery: jest.fn(),
      togglePackaging: jest.fn(),
      setIncludeSoldOut: jest.fn(),
      resetFilters: jest.fn(),
    } as any;

    render(<FilterSidebar filtersState={filtersState} />);

    await user.click(screen.getByRole('button', { name: '초기화' }));

    expect(filtersState.resetFilters).toHaveBeenCalledTimes(1);
  });

  test('4. 현재 선택된 필터는 구분이 가능하도록 스타일이 적용된다.', () => {
    const filtersState = {
      filters: {
        brandIds: [1],
        packagingTypes: [],
        deliveryTypes: [],
        excludeSoldOut: true,
      },
      toggleBrand: jest.fn(),
      toggleDelivery: jest.fn(),
      togglePackaging: jest.fn(),
      setIncludeSoldOut: jest.fn(),
      resetFilters: jest.fn(),
    } as any;

    render(<FilterSidebar filtersState={filtersState} />);

    const labelEl = screen.getByText('가야농장').closest('label');
    const checkbox = labelEl!.querySelector('input[type="checkbox"]') as HTMLInputElement;

    expect(checkbox).toBeChecked();
  });
});
