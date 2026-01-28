import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CartMain from '../components/CartMain';

jest.mock('../components/CartItem', () => ({
  __esModule: true,
  default: () => <div data-testid="cart-item-card" />,
}));

jest.mock('../components/CartRecommend', () => ({
  __esModule: true,
  default: () => <div data-testid="cart-recommend" />,
}));

const mockCart = {
  items: [],
  totals: {
    subtotal: 0,
    total: 0,
    selectedCount: 0,
  },
  setAllSelected: jest.fn(),
  removeSelected: jest.fn(),
  handleClickOrder: jest.fn(),
} as any;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('CartMain', () => {
  describe('전체 상품 선택 변경', () => {
    test('1. 전체 선택 체크박스 클릭 시 함수가 호출된다.', async () => {
      const user = userEvent.setup();
      const cart = mockCart;

      render(<CartMain cart={cart} />);

      const checkbox = screen.getByRole('checkbox');
      await user.click(checkbox);

      expect(cart.setAllSelected).toHaveBeenCalledTimes(1);
      expect(cart.setAllSelected).toHaveBeenCalledWith(true);
    });
  });

  describe('선택 상품 삭제', () => {
    test('1. 선택 삭제 버튼 클릭 시 삭제 확인 모달 출력', async () => {
      const user = userEvent.setup();
      const cart = mockCart;

      render(<CartMain cart={cart} />);

      await user.click(screen.getByRole('button', { name: '선택 삭제' }));
      expect(screen.getByTestId('confirm-modal')).toBeInTheDocument();
    });

    test('2. 삭제 확인 모달 확인 버튼 클릭 시 함수가 호출된다', async () => {
      const user = userEvent.setup();
      const cart = mockCart;

      render(<CartMain cart={cart} />);

      await user.click(screen.getByRole('button', { name: '선택 삭제' }));
      await user.click(screen.getByRole('button', { name: '모달 확인' }));
      expect(cart.removeSelected).toHaveBeenCalledTimes(1);
    });

    test('3. 삭제 확인 모달 취소 버튼 클릭 시 모달이 닫히고 함수가 호출되지 않는다', async () => {
      const user = userEvent.setup();
      const cart = mockCart;

      render(<CartMain cart={cart} />);

      await user.click(screen.getByRole('button', { name: '선택 삭제' }));
      await user.click(screen.getByRole('button', { name: '모달 취소' }));
      expect(screen.queryByTestId('confirm-modal')).not.toBeInTheDocument();
      expect(cart.removeSelected).not.toHaveBeenCalled();
    });
  });

  describe('주문하기 버튼 클릭', () => {
    test('1. 체크된 상품이 없으면 버튼 비활성화 및 문구 변경', () => {
      const cart = mockCart;

      render(<CartMain cart={cart} />);

      const orderButton = screen.getByRole('button', { name: '주문 버튼' });

      expect(orderButton).toBeDisabled();
      expect(orderButton).toHaveTextContent('상품을 선택해주세요');
    });

    test('1. 체크된 상품이 있으면 버튼 활성화 및 문구 변경', () => {
      const cart = {
        items: [],
        totals: {
          subtotal: 0,
          total: 0,
          selectedCount: 2,
        },
        removeSelected: jest.fn(),
      } as any;

      render(<CartMain cart={cart} />);

      const orderButton = screen.getByRole('button', { name: '주문 버튼' });

      expect(orderButton).not.toBeDisabled();
      expect(orderButton).toHaveTextContent('2개 상품 주문하기');
    });

    test(`2. 주문하기 버튼 클릭 시 함수가 호출된다.`, async () => {
      const user = userEvent.setup();
      const cart = {
        items: [],
        totals: {
          subtotal: 0,
          total: 0,
          selectedCount: 2,
        },
        handleClickOrder: jest.fn(),
      } as any;

      render(<CartMain cart={cart} />);

      await user.click(screen.getByRole('button', { name: '주문 버튼' }));
      expect(cart.handleClickOrder).toHaveBeenCalledTimes(1);
    });
  });
});
