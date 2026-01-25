// CartItemCard.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CartItemCard from '../components/CartItem';

describe('상품 선택 변경 (CartItemCard)', () => {
  test('1. 체크박스 클릭 시 toggleSelect가 cartItemId로 호출된다', async () => {
    const user = userEvent.setup();

    const toggleSelect = jest.fn();
    const actions = {
      toggleSelect,
      updateQty: jest.fn(),
      removeItem: jest.fn(),
    };

    const item = {
      cartItemId: 101,
      isSelected: false,
    } as any;

    render(<CartItemCard item={item} actions={actions} />);

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(toggleSelect).toHaveBeenCalledTimes(1);
    expect(toggleSelect).toHaveBeenCalledWith(101);
  });
});

describe('상품 삭제 (CartItemCard)', () => {
  test('1. 삭제 버튼 클릭 시 삭제 확인 모달 출력', async () => {
    const user = userEvent.setup();

    const actions = {
      toggleSelect: jest.fn(),
      updateQty: jest.fn(),
      removeItem: jest.fn(),
    };

    const item = {
      cartItemId: 101,
      isSelected: true,
    } as any;

    render(<CartItemCard item={item} actions={actions} />);

    await user.click(screen.getByRole('button', { name: '삭제' }));

    expect(screen.getByTestId('confirm-modal')).toBeInTheDocument();
  });

  test('2. 삭제 확인 모달 확인 버튼 클릭 시 removeItem이 cartItemId로 호출된다', async () => {
    const user = userEvent.setup();

    const removeItem = jest.fn();
    const actions = {
      toggleSelect: jest.fn(),
      updateQty: jest.fn(),
      removeItem,
    };

    const item = {
      cartItemId: 101,
      isSelected: true,
    } as any;

    render(<CartItemCard item={item} actions={actions} />);

    await user.click(screen.getByRole('button', { name: '삭제' }));
    await user.click(screen.getByRole('button', { name: '모달 확인' }));

    expect(removeItem).toHaveBeenCalledTimes(1);
    expect(removeItem).toHaveBeenCalledWith(101);
  });

  test('3. 삭제 확인 모달 취소 버튼 클릭 시 모달이 닫히고 removeItem이 호출되지 않는다', async () => {
    const user = userEvent.setup();

    const actions = {
      toggleSelect: jest.fn(),
      updateQty: jest.fn(),
      removeItem: jest.fn(),
    };

    const item = {
      cartItemId: 101,
      isSelected: true,
    } as any;

    render(<CartItemCard item={item} actions={actions} />);

    await user.click(screen.getByRole('button', { name: '삭제' }));
    await user.click(screen.getByRole('button', { name: '모달 취소' }));
    expect(screen.queryByTestId('confirm-modal')).not.toBeInTheDocument();
    expect(actions.removeItem).not.toHaveBeenCalled();
  });
});

describe('상품 수량 변경 (CartItemCard)', () => {
  test('1. 수량 +/- 버튼 클릭 시 updateQty가 (cartItemId, 변경된 수량, 재고)으로 호출된다', async () => {
    const user = userEvent.setup();

    const updateQty = jest.fn();
    const actions = {
      toggleSelect: jest.fn(),
      updateQty,
      removeItem: jest.fn(),
    };

    const item = {
      cartItemId: 101,
      isSelected: true,
      quantity: 3,
      stockQuantity: 4,
    } as any;

    render(<CartItemCard item={item} actions={actions} />);

    await user.click(screen.getByRole('button', { name: '+' }));
    expect(updateQty).toHaveBeenCalledWith(101, 4, 4);

    await user.click(screen.getByRole('button', { name: '−' }));
    expect(updateQty).toHaveBeenCalledWith(101, 2, 4);
  });

  test('2. 수량이 1이면 수량 감소 버튼이 disabled된다', async () => {
    const user = userEvent.setup();

    const updateQty = jest.fn();
    const actions = {
      toggleSelect: jest.fn(),
      updateQty,
      removeItem: jest.fn(),
    };

    const item = {
      cartItemId: 101,
      isSelected: true,
      quantity: 1,
      stockQuantity: 4,
    } as any;

    render(<CartItemCard item={item} actions={actions} />);

    const minusButton = screen.getByRole('button', { name: '−' });
    expect(minusButton).toBeDisabled();

    await user.click(minusButton);
    expect(updateQty).not.toHaveBeenCalled();
  });
});
