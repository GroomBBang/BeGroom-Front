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
  test('2. 삭제 버튼 클릭 시 removeItem이 cartItemId로 호출된다', async () => {
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

    const deleteButton = screen.getByRole('button', { name: '삭제' });
    await user.click(deleteButton);

    expect(removeItem).toHaveBeenCalledTimes(1);
    expect(removeItem).toHaveBeenCalledWith(101);
  });
});

describe('상품 수량 변경 (CartItemCard)', () => {
  test('3. 수량 +/- 버튼 클릭 시 updateQty가 (cartItemId, 변경된 수량)으로 호출된다', async () => {
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
    } as any;

    render(<CartItemCard item={item} actions={actions} />);

    const minusButton = screen.getByRole('button', { name: '−' });
    const plusButton = screen.getByRole('button', { name: '+' });

    await user.click(plusButton);
    expect(updateQty).toHaveBeenCalledWith(101, 4);

    await user.click(minusButton);
    expect(updateQty).toHaveBeenCalledWith(101, 2);
  });
});
