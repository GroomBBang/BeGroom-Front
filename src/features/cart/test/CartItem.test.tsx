// CartItemCard.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CartItemCard from '../components/CartItem';

const onConfirmModal = jest.fn();
jest.mock('../../../shared/stores/useModalStore', () => ({
  __esModule: true,
  useModalStore: () => ({
    onConfirmModal: onConfirmModal,
  }),
}));

const actions = {
  toggleSelect: jest.fn(),
  updateQty: jest.fn(),
  removeItem: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('상품 선택 변경 (CartItemCard)', () => {
  test('1. 체크박스 클릭 시 toggleSelect가 cartItemId로 호출된다', async () => {
    const user = userEvent.setup();

    const item = {
      cartItemId: 101,
      isSelected: false,
    } as any;

    render(<CartItemCard item={item} actions={actions} />);

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(actions.toggleSelect).toHaveBeenCalledTimes(1);
    expect(actions.toggleSelect).toHaveBeenCalledWith(101);
  });
});

describe('상품 삭제 (CartItemCard)', () => {
  const user = userEvent.setup();

  const item = {
    cartItemId: 101,
    isSelected: true,
  } as any;

  beforeEach(async () => {
    render(<CartItemCard item={item} actions={actions} />);
    await user.click(screen.getByRole('button', { name: '삭제' }));
  });

  test('1. 삭제 버튼 클릭 시 삭제 확인 모달을 출력한다', () => {
    expect(onConfirmModal).toHaveBeenCalledTimes(1);
    expect(onConfirmModal).toHaveBeenCalledWith('삭제하시겠습니까?', '삭제', expect.any(Function));
  });

  test('2. 삭제 확인 모달의 확인 콜백 실행 시 removeItem이 cartItemId로 호출된다', async () => {
    const [, , confirmCallback] = onConfirmModal.mock.calls[0];

    await confirmCallback();

    expect(actions.removeItem).toHaveBeenCalledTimes(1);
    expect(actions.removeItem).toHaveBeenCalledWith(101);
  });
});

describe('상품 수량 변경 (CartItemCard)', () => {
  test('1. 수량 +/- 버튼 클릭 시 updateQty가 (cartItemId, 변경된 수량, 재고)으로 호출된다', async () => {
    const user = userEvent.setup();

    const item = {
      cartItemId: 101,
      isSelected: true,
      quantity: 3,
      stockQuantity: 4,
    } as any;

    render(<CartItemCard item={item} actions={actions} />);

    await user.click(screen.getByRole('button', { name: '+' }));
    expect(actions.updateQty).toHaveBeenCalledWith(101, 4, 4);

    await user.click(screen.getByRole('button', { name: '−' }));
    expect(actions.updateQty).toHaveBeenCalledWith(101, 2, 4);
  });

  test('2. 수량이 1이면 수량 감소 버튼이 disabled된다', async () => {
    const user = userEvent.setup();

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
    expect(actions.updateQty).not.toHaveBeenCalled();
  });
});
